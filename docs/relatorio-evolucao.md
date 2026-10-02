# Relatório de evolução do Ludus

Data: 2026-10-02. Base examinada: commit `69eb5b74fb85fc4d43f62441c9f5c1b95ba0c881`. Branch de trabalho: `codex/evolucao-investigativa`. Versão de desenvolvimento: 1.1.0, ainda não publicada.

## Resultado e alcance

A coleção foi reconstruída para reunir 20 jogos, cinco por área, com três casos por jogo. Os 12 identificadores anteriores permanecem válidos; oito identificadores ampliam os níveis 4 e 5. A arquitetura continua com Next.js 16, React 19, npm, Zustand, MathJax local, Web Speech API e Web Audio API. Não foram acrescentados contas, banco, coleta pessoal ou sincronização.

O conteúdo aborda ensino médio por investigação guiada: dossiê consultável, teste de hipótese, explicação de respostas, resolução com apoio, decisão fundamentada e situação de transferência. A profundidade foi projetada e revisada no conteúdo; os resultados educacionais ainda exigem observação em uso real.

## Diagnóstico e pesquisa

O diagnóstico individual dos 12 jogos, os recortes BNCC e as justificativas de cada transição constam em [Linguagens e Humanas](pesquisa-linguagens-humanas.md) e [Matemática e Natureza](pesquisa-matematica-natureza.md). A investigação sobre currículo, avaliação, feedback, jogos, AEE, DUA e interface está em [Pesquisa pedagógica e design inclusivo](pesquisa-design-inclusivo.md).

Foram encontrados problemas materiais no conteúdo anterior: dois jogos sem três casos definidos, critérios de conclusão associados a manipulação ou alternativa evidente, fontes apresentadas como provas suficientes por sua condição oficial, conclusão de falsidade por ausência de documento, simulação probabilística confundida com comprovação e aplicação de montante de pagamento único como prestação de financiamento. Alguns palcos só encerravam após acertar, apesar do compromisso de permitir avanço sem bloqueio.

A versão atual separa observação, inferência e conclusão, explicita pressupostos e oferece apoios graduados. As fontes dos dossiês são identificadas como registros fictícios quando didáticas. Não há uso de dados reais de estudantes. A BNCC oficial foi consultada; objetivos, recortes e cinco níveis são formulações didáticas do Ludus, sem atribuição dessa sequência ao MEC.

## Matriz cognitiva comum

| Nível         | Operação principal                           | Transição e critério                                                        |
| ------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| 1, Evidências | Distinguir afirmação, observação e prova     | A conclusão precisa ser limitada ao que foi observado.                      |
| 2, Relações   | Relacionar variáveis e representações        | Acrescentar comparação, dependência ou condição, além de identificar dados. |
| 3, Modelagem  | Construir e confrontar modelos e argumentos  | Usar pressupostos para prever, responder objeções ou testar explicações.    |
| 4, Crítica    | Examinar vieses, incerteza e validade        | Analisar como a produção dos dados ou do discurso altera a conclusão.       |
| 5, Síntese    | Integrar evidências e critérios para decidir | Justificar proposta, explicitar conflito e definir condição de revisão.     |

Cada área concretiza essa matriz de modo próprio, detalhado nos estudos por área. Os três casos internos começam com um problema delimitado, acrescentam uma relação ou confronto e terminam com revisão de pressuposto, transferência ou decisão com restrições. O nível não equivale a série escolar, escala de proficiência, diagnóstico ou bloqueio de acesso.

## Coleção e recortes BNCC

