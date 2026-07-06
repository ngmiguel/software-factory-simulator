# Guide des tests

Tous les tests du projet sont exécutés automatiquement :

- **Pre-push** (Husky) : `pnpm test:pre-push` — lint + typecheck + tous les tests
- **CI/CD** (GitHub Actions) : sur chaque `push` et `pull_request`

## Scripts racine

| Script | Description |
|--------|-------------|
| `pnpm test` | Alias de `test:all` |
| `pnpm test:all` | Tous les tests (shared + api + web) |
| `pnpm test:pre-push` | Lint + typecheck + test:all (hook pre-push) |
| `pnpm test:shared` | Package `@sfs/shared` |
| `pnpm test:shared:roles` | Constantes roles uniquement |
| `pnpm test:api` | Tous les tests API |
| `pnpm test:api:health` | Module health |
| `pnpm test:api:auth` | Module auth complet |
| `pnpm test:api:auth:register` | Use case inscription |
| `pnpm test:api:auth:login` | Use case login |
| `pnpm test:api:auth:rbac` | Guard RBAC |
| `pnpm test:api:modules` | Tous les modules API |
| `pnpm test:web` | Tous les tests frontend |
| `pnpm test:web:lib` | Utilitaires partagés frontend |

---

## Inventaire complet des tests

### Package `@sfs/shared`

**Fichier** : `packages/shared/src/constants/roles.spec.ts`

| Test | Description |
|------|-------------|
| `UserRole › should define all expected roles` | Vérifie les valeurs CTO, DEVELOPER, ADMIN |
| `ROLE_HIERARCHY › should rank ADMIN above CTO` | Hiérarchie des rôles |
| `ROLE_HIERARCHY › should rank CTO above DEVELOPER` | Hiérarchie des rôles |
| `ROLE_HIERARCHY › should rank CLIENT lowest` | CLIENT en dernier |

**Script** : `pnpm test:shared:roles`

---

### Module API — `health`

**Fichier** : `apps/api/src/modules/health/health.controller.spec.ts`

| Test | Description |
|------|-------------|
| `HealthController › should be defined` | Controller instanciable |
| `HealthController › should return live status` | Endpoint live retourne `status: ok` |

**Script** : `pnpm test:api:health`

---

### Module API — `auth` / register

**Fichier** : `apps/api/src/modules/auth/application/use-cases/register-user.use-case.spec.ts`

| Test | Description |
|------|-------------|
| `RegisterUserUseCase › should register a new user successfully` | Inscription valide |
| `RegisterUserUseCase › should fail when email already exists` | Email dupliqué → erreur |
| `RegisterUserUseCase › should fail with invalid email` | Format email invalide |
| `Email Value Object › should create valid email` | Normalisation lowercase |
| `Email Value Object › should reject invalid email` | Rejet email malformé |

**Script** : `pnpm test:api:auth:register`

---

### Module API — `auth` / login

**Fichier** : `apps/api/src/modules/auth/application/use-cases/login.use-case.spec.ts`

| Test | Description |
|------|-------------|
| `LoginUseCase › should login successfully with valid credentials` | Login + tokens |
| `LoginUseCase › should fail with invalid credentials` | Mauvais email → erreur |

**Script** : `pnpm test:api:auth:login`

---

### Module API — `auth` / rbac

**Fichier** : `apps/api/src/modules/auth/presentation/guards/roles.guard.spec.ts`

| Test | Description |
|------|-------------|
| `RolesGuard › should allow access when no roles required` | Pas de `@Roles()` → autorisé |
| `RolesGuard › should allow access when user has required role` | Rôle correspondant |
| `RolesGuard › should deny access when user lacks required role` | Rôle insuffisant |
| `RolesGuard › should deny access when user is not authenticated` | Pas de JWT |

**Script** : `pnpm test:api:auth:rbac`

---

### Package `@sfs/web`

**Fichier** : `apps/web/src/shared/lib/cn.spec.ts`

| Test | Description |
|------|-------------|
| `cn › should merge class names` | Fusion de classes |
| `cn › should resolve tailwind conflicts` | Résolution conflits Tailwind |
| `cn › should handle conditional classes` | Classes conditionnelles |

**Script** : `pnpm test:web:lib`

---

## Modules à venir (scripts réservés)

| Module | Script futur | Phase |
|--------|-------------|-------|
| `companies` | `pnpm test:api:companies` | 5 |
| `teams` | `pnpm test:api:teams` | 5 |
| `developers` | `pnpm test:api:developers` | 5 |
| `projects` | `pnpm test:api:projects` | 6 |
| `simulation` | `pnpm test:api:simulation` | 7 |

---

## CI/CD — GitHub Actions

Workflow : `.github/workflows/ci.yml`

Déclenché sur : **tous les push** (toutes branches) + PR vers `main`

| Job CI | Tests exécutés |
|--------|----------------|
| `quality` | lint, typecheck |
| `test-shared` | roles + all shared |
| `test-api-health` | health controller |
| `test-api-auth-register` | register use case |
| `test-api-auth-login` | login use case |
| `test-api-auth-rbac` | roles guard |
| `test-web` | cn utility + all web |
| `build` | build + `test:all` smoke |

---

## Hook Husky pre-push

Fichier : `.husky/pre-push`

```bash
pnpm test:pre-push
```

Bloque le push si lint, typecheck ou un test échoue.
