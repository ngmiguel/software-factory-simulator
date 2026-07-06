# Software Factory Simulator

> Simulateur complet d'entreprise de développement logiciel — jouez le rôle du CTO et gérez équipes, projets, bugs, dette technique et recrutement.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Vision

**Software Factory Simulator** est une plateforme web qui simule une entreprise complète de développement logiciel. L'utilisateur incarne un **CTO** ou **Engineering Manager** et prend des décisions stratégiques dont l'impact est mesurable en temps réel.

Le moteur de simulation produit automatiquement : retards, bugs, burn-out, demandes clients, changements de priorité, dette technique, départs et évolutions de compétences.

## Stack technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | Next.js (App Router), React, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod, TanStack Query |
| **Backend** | NestJS, Prisma, PostgreSQL, Redis, BullMQ, WebSockets, Swagger |
| **Architecture** | Clean Architecture, DDD, CQRS, SOLID, Event-Driven |
| **Infrastructure** | Docker, Docker Compose, GitHub Actions |
| **Qualité** | ESLint, Prettier, Husky, lint-staged, Jest, Supertest, E2E |

## Architecture

Monorepo **feature-first** avec séparation stricte des couches :

```
apps/
├── api/          # Backend NestJS (Domain, Application, Infrastructure, Presentation)
└── web/          # Frontend Next.js (App Router)
packages/
└── shared/       # Types et utilitaires partagés
docs/
├── architecture/ # Diagrammes et documentation technique
├── adr/          # Architecture Decision Records
└── api/          # Documentation API
```

## Modules métier

Auth · Users · Companies · Teams · Projects · Developers · Clients · Products · Roadmaps · Tasks · Backlogs · Sprints · Releases · Deployments · Incidents · Notifications · Analytics · Simulation Engine · Audit Logs · Reports · Permissions · Monitoring

## Démarrage rapide

> Le projet est en cours de développement. Les instructions d'installation seront ajoutées à chaque phase.

```bash
# À venir — Phase 2
git clone https://github.com/ngmiguel/software-factory-simulator.git
cd software-factory-simulator
docker compose up -d
pnpm install
pnpm dev
```

## Roadmap de développement

| Phase | Description | Statut |
|-------|-------------|--------|
| 0 | Fondations — repo, documentation, conventions | Terminé |
| 1 | Monorepo — structure, tooling (ESLint, Prettier, Husky) | Terminé |
| 2 | Infrastructure — Docker, PostgreSQL, Redis | Terminé |
| 3 | Backend — NestJS, Clean Architecture, Prisma | Terminé |
| 4 | Auth — JWT, Refresh Token, RBAC | Terminé |
| 5 | Domaine core — Companies, Teams, Developers | À venir |
| 6 | Projets — Backlog, Sprints, Releases | À venir |
| 7 | Moteur de simulation | À venir |
| 8 | Frontend — Next.js, dashboards, temps réel | À venir |
| 9 | Tests — unitaires, intégration, E2E | À venir |
| 10 | CI/CD — GitHub Actions, monitoring | À venir |

Voir [docs/ROADMAP.md](./docs/ROADMAP.md) pour le détail de chaque phase.

## Documentation

- [Vue d'ensemble architecture](./docs/architecture/OVERVIEW.md)
- [Roadmap détaillée](./docs/ROADMAP.md)
- [Guide des tests](./docs/TESTING.md)
- [ADR — Monorepo](./docs/adr/0001-monorepo-and-clean-architecture.md)

## Licence

[MIT](./LICENSE)
