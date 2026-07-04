import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { RolesGuard } from './roles.guard';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  const createContext = (user: { role: string } | undefined, roles?: Role[]) => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(roles);

    return {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  };

  it('should allow access when no roles required', () => {
    const ctx = createContext({ role: Role.DEVELOPER });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should allow access when user has required role', () => {
    const ctx = createContext({ role: Role.CTO }, [Role.CTO, Role.ADMIN]);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('should deny access when user lacks required role', () => {
    const ctx = createContext({ role: Role.DEVELOPER }, [Role.ADMIN]);
    expect(guard.canActivate(ctx)).toBe(false);
  });

  it('should deny access when user is not authenticated', () => {
    const ctx = createContext(undefined, [Role.CTO]);
    expect(guard.canActivate(ctx)).toBe(false);
  });
});