| Área       | Nível | Jogo                      | BNCC                                           | Foco                                                                                                                      |
| ---------- | ----- | ------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Linguagens | 1     | Fonte Suspeita            | EM13LP39                                       | Aplicar procedimentos de checagem em decisões editoriais sustentadas por evidência.                                       |
| Linguagens | 2     | Revisor Crítico           | EM13LP15                                       | Editar textos claros e adequados sem inventar relações causais ou estigmatizar variedades linguísticas.                   |
| Linguagens | 3     | Tese e Antítese           | EM13LGG303                                     | Formular e negociar posições diante de perspectivas distintas e restrições documentadas.                                  |
| Linguagens | 4     | Discurso em Rede          | EM13LP14, EM13LP41, EM13LGG704                 | Avaliar como modos e seleção de conteúdo constroem sentidos e orientar uma reedição responsável.                          |
| Linguagens | 5     | Autoria em Debate         | EM13LP46, EM13LP49, EM13LGG703                 | Justificar decisões de interpretação e produção coletiva com crédito, contexto e responsabilidade.                        |
| Matemática | 1     | Orçamento no Limite       | EM13MAT303, EM13MAT304, EM13MAT203             | Decidir sobre cenários financeiros declarando orçamento, calendário de pagamentos e limites do modelo.                    |
| Matemática | 2     | Função Viva               | EM13MAT302, EM13MAT401, EM13MAT503             | Construir e validar modelos afins e quadráticos considerando unidades, domínio e restrições.                              |
| Matemática | 3     | Risco Provável            | EM13MAT312, EM13MAT311, EM13MAT511             | Avaliar mecanismos aleatórios e decisões de risco explicitando eventos, hipóteses e critérios.                            |
| Matemática | 4     | Dados sob Lupa            | EM13MAT102, EM13MAT202, EM13MAT316             | Produzir conclusões estatísticas proporcionais ao desenho, à distribuição e às limitações dos dados.                      |
| Matemática | 5     | Modelos em Disputa        | EM13MAT302, EM13MAT304, EM13MAT301, EM13MAT103 | Integrar modelos, restrições, unidades e cenários para formular uma recomendação com condições de revisão.                |
| Natureza   | 1     | O Circuito Falhou         | EM13CNT107, EM13CNT101                         | Explicar funcionamento de circuitos por medições e modelos de transformação de energia com limites de segurança.          |
| Natureza   | 2     | Reação Equilibrada        | EM13CNT101, EM13CNT301                         | Justificar previsões químicas por conservação, estoque e fronteira do sistema, reconhecendo limites da rota modelada.     |
| Natureza   | 3     | Dilema do Gene            | EM13CNT205, EM13CNT301                         | Interpretar modelos de herança e seleção em nível populacional, explicitando probabilidade, incerteza e limites.          |
| Natureza   | 4     | Ecossistema em Alerta     | EM13CNT105, EM13CNT203, EM13CNT206             | Avaliar intervenções ambientais integrando processos ecológicos, desenho de investigação e limites de generalização.      |
| Natureza   | 5     | Energia em Transição      | EM13CNT106, EM13CNT107, EM13CNT101             | Formular recomendações tecnológicas condicionais com balanços de energia, cenários e avaliação participativa de impactos. |
| Humanas    | 1     | Fonte Histórica           | EM13CHS101                                     | Comparar fontes históricas com crítica de contexto, sem tomar um documento como verdade total.                            |
| Humanas    | 2     | Território em Disputa     | EM13CHS206, EM13CHS606                         | Propor uso do território e investimentos a partir de camadas físicas, sociais e orçamentárias.                            |
| Humanas    | 3     | Dilema Ético              | EM13CHS501, EM13CHS502                         | Deliberar sobre conflitos de valores e condições de participação sem reduzir pessoas a um placar.                         |
| Humanas    | 4     | Trabalho em Transformação | EM13CHS401, EM13CHS402, EM13CHS403             | Analisar relações e desigualdades do trabalho diante de mudanças técnicas e propor alternativas fundamentadas.            |
| Humanas    | 5     | Pacto Democrático         | EM13CHS501, EM13CHS606                         | Deliberar sobre políticas e procedimentos coletivos com inclusão, transparência e possibilidade de revisão.               |

Cada jogo mantém três casos. As justificativas específicas, progressão e limites de mobilização das habilidades constam nos estudos por área. Duração e nível são estimativas autorais, não parâmetros normativos.

## Decisões de arquitetura

- `src/lib/catalog.ts` continua como fonte única dos metadados. Nível, BNCC, foco, habilidades, ícone e duração alimentam hub, progresso e professor.
- `src/games/registry.ts` continua como mapa de identificadores para os palcos. Cada pasta conserva `content.ts` e `index.tsx`.
- `investigation-types.ts` descreve evidências, tarefas, decisões e modelos. `investigation-game.tsx` implementa a experiência comum de investigação usando `useGameSession` e `GameShell`.
- A moldura comum foi evoluída para assegurar dossiê disponível durante testes e decisão, apoios consistentes e acesso por teclado. Essa mudança pertence ao comportamento pedagógico da coleção, sem refatoração de componentes shadcn/ui ou MathJax.
- O índice `src/games/cases.ts` reúne conteúdos para fichas docentes e testes, sem duplicar metadados. O carregamento das fichas e dos palcos pode ocorrer em blocos próprios para reduzir o conteúdo inicial do hub.
- As rotas `/`, `/jogo/<id>`, `/progresso` e `/professores`, o `app-root.tsx`, a pré-renderização por `generateStaticParams` e a tela de identificador desconhecido foram mantidos. A única API permanece `GET /api`.
- Scripts Node mantêm o comportamento de build standalone e adaptam execução e contêiner ao Windows e Linux. Dependências e gerenciador foram preservados.

## Decisões de interface e acessibilidade

