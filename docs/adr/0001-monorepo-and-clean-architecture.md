# ADR 0001 — Monorepo et Clean Architecture

## Statut

Accepté

## Date

2026-07-02

## Contexte

Le projet **Software Factory Simulator** est un portfolio destiné à démontrer des compétences d'architecte logiciel senior. Il doit :

- Montrer une architecture professionnelle et évolutive
- Permettre un développement frontend/backend coordonné
- Faciliter le partage de types TypeScript entre les deux apps
- Produire un historique Git lisible pour les recruteurs

## Décision

### 1. Monorepo avec pnpm workspaces

Nous adoptons un **monorepo** géré par **pnpm workspaces** :

```
apps/api     → Backend NestJS
apps/web     → Frontend Next.js
packages/shared → Types et validators partagés
```

**Alternatives considérées** :

| Option | Rejetée car |
|--------|-------------|
| Polyrepo (2 repos séparés) | Synchronisation des types difficile, 2 historiques Git |
| npm workspaces | pnpm plus rapide, disk-efficient |
| Turborepo/Nx dès le départ | Complexité prématurée ; ajout possible en Phase 10 |

### 2. Clean Architecture avec 4 couches

Chaque module backend suit strictement :

```
Domain → Application → Infrastructure → Presentation
```

Les dépendances vont **uniquement vers l'intérieur**. Le Domain ne connaît aucun framework.

### 3. Feature-first modules

Chaque domaine métier est un module NestJS autonome (`teams/`, `projects/`, etc.) contenant ses 4 couches.

### 4. Conventional Commits

Format : `type(scope): description` pour un historique Git professionnel.

## Conséquences

### Positives

- Types partagés sans duplication (`packages/shared`)
- Un seul repo = un seul historique pour le portfolio
- Architecture claire et testable (Domain testable sans DB)
- Évolutif vers microservices si besoin (chaque module est déjà isolé)

### Négatives

- Courbe d'apprentissage initiale plus élevée
- Plus de fichiers qu'un CRUD simple
- Setup monorepo légèrement plus complexe

## Références

- [Clean Architecture — Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design — Eric Evans](https://domainlanguage.com/ddd/)
- [NestJS Custom Architecture](https://docs.nestjs.com/)
