# Changelog

Todas as mudanças relevantes deste projeto são registradas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Adicionado

- Quatro jogos, um por área: Sentido em Contexto, Dados em Debate, Água em Alerta e Memória do Bairro, com três casos cada e fichas BNCC.
- Palco compartilhado de investigação com seleção livre de casos, pistas com leitura em voz e tabelas acessíveis.
- Registro de casos diferentes concluídos e priorização de casos ainda não concluídos nos novos jogos.
- Testes de todos os novos casos, repetição, reinício e migração de progresso antigo.

- Suíte de fumaça do Playwright com specs de hub, partida, progresso, modo professor, acessibilidade e API de saúde.
- Script de execução do Playwright em contêiner e scripts npm correspondentes.
- Workflows `qualidade.yml` e `testes.yml`, além do Dependabot.
- AGENTS.md, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md e CHANGELOG.md.
- Templates de pull request e de issues (Bug e Melhoria) no padrão do GitHub.
- Devcontainer com Node 24, Docker e GitHub CLI.

### Modificado

- Catálogo ordenado por área e nível crescente em todas as telas, incluindo filtros e recomendações.

- Sessão idempotente na conclusão, sem efeitos sonoros dentro de atualizadores de estado.
- Feedback e leitura reiniciados nas mudanças de fase; foco por teclado acompanha instruções e veredito.
- Progresso antigo preservado, com sanitização de selos duplicados, entradas inválidas e datas.
- Catálogo ampliado de 12 para 16 jogos e testes com totais derivados do catálogo.

- O projeto passa a usar somente npm; o Bun, o `bun.lock` e a dependência `bun-types` foram removidos.
- O script `start` executa o servidor standalone com Node.
- README atualizado para refletir os scripts, a suíte de testes e as limitações.
