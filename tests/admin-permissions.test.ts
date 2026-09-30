import assert from 'node:assert/strict';
import test from 'node:test';
import { canAccessAdminCollection, canAccessAdminPath } from '../src/domain/constants/admin-permissions';
import { Roles } from '../src/domain/constants/roles';

test('Admin can access all dashboard routes and collection actions', () => {
  assert.equal(canAccessAdminPath([Roles.Admin], '/admin/users'), true);
  assert.equal(canAccessAdminCollection([Roles.Admin], 'settings', 'PUT'), true);
  assert.equal(canAccessAdminCollection([Roles.Admin], 'users', 'POST'), true);
});

test('Editor can access dashboard settings but not user mutations', () => {
  assert.equal(canAccessAdminPath([Roles.Editor], '/admin/settings'), true);
  assert.equal(canAccessAdminPath([Roles.Editor], '/admin/users'), true);
  assert.equal(canAccessAdminCollection([Roles.Editor], 'settings', 'PUT'), true);
  assert.equal(canAccessAdminCollection([Roles.Editor], 'users', 'POST'), false);
});

test('Content Manager can create and edit content but cannot delete or access settings', () => {
  const roles = [Roles.ContentManager];

  assert.equal(canAccessAdminPath(roles, '/admin/pages'), true);
  assert.equal(canAccessAdminPath(roles, '/admin/trips'), true);
  assert.equal(canAccessAdminPath(roles, '/admin/settings'), false);
  assert.equal(canAccessAdminCollection(roles, 'blogs', 'POST'), true);
  assert.equal(canAccessAdminCollection(roles, 'blogs', 'PUT'), true);
  assert.equal(canAccessAdminCollection(roles, 'blogs', 'DELETE'), false);
  assert.equal(canAccessAdminCollection(roles, 'settings', 'GET'), false);
  assert.equal(canAccessAdminCollection(roles, 'bookings', 'GET'), false);
  assert.equal(canAccessAdminCollection(roles, 'media', 'GET'), true);
  assert.equal(canAccessAdminCollection(roles, 'media', 'DELETE'), false);
});

test('Regular users cannot access the dashboard or admin collections', () => {
  assert.equal(canAccessAdminPath([Roles.User], '/admin'), false);
  assert.equal(canAccessAdminCollection([Roles.User], 'pages', 'GET'), false);
});