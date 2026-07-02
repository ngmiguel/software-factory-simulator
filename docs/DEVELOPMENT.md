# Guide de développement local

## Prérequis

- Node.js >= 20 ([.nvmrc](../.nvmrc))
- pnpm >= 9
- Docker & Docker Compose

## Installation

```bash
# Cloner le repo
git clone https://github.com/ngmiguel/software-factory-simulator.git
cd software-factory-simulator

# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.example .env

# Démarrer PostgreSQL et Redis
docker compose up -d

# Générer le client Prisma et appliquer les migrations
pnpm db:generate
pnpm db:migrate

# Lancer en développement (API + Web en parallèle)
pnpm dev
```

## URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:3001/api/v1 |
| Swagger | http://localhost:3001/docs |
| Prisma Studio | `pnpm db:studio` |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

## Scripts utiles

```bash
pnpm dev          # Lance API + Web en parallèle
pnpm dev:api      # API uniquement
pnpm dev:web      # Web uniquement
pnpm build        # Build tous les packages
pnpm lint         # Lint tous les packages
pnpm test         # Tests tous les packages
pnpm format       # Formater le code
```

## Structure du monorepo

```
apps/api/     → Backend NestJS (Clean Architecture)
apps/web/     → Frontend Next.js (App Router)
packages/shared/ → Types et constantes partagés
```

## Workflow Git

1. Créer une branche feature : `git checkout -b feat/nom-feature`
2. Développer et committer avec Conventional Commits
3. Merger dans `main` via Pull Request ou merge local
4. Pousser : `git push origin main`

## Conventions

- **Commits** : Conventional Commits (`feat(scope): description`)
- **Branches** : `feat/`, `fix/`, `chore/`, `docs/`, `build/`
- **Code** : TypeScript strict, ESLint + Prettier
