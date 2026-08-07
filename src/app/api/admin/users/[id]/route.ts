import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { Roles, type RoleName } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { ForbiddenError, NotFoundError, ValidationError } from '@/shared/errors/app-error';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

interface Context {
  params: Promise<{ id: string }>;
}

const roleValues = Object.values(Roles) as [RoleName, ...RoleName[]];

const updateUserSchema = z.object({
  fullName: z.string().trim().min(2).optional(),
  roles: z.array(z.enum(roleValues)).min(1).optional(),
  isActive: z.boolean().optional(),
  resetPassword: z.string().min(8).optional()
});

function sanitizeUser(user: any) {
  if (!user) return user;
  const { passwordHash, ...safe } = user;
  return safe;
}

export const PATCH = withApiErrorHandling(async (request: NextRequest, context: Context) => {
  const actor = await requireApiUser(request, [Roles.Admin]);
  const { id } = await context.params;
  const input = updateUserSchema.parse(await request.json());
  const uow = new UnitOfWork();

  const existing = await uow.users.findById(id);
  if (!existing) throw new NotFoundError('User not found');

  const updateData: Record<string, unknown> = {};

  if (typeof input.fullName === 'string') {
    updateData.fullName = input.fullName;
  }

  if (Array.isArray(input.roles)) {
    if (String(existing._id) === actor.id && !input.roles.includes(Roles.Admin)) {
      throw new ForbiddenError('You cannot remove your own Admin role');
    }
    updateData.roles = input.roles;
  }

  if (typeof input.isActive === 'boolean') {
    if (String(existing._id) === actor.id && input.isActive === false) {
      throw new ForbiddenError('You cannot disable your own account');
    }
    updateData.isActive = input.isActive;
  }

  if (input.resetPassword) {
    updateData.passwordHash = await bcrypt.hash(input.resetPassword, 12);
  }

  if (Object.keys(updateData).length === 0) {
    throw new ValidationError('No valid updates were provided');
  }

  updateData.updatedBy = actor.id;

  const updated = await uow.users.updateById(id, updateData);
  if (!updated) throw new NotFoundError('User not found');

  await uow.audit({
    userId: actor.id,
    userEmail: actor.email,
    action: 'update',
    entityName: 'User',
    entityId: id,
    before: sanitizeUser(existing),
    after: sanitizeUser(updated)
  });

  return ok(sanitizeUser(updated));
});
