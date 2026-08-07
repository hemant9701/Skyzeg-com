import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { AdminRoles } from '@/domain/constants/roles';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { requireApiUser } from '@/lib/auth';
import { ForbiddenError, NotFoundError, ValidationError } from '@/shared/errors/app-error';
import { ok, withApiErrorHandling } from '@/shared/http/api-response';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8)
});

export const POST = withApiErrorHandling(async (request: NextRequest) => {
  const actor = await requireApiUser(request, AdminRoles);
  const input = changePasswordSchema.parse(await request.json());

  if (input.currentPassword === input.newPassword) {
    throw new ValidationError('New password must be different from current password');
  }

  const uow = new UnitOfWork();
  const existing = await uow.users.findById(actor.id);
  if (!existing) throw new NotFoundError('User not found');

  const passwordHash = String(existing.passwordHash || '');
  const isValid = await bcrypt.compare(input.currentPassword, passwordHash);
  if (!isValid) throw new ForbiddenError('Current password is incorrect');

  const nextHash = await bcrypt.hash(input.newPassword, 12);
  await uow.users.updateById(actor.id, { passwordHash: nextHash, updatedBy: actor.id });

  await uow.audit({
    userId: actor.id,
    userEmail: actor.email,
    action: 'password_change',
    entityName: 'User',
    entityId: actor.id
  });

  return ok({ changed: true });
});
