# Changelog

Todas as mudanças relevantes deste projeto são registradas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Adicionado

- Suíte de fumaça do Playwright com specs de hub, partida, progresso, modo professor, acessibilidade e API de saúde.
- Script de execução do Playwright em contêiner e scripts npm correspondentes.
- Workflows `qualidade.yml` e `testes.yml`, além do Dependabot.
- AGENTS.md, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md e CHANGELOG.md.
- Templates de pull request e de issues (Bug e Melhoria) no padrão do GitHub.
- Devcontainer com Node 24, Docker e GitHub CLI.

### Modificado

- O projeto passa a usar somente npm; o Bun, o `bun.lock` e a dependência `bun-types` foram removidos.
- O script `start` executa o servidor standalone com Node.
- README atualizado para refletir os scripts, a suíte de testes e as limitações.
