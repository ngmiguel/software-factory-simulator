# ADR 0002 — Authentication JWT et RBAC

## Statut

Accepté

## Date

2026-07-04

## Contexte

La plateforme nécessite une authentification sécurisée avec gestion des rôles (CTO, CEO, Developer, etc.) pour les dashboards différenciés.

## Décision

### JWT Access Token (15 min) + Refresh Token (7 jours)

- Access token stateless signé HS256
- Refresh token stocké en base avec rotation à chaque refresh
- Révocation au logout via `revokedAt`

### RBAC via Guards NestJS

- `JwtAuthGuard` — vérifie le Bearer token
- `RolesGuard` — vérifie le rôle via décorateur `@Roles()`
- `@CurrentUser()` — injecte le payload JWT dans le controller

### Rate Limiting

- Global : 100 req/min via `ThrottlerGuard`
- Auth routes : 10 req/min

## Conséquences

- Refresh token rotation limite la fenêtre d'exploitation d'un token volé
- RBAC extensible par module sans couplage
- Prochaine étape : permissions granulaires (Phase 5)
