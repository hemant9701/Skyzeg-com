import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { Roles, type RoleName } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { ValidationError } from '@/shared/errors/app-error';
import { created, ok, withApiErrorHandling } from '@/shared/http/api-response';

const roleValues = Object.values(Roles) as [RoleName, ...RoleName[]];

const createUserSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8),
  roles: z.array(z.enum(roleValues)).min(1),
  isActive: z.boolean().default(true)
});

function sanitizeUser(user: any) {
  if (!user) return user;
  const { passwordHash, ...safe } = user;
  return safe;
}

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  const currentUser = await requireApiUser(request, [Roles.Admin]);
  const page = Number(request.nextUrl.searchParams.get('page') || 1);
  const pageSize = Number(request.nextUrl.searchParams.get('pageSize') || 100);
  const search = (request.nextUrl.searchParams.get('search') || '').trim();

  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const result = await new UnitOfWork().users.paginate(filter, {
    page,
    pageSize,
    sort: { createdAt: -1 }
  });

  return ok({
    ...result,
    items: result.items.map(sanitizeUser),
    actor: { id: currentUser.id, email: currentUser.email }
  });
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const actor = await requireApiUser(request, [Roles.Admin]);
  const payload = createUserSchema.parse(await request.json());
  const uow = new UnitOfWork();

  const existing = await uow.users.findOne({ email: payload.email });
  if (existing) {
    throw new ValidationError('A user with this email already exists');
  }

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const createdUser = await uow.users.create({
    fullName: payload.fullName,
    email: payload.email,
    passwordHash,
    roles: payload.roles,
    isActive: payload.isActive,
    createdBy: actor.id,
    updatedBy: actor.id
  });

  await uow.audit({
    userId: actor.id,
    userEmail: actor.email,
    action: 'create',
    entityName: 'User',
    entityId: String(createdUser._id),
    after: sanitizeUser(createdUser)
  });

  return created(sanitizeUser(createdUser));
});
