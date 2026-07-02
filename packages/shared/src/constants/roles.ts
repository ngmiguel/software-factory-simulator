export enum UserRole {
  ADMIN = 'ADMIN',
  CEO = 'CEO',
  CTO = 'CTO',
  ENGINEERING_MANAGER = 'ENGINEERING_MANAGER',
  DEVELOPER = 'DEVELOPER',
  QA = 'QA',
  DEVOPS = 'DEVOPS',
  CLIENT = 'CLIENT',
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.ADMIN]: 100,
  [UserRole.CEO]: 90,
  [UserRole.CTO]: 80,
  [UserRole.ENGINEERING_MANAGER]: 70,
  [UserRole.DEVOPS]: 50,
  [UserRole.DEVELOPER]: 40,
  [UserRole.QA]: 40,
  [UserRole.CLIENT]: 10,
};
