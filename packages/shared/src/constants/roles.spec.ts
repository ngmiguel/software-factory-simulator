import { UserRole, ROLE_HIERARCHY } from './roles';

describe('UserRole', () => {
  it('should define all expected roles', () => {
    expect(UserRole.CTO).toBe('CTO');
    expect(UserRole.DEVELOPER).toBe('DEVELOPER');
    expect(UserRole.ADMIN).toBe('ADMIN');
  });
});

describe('ROLE_HIERARCHY', () => {
  it('should rank ADMIN above CTO', () => {
    expect(ROLE_HIERARCHY[UserRole.ADMIN]).toBeGreaterThan(ROLE_HIERARCHY[UserRole.CTO]);
  });

  it('should rank CTO above DEVELOPER', () => {
    expect(ROLE_HIERARCHY[UserRole.CTO]).toBeGreaterThan(ROLE_HIERARCHY[UserRole.DEVELOPER]);
  });

  it('should rank CLIENT lowest', () => {
    expect(ROLE_HIERARCHY[UserRole.CLIENT]).toBeLessThan(ROLE_HIERARCHY[UserRole.DEVELOPER]);
  });
});
