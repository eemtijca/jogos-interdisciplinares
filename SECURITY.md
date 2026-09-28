# Segurança

O Ludus é uma aplicação de jogos educacionais sem contas, banco de dados ou servidor de aplicação. Todo o estado fica no `localStorage` do dispositivo e nada é enviado para fora.

## Versões com suporte

O projeto é mantido em uma branch principal. Use a última revisão da `main`.

## Como reportar

Reporte vulnerabilidades pelo GitHub, em issue privada ou security advisory. Nunca abra issue pública com detalhes da falha e nunca inclua dados reais de estudantes.

Inclua, quando possível:

- descrição do problema e impacto potencial;
- passos para reproduzir, com o menor exemplo possível;
- versão ou commit afetado;
- sugestão de correção, se houver.

O retorno é feito pelo próprio canal do GitHub. Vulnerabilidades confirmadas são corrigidas antes da divulgação pública.

## Compromissos

- Nenhuma coleta de dados pessoais: o progresso e as preferências ficam no navegador.
- O MathJax é servido do próprio projeto, sem CDN externo.
- Dependências atualizadas via Dependabot, com foco em correções de segurança.
- O conteúdo dos jogos é estático; textos e expressões matemáticas passam por componentes próprios, sem HTML bruto.

## Fora de escopo

- Engenharia social e ataques físicos.
- Negação de serviço volumétrica contra a infraestrutura de hospedagem.
- Vulnerabilidades em dependências já corrigidas em versões posteriores.