| Superfície  | Decisão                                                                                      | Relação com investigação e inclusão                                                                                |
| ----------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Hub         | Explicação dos cinco níveis, percurso por área, busca rotulada, filtros combinados e limpeza | Antecipar o raciocínio esperado e permitir escolha livre.                                                          |
| Cards       | Três casos, duração aproximada sem prazo, selos e quantidade de casos registrados            | Comunicar percurso e disponibilidade sem sugerir corrida ou ranking.                                               |
| Partida     | Caso selecionável, contexto, fontes consultáveis em todas as fases e tarefa por agrupamento  | Reduzir demanda de memória e permitir confronto contínuo.                                                          |
| Laboratório | Parâmetros identificados, unidades, resultados, comparação e tabela equivalente ao gráfico   | Representar relações sem exigir percepção visual do gráfico. Estados discretos permanecem discretos na comparação. |
| Feedback    | Pista conceitual, explicação dos distratores e solução com apoio                             | Tratar o erro como informação e permitir conclusão sem punição.                                                    |
| Decisão     | Justificativa livre opcional e resposta de referência com limites                            | Aceitar expressão escrita, oral ou em dupla; evitar nota automática para argumentação.                             |
| Conclusão   | Selos de participação, explicação e situação de transferência                                | Separar encerramento de comprovação de domínio.                                                                    |
| Progresso   | Registro acumulativo de casos, legado preservado e exclusão somente em diálogo explícito     | Repetir e mudar de caso preservam o histórico.                                                                     |
| Professor   | Fichas filtráveis, sequência de casos, roteiro formativo e cópia de link com alternativa     | Relacionar habilidade, tarefa e evidência observável na mediação.                                                  |
| Navegação   | Atalho ao conteúdo, um único `main`, foco em mudança de fase e conclusão                     | Facilitar uso por teclado e orientação de leitor de tela.                                                          |
| Estados     | Carregamento anunciado, recuperação de erro, endereço não encontrado e busca vazia           | Informar o próximo passo com texto simples.                                                                        |
| Temas       | Tokens de área mais escuros, alto contraste, texto amplo, foco e movimento reduzido          | Preservar identidade institucional e ampliar legibilidade.                                                         |

A leitura em voz inclui contexto, evidências, opções, modelo, feedback e veredito. Interrupções encerram o estado de leitura, inclusive quando há troca de texto. A voz depende de recursos do sistema e do navegador; não há reconhecimento de voz como controle. Todo som mantém alternativa textual. Preferências seguem o external store e as classes no elemento `html`.

A abertura oferece o botão Escolher um jogo, que leva ao catálogo e foca seu título sem abrir o teclado do celular. A comparação dos modelos possui região focável e instrução para percorrer colunas com as setas. O laboratório permanece disponível na decisão e conserva o cenário experimentado; um aviso distingue esse cenário dos dados pedidos nos enunciados. Os parâmetros iniciais podem ser restaurados por escolha do estudante, e a leitura do modelo inclui os parâmetros e os resultados atuais.

Cada botão de voz mantém o cancelamento da própria locução. Mudar seu texto ou retirar seu painel encerra a leitura desatualizada, preservando uma leitura iniciada posteriormente por outro botão. Esse comportamento evita que o feedback continue sendo narrado após editar a resposta.

## Compatibilidade do progresso

A chave permanece `ludus:progress:v1`, com objeto por identificador. `completedCaseIds` é opcional, sanitizado e acumulativo. Dados antigos preservam selos, contagens, data e último caso; não recebem três casos ficticiamente concluídos. Registros antigos podem ser revisitados para passar a contar casos desta edição. Repetir uma partida não remove selos. A exclusão manual exige confirmação e oferece cancelamento.

A produção livre não é persistida. Esse limite é informado na interface; a aplicação não mantém identificação do estudante nem avaliação individual. A conclusão não é prova de aprendizagem, e o uso com apoio não recebe penalização.

## Validação técnica

Verificações finais executadas em 2 de outubro de 2026, no Windows com PowerShell, Node 26.10.0, npm 11.19.1 e Docker 29.8.1. A suíte usou a imagem oficial `mcr.microsoft.com/playwright:v1.63.0-noble`, compatível com `@playwright/test` 1.63.0, contra o servidor standalone de produção iniciado por `npm start` após o build. O contêiner acessou o host por `host.docker.internal:3000`.

| Comando                                           | Resultado                                                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                    | Aprovado, código de saída 0.                                                                                    |
| `npm run tsc`                                     | Aprovado, código de saída 0; verificação independente do build.                                                 |
| `npm run build`                                   | Aprovado, código de saída 0; 27 páginas estáticas, incluindo as 20 rotas de jogo.                               |
| `npm run test:e2e:docker -- --reporter=list,json` | Aprovado, código de saída 0; 106 testes passaram, 2 ignorados intencionalmente, nenhuma falha ou instabilidade. |
| `git diff --check`                                | Aprovado, sem erros de espaços ou marcadores de conflito.                                                       |

