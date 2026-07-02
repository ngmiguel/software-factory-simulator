## Contributing

Thank you for your interest in Software Factory Simulator.

### Development workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow [Conventional Commits](https://www.conventionalcommits.org/)
4. Ensure `pnpm lint` and `pnpm test` pass
5. Open a Pull Request against `main`

### Code standards

- TypeScript strict mode
- ESLint + Prettier (enforced by Husky pre-commit)
- Tests for new features
- ADR for architectural decisions

### Branch naming

| Prefix | Usage |
|--------|-------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Tooling, config |
| `docs/` | Documentation |
| `build/` | Docker, CI |
| `test/` | Tests only |
