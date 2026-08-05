import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { UnauthorizedError, ForbiddenError } from '@/shared/errors/app-error';

const cookieName = process.env.JWT_COOKIE_NAME || 'travel_admin_token';
const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET || 'replace-this-development-secret');

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export class AuthService {
  constructor(private readonly unitOfWork = new UnitOfWork()) {}

  async login(email: string, password: string): Promise<{ token: string; user: AuthUser }> {
    const user = await this.unitOfWork.users.findOne({ email: email.toLowerCase(), isActive: true });
    if (!user) throw new UnauthorizedError('Invalid email or password');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedError('Invalid email or password');

    await this.unitOfWork.users.updateById(String(user._id), { lastLoginAt: new Date() });

    const authUser: AuthUser = {
      id: String(user._id),
      email: user.email,
      fullName: user.fullName,
      roles: user.roles || []
    };

    const token = await new SignJWT(authUser as unknown as Record<string, unknown>)
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(authUser.id)
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(jwtSecret);

    return { token, user: authUser };
  }

  async verifyToken(token?: string): Promise<AuthUser> {
    if (!token) throw new UnauthorizedError();
    const { payload } = await jwtVerify(token, jwtSecret);
    return {
      id: String(payload.id || payload.sub),
      email: String(payload.email),
      fullName: String(payload.fullName),
      roles: Array.isArray(payload.roles) ? payload.roles.map(String) : []
    };
  }

  ensureRole(user: AuthUser, allowedRoles: string[]) {
    if (!allowedRoles.some((role) => user.roles.includes(role))) {
      throw new ForbiddenError('You do not have permission for this action');
    }
  }
}

export { cookieName };