A execução integral reuniu 108 testes em oito arquivos, nos projetos Chromium desktop e Mobile Chrome, com um worker, sem novas tentativas automáticas. Começou às 12:05:26 no fuso America/Fortaleza e durou aproximadamente 5 minutos e 25 segundos. Cada projeto aprovou 53 testes e ignorou somente a captura destinada ao outro tamanho de tela. Os dois testes ignorados não representam funcionalidades pendentes.

O [resumo estruturado da execução](evidencias/resumo-execucao.json) registra comandos, versões, digest da imagem e contagens extraídas do resultado do Playwright. As verificações cobrem catálogo com 20 identificadores e cinco níveis por área, 60 casos, coerência de gabaritos, cálculos de referência e limites de modelos; abertura das 20 rotas; jornadas completas nas quatro áreas; resposta correta, erro, pista e apoio; repetição sem regressão; legado e armazenamento malformado; filtros, fichas docentes e cópia de link; teclado, foco, preferências, responsividade e API.

Regressões específicas conferem texto amplo e alto contraste a 320 pixels nas quatro superfícies e jornadas completas das quatro áreas com texto amplo; cenário do laboratório preservado na decisão e restauração dos parâmetros iniciais; tabela de comparação percorrida por teclado e atalho ao catálogo com foco; troca de leitura no primeiro clique, cancelamento ao editar ou remover feedback, preservação da voz de outro botão, referência falada no apoio e ausência da API; cópia confirmada somente após a promessa resolver e endereço selecionável após rejeição; MathJax local com mhchem e potência, sem erro de renderização nem comandos TeX na transcrição para fala. As simulações de voz e clipboard não comprovam qualidade audível ou permissões reais do sistema. O teste de TeX cobre dois exemplos, sem declarar compatibilidade com todo comando possível.

Foram produzidas e examinadas as seguintes capturas com estado limpo e casos fictícios:

- [Hub no desktop](evidencias/hub-desktop.png).
- [Modo professor no desktop](evidencias/professores-desktop.png), com revisão das seções visíveis; os corpos das fichas ficam abaixo do recorte.
- [Hub no celular](evidencias/hub-mobile.png).
- [Jogo com alto contraste e texto amplo no celular](evidencias/jogo-contraste-mobile.png), em página completa.
- [Progresso no celular](evidencias/progresso-mobile.png).

As capturas examinadas não apresentaram sobreposição ou corte material nos estados mostrados. O extravasamento encontrado durante integração no painel a 320 pixels com texto amplo foi corrigido na grade e na quebra dos títulos antes da execução integral aprovada. Nenhum arquivo em `src/components/ui` ou `public/mathjax` foi alterado.

A validação acima corresponde à execução local anterior ao envio da branch. Os workflows existentes foram preservados; os resultados do GitHub Actions devem ser consultados no pull request. A aprovação técnica não equivale a validação pedagógica com estudantes ou certificação de acessibilidade.

## Limitações e riscos residuais

- Os casos são modelos didáticos. As decisões de referência dependem dos dados apresentados; exemplos financeiros, científicos, históricos e sociais não constituem previsão de situações reais.
- A sequência precisa de mediação e análise pedagógica no contexto da turma. Não houve estudo de aprendizagem, usabilidade com estudantes ou validação clínica. AEE não é uma atividade uniforme definida por diagnóstico.
- Teclado, preferências e responsividade podem ser verificados por testes. Compatibilidade de leitores de tela, vozes e necessidades individuais exige ensaios adicionais em dispositivos e tecnologias assistivas da escola.
- Estado local não implica instalação offline da aplicação. O progresso e as preferências permanecem no navegador; arquivos do aplicativo precisam estar disponíveis. Não há service worker nem sincronização.
- O build ainda ignora erros de tipo por configuração anterior. A aprovação depende da execução independente de `npm run tsc` e lint.
- A matriz e o catálogo cobrem recortes curriculares. Não representam todo o ensino médio nem preparação integral para Enem ou Saeb.
- Os estudos citados fundamentam escolhas e não autorizam estimativa de eficácia específica do Ludus. Documentos de pesquisa distinguem leitura integral, consulta a índices e limitações de acesso.

## Publicação

O resultado é proposto para revisão pela branch `codex/evolucao-investigativa`. A abertura do pull request foi solicitada após as verificações locais. Não houve issue prévia. A integração depende da revisão e das verificações do GitHub Actions; deploy e release constituem etapas posteriores.
