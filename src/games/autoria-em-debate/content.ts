import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "voz-do-poema",
    title: "A voz que não é biografia",
    focus: "Eu lírico, forma e interpretação apoiada",
    context:
      "O clube literário prepara uma leitura pública de um poema fictício. Um comentário afirma que cada verso descreve exatamente a vida da autora.",
    mission: "Construa uma interpretação apoiada na forma, sem inventar dados biográficos.",
    evidence: [
      {
        id: "poema",
        title: "Poema fictício original",
        text: '"Na gaveta levo o mar / no relógio, uma estação / se a rua fechar a porta / invento outra direção." Autoria do texto didático: equipe Ludus.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "comentario",
        title: "Comentário de leitura",
        text: '"A autora mora no litoral e perdeu o emprego, pois fala de mar e porta fechada." Nenhuma fonte biográfica acompanha a afirmação.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "forma",
        title: "Notas do clube",
        text: "Mar e estação são postos em lugares inesperados. Os versos relacionam interior, tempo e percurso; o último verbo indica ação diante de um limite.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "leitura",
        kind: "multi",
        prompt: "Quais duas interpretações têm apoio textual?",
        options: [
          {
            id: "imagem",
            label:
              "O poema desloca elementos para lugares improváveis, criando imagens de memória ou desejo.",
            feedback: "A leitura considera as relações entre palavras.",
          },
          {
            id: "acao",
            label: "O verso final constrói uma resposta ativa ao fechamento da porta.",
            feedback: 'O verbo "invento" apoia a interpretação.',
          },
          {
            id: "vida",
            label: "O mar comprova onde a autora nasceu.",
            feedback: "Imagem poética não é documento biográfico por si só.",
          },
          {
            id: "unica",
            label: "Há uma única interpretação válida, independente do texto.",
            feedback: "Interpretações devem ser justificadas e podem divergir.",
          },
        ],
        answer: ["imagem", "acao"],
        hint: "Use escolhas do poema como evidência da interpretação.",
        explanation:
          "Eu lírico não é identidade biográfica automaticamente; uma leitura pode dialogar com contexto quando há fontes para ele.",
      },
      {
        id: "performance",
        kind: "choice",
        prompt: "Qual escolha de leitura oral dialoga com a progressão do poema?",
        options: [
          {
            id: "pausa",
            label: "Pausar antes do último verso e destacá-lo como resposta às imagens anteriores.",
            feedback: "A performance propõe uma interpretação audível do movimento textual.",
          },
          {
            id: "fato",
            label: "Anunciar antes que a autora perdeu o emprego.",
            feedback: "Isso converte hipótese sem fonte em informação biográfica.",
          },
          {
            id: "igual",
            label: "Afirmar que ritmo e pausa não produzem sentido.",
            feedback: "A realização oral também interpreta.",
          },
        ],
        answer: "pausa",
        hint: "Pense no efeito produzido pela passagem de guardar imagens a inventar direção.",
        explanation:
          "Uma performance pode ser discutida com base na estrutura e precisa reconhecer sua condição de interpretação.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual apresentação é apropriada para a leitura pública?",
      options: [
        {
          id: "leitura",
          label:
            "Identificar a autoria didática e apresentar a leitura de resistência como interpretação apoiada no último verso.",
          feedback: "A apresentação dá crédito e explica a base interpretativa.",
        },
        {
          id: "biografia",
          label: "Contar a perda de emprego como história real da autora.",
          feedback: "Não existe sustentação para esse fato.",
        },
        {
          id: "anonima",
          label: "Não dar crédito porque o clube escolheu a voz.",
          feedback: "A performance tem contribuição própria, mas não elimina a autoria do texto.",
        },
      ],
      answer: "leitura",
      hint: "Distinga texto, autoria, voz poética e contribuição da performance.",
      explanation:
        "A autoria pode ser compartilhada em camadas quando cada participação fica identificada.",
    },
    conclusion: "O clube apresentou uma leitura argumentada sem transformar imagem em biografia.",
    reflection: "Que outra performance do primeiro verso poderia sustentar uma leitura diferente?",
    transfer:
      "Em leitura literária, ligue interpretação a escolhas textuais e atribua separadamente texto e performance.",
  },
  {
    id: "remix-autorizado",
    title: "O cartaz muda de sentido",
    focus: "Remix, atribuição e condições de uso",
    context:
      "Um coletivo autorizou adaptar um cartaz fictício para uma mostra, com condições escritas. A equipe quer cortar o título e usar a imagem em uma campanha.",
    mission: "Compare autorização, contexto e nova circulação.",
    evidence: [
      {
        id: "original",
        title: "Cartaz original, descrição acessível",
        text: 'Imagem: mãos diversas cuidando de uma muda. Título: "Memória que cresce em coletivo". Crédito: Coletivo Raízes.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "termo",
        title: "Autorização do caso",
        text: "Permite adaptação para a mostra escolar, mantendo crédito e indicando alterações. Não autoriza uso em publicidade externa. Trata-se de acordo fictício, não descrição de uma licença legal.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "proposta",
        title: "Novo layout",
        text: 'Troca o título por "Compre e faça parte", remove o crédito e prepara postagem para anunciar uma loja patrocinadora.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "mudancas",
        kind: "multi",
        prompt: "Quais duas alterações ultrapassam as condições recebidas?",
        options: [
          {
            id: "credito",
            label: "Remover o crédito do coletivo.",
            feedback: "O acordo exige sua manutenção.",
          },
          {
            id: "externo",
            label: "Usar em publicidade externa de uma loja.",
            feedback: "A finalidade autorizada foi a mostra escolar.",
          },
          {
            id: "tamanho",
            label: "Redimensionar para a mostra, mantendo crédito e sinalizando a edição.",
            feedback: "É uma adaptação coerente com as condições apresentadas.",
          },
          {
            id: "registro",
            label: "Indicar que o cartaz foi adaptado pela turma.",
            feedback: "A indicação torna a contribuição transparente.",
          },
        ],
        answer: ["credito", "externo"],
        hint: "Compare cada mudança com finalidade e condições expressas, sem presumir uma lei.",
        explanation: "Uma autorização específica não cobre toda nova circulação.",
      },
      {
        id: "sentido",
        kind: "choice",
        prompt: "Além do crédito, qual efeito a troca de título produz?",
        options: [
          {
            id: "mercado",
            label: "O cuidado coletivo passa a funcionar como convite de consumo.",
            feedback: "A relação entre imagem e frase altera a posição do cartaz.",
          },
          {
            id: "nada",
            label: "A imagem torna qualquer título equivalente.",
            feedback: "Modos verbal e visual constroem sentido juntos.",
          },
          {
            id: "mesmo",
            label: "O título comprova que o coletivo apoia a loja.",
            feedback: "Uma adaptação da turma não constitui manifestação do coletivo.",
          },
        ],
        answer: "mercado",
        hint: "Observe quem é convidado a agir e qual ação passou a ser pedida.",
        explanation:
          "Remix tem autoria e responsabilidade porque pode deslocar o sentido de um material.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Que encaminhamento atende ao projeto escolar?",
      options: [
        {
          id: "mostra",
          label:
            "Adaptar para a mostra, manter crédito e informar mudanças; negociar outra autorização se quiser nova finalidade.",
          feedback:
            "Atende às condições existentes e deixa a proposta externa pendente de diálogo.",
        },
        {
          id: "apagar",
          label: "Retirar o crédito para evitar vínculo com o coletivo.",
          feedback: "Ocultar a origem não resolve o limite de autorização.",
        },
        {
          id: "patrocinio",
          label: "Publicar a publicidade e pedir autorização depois.",
          feedback: "A nova circulação ocorreria antes do acordo necessário.",
        },
      ],
      answer: "mostra",
      hint: "A solução deve respeitar o acordo do caso e mostrar quem fez cada mudança.",
      explanation:
        "Crédito, autorização e fidelidade de contexto são perguntas relacionadas, mas distintas.",
    },
    conclusion: "A turma preservou a finalidade autorizada e assumiu a autoria da adaptação.",
    reflection:
      "Que mudança poderia manter todas as condições e ainda alterar profundamente o sentido?",
    transfer:
      "Em um remix, registre material de origem, condições de uso, mudanças e responsáveis.",
  },
  {
    id: "projeto-colaborativo",
    title: "Quem fez o quê no podcast?",
    focus: "Autoria coletiva e rastreabilidade",
    context:
      'Um podcast estudantil foi produzido por pesquisa, roteiro, edição e ferramenta automática. A capa traz apenas "feito por IA" e o roteiro inclui uma citação sem fonte.',
    mission: "Reorganize os créditos e a verificação para que o projeto assuma suas decisões.",
    evidence: [
      {
        id: "processo",
        title: "Registro de contribuições",
        text: "Ana pesquisou, Rui entrevistou, Bia escreveu e o grupo editou. Uma ferramenta sugeriu títulos e uma transcrição inicial, revisada por Rui.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "citacao",
        title: "Problema no roteiro",
        text: "A ferramenta sugeriu uma fala atribuída a uma pesquisadora. A equipe não localizou a fala em nenhuma publicação ou gravação.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "entrevista",
        title: "Manifestação da entrevistada",
        text: "A entrevistada autorizou o áudio completo para o podcast da escola e pediu revisão do trecho escolhido para evitar mudança de sentido.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "checagem",
        kind: "order",
        prompt: "Organize o procedimento antes de publicar.",
        options: [
          {
            id: "rastro",
            label: "Listar fontes e marcar a citação que não foi localizada.",
            feedback: "É preciso separar conteúdo rastreável de sugestão.",
          },
          {
            id: "revisao",
            label: "Remover a citação sem suporte e revisar o trecho com a entrevistada.",
            feedback: "A autoria editorial permanece com o grupo.",
          },
          {
            id: "creditos",
            label: "Registrar contribuições e uso da ferramenta na versão final.",
            feedback: "A transparência acompanha as decisões verificadas.",
          },
        ],
        answer: ["rastro", "revisao", "creditos"],
        hint: "Identifique o problema antes de registrar a versão como concluída.",
        explanation:
          "Uma ferramenta pode participar do processo sem ser fonte de evidência nem assumir a responsabilidade editorial.",
      },
      {
        id: "autoria",
        kind: "multi",
        prompt: "Quais duas afirmações reconhecem autoria e responsabilidade?",
        options: [
          {
            id: "pessoas",
            label: "As contribuições de pesquisa, entrevista, roteiro e edição devem aparecer.",
            feedback: "São trabalhos diferentes que sustentam o resultado.",
          },
          {
            id: "ferramenta",
            label: "O uso da ferramenta precisa ser descrito junto com a revisão humana.",
            feedback: "A descrição explicita seu papel e seus limites.",
          },
          {
            id: "automatica",
            label: "A fala sugerida pode ficar porque a ferramenta costuma acertar.",
            feedback: "Probabilidade de acerto não substitui localização da fonte.",
          },
          {
            id: "nenhum",
            label: "Não há autoria humana se um título veio de uma ferramenta.",
            feedback: "Escolha, revisão e publicação continuam sendo decisões do grupo.",
          },
        ],
        answer: ["pessoas", "ferramenta"],
        hint: "Crédito deve tornar o processo compreensível, não apagar quem decidiu.",
        explanation: "Autoria coletiva exige reconhecer trabalho e assumir o que foi publicado.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual versão está pronta para avaliação editorial?",
      options: [
        {
          id: "revisada",
          label:
            "Citação sem suporte removida, entrevista revisada com a participante e créditos por contribuição, incluindo o uso da ferramenta.",
          feedback: "A versão combina rastreabilidade, contexto e transparência.",
        },
        {
          id: "ia",
          label: 'Publicar como "feito por IA" e atribuir qualquer erro à ferramenta.',
          feedback: "O rótulo não elimina a responsabilidade de quem publica.",
        },
        {
          id: "titulo",
          label: "Corrigir só a capa, mantendo a citação não localizada.",
          feedback: "A creditação não resolve o problema factual do roteiro.",
        },
      ],
      answer: "revisada",
      hint: "Verificação de conteúdo e crédito de processo precisam ocorrer juntos.",
      explanation:
        "Neste caso, a equipe só pode sustentar as falas que conseguiu rastrear e o uso autorizado da entrevista.",
    },
    conclusion: "O podcast tornou visíveis as contribuições e removeu uma atribuição sem fonte.",
    reflection: "Como descrever uma contribuição pequena sem superestimá-la nem apagá-la?",
    transfer:
      "Em produção coletiva, mantenha registro de contribuições, fontes, ferramentas e revisões.",
  },
];
