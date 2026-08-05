export const Roles = {
  Admin: 'Admin',
  Editor: 'Editor',
  ContentManager: 'Content Manager',
  User: 'User'
} as const;

export type RoleName = (typeof Roles)[keyof typeof Roles];

export const AdminRoles: RoleName[] = [Roles.Admin, Roles.Editor, Roles.ContentManager];
