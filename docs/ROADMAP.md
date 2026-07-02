# Roadmap de développement

Ce document décrit le plan de développement phase par phase. Chaque phase correspond à **un ou plusieurs commits atomiques** sur GitHub, lisibles par les recruteurs.

## Convention de commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope>): <description courte>

[corps optionnel]
```

### Types autorisés

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `chore` | Tâches techniques (config, deps) |
| `refactor` | Refactoring sans changement fonctionnel |
| `test` | Ajout ou modification de tests |
| `ci` | Configuration CI/CD |
| `build` | Build system, Docker |

### Exemples pour ce projet

```
chore: initialize repository with project documentation
docs: add architecture overview and layer responsibilities
chore: setup monorepo with pnpm workspaces
feat(api): scaffold NestJS application with clean architecture
feat(auth): implement JWT authentication with refresh tokens
feat(simulation): add probability-based event engine
```

---

## Phase 0 — Fondations (actuelle)

**Objectif** : Poser les bases du projet avant tout code applicatif.

| Commit | Message | Contenu |
|--------|---------|---------|
| 0.1 | `chore: initialize repository with project documentation` | README, LICENSE, .gitignore |
| 0.2 | `docs: add architecture overview and development roadmap` | docs/architecture/, docs/ROADMAP.md |
| 0.3 | `docs: add ADR for monorepo and clean architecture` | docs/adr/0001-*.md |

**Pourquoi** : Un recruteur qui ouvre le repo doit immédiatement comprendre le projet, la stack et l'approche architecturale — avant même de lire le code.

---

## Phase 1 — Monorepo & Tooling

**Objectif** : Structure monorepo professionnelle avec qualité de code automatisée.

| Commit | Message | Contenu |
|--------|---------|---------|
| 1.1 | `chore: setup monorepo with pnpm workspaces` | package.json racine, pnpm-workspace.yaml |
| 1.2 | `chore: configure eslint and prettier` | .eslintrc, .prettierrc |
| 1.3 | `chore: setup husky and lint-staged` | pre-commit hooks |
| 1.4 | `chore: add editor and git configuration` | .editorconfig, .nvmrc |

**Pourquoi** : Montrer dès le départ une discipline de qualité de code, comme en entreprise.

---

## Phase 2 — Infrastructure Docker

**Objectif** : Environnement de développement reproductible.

| Commit | Message | Contenu |
|--------|---------|---------|
| 2.1 | `build: add docker compose for postgresql and redis` | docker-compose.yml |
| 2.2 | `build: add environment configuration templates` | .env.example |
| 2.3 | `docs: add local development setup guide` | docs/DEVELOPMENT.md |

---

## Phase 3 — Backend NestJS (Clean Architecture)

**Objectif** : Scaffolding backend avec architecture en couches.

| Commit | Message | Contenu |
|--------|---------|---------|
| 3.1 | `feat(api): scaffold NestJS application` | apps/api/ structure de base |
| 3.2 | `feat(api): implement clean architecture layers` | domain/, application/, infrastructure/, presentation/ |
| 3.3 | `feat(api): setup prisma with initial schema` | prisma/schema.prisma |
| 3.4 | `feat(api): add global error handling and validation` | filters, pipes |
| 3.5 | `feat(api): add swagger documentation` | swagger config |
| 3.6 | `feat(api): add health checks and observability` | /health, logging |

---

## Phase 4 — Authentification & Sécurité

| Commit | Message | Contenu |
|--------|---------|---------|
| 4.1 | `feat(auth): implement user registration and login` | Auth module |
| 4.2 | `feat(auth): add JWT with refresh token rotation` | tokens |
| 4.3 | `feat(auth): implement RBAC with permissions` | guards, decorators |
| 4.4 | `feat(auth): add rate limiting and security headers` | helmet, throttler |

---

## Phase 5 — Domaine Core

Modules : Companies, Teams, Developers, Users

---

## Phase 6 — Gestion de Projets

Modules : Projects, Backlogs, Sprints, Tasks, Releases

---

## Phase 7 — Moteur de Simulation

Moteur découplé, événements probabilistes, BullMQ pour les jobs.

---

## Phase 8 — Frontend Next.js

Dashboards par rôle, Zustand, TanStack Query, WebSockets.

---

## Phase 9 — Tests

Couverture unitaire, intégration, E2E par module.

---

## Phase 10 — CI/CD & Production

GitHub Actions, monitoring, déploiement.
