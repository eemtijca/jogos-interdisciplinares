import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "corte-de-video",
    title: "A fala que mudou no recorte",
    focus: "Montagem, modalização e efeito de sentido",
    context:
      'Um vídeo de dez segundos circula com o título "Professora exige fechar o pátio". A edição combina fala, legenda e trilha tensa.',
    mission: "Reconstrua a posição expressa e avalie o efeito dos elementos multimodais.",
    evidence: [
      {
        id: "corte",
        title: "Roteiro do recorte, com descrição acessível",
        text: 'Cena: portão fechado. Fala: "...fechar o pátio...". Legenda vermelha: "Professora exige fechamento". Trilha de alarme. O recorte não apresenta o início da frase.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "integra",
        title: "Transcrição completa",
        text: '"Se a avaliação técnica apontar risco, uma opção temporária é fechar o pátio. Enquanto isso, proponho inspecionar e sinalizar a área."',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "circulacao",
        title: "Registro da edição",
        text: "O editor admite selecionar o trecho porque a versão curta trouxe mais compartilhamentos. Não verificou se a legenda preservava a condição.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "efeitos",
        kind: "multi",
        prompt: "Selecione os dois efeitos produzidos pela edição.",
        options: [
          {
            id: "condicao",
            label:
              'A retirada de "se" transforma uma possibilidade condicionada em exigência aparente.',
            feedback: "A modalidade da fala foi alterada.",
          },
          {
            id: "clima",
            label: "Portão fechado e alarme sugerem urgência e decisão já tomada.",
            feedback: "Imagem e som produzem sentido junto com a fala.",
          },
          {
            id: "neutro",
            label: "A trilha é neutra porque não contém palavras.",
            feedback: "Elementos sonoros também orientam interpretação.",
          },
          {
            id: "autor",
            label: "A pessoa falou algo diferente na versão completa por mudar de opinião.",
            feedback: "As versões são do mesmo registro; a divergência vem da seleção.",
          },
        ],
        answer: ["condicao", "clima"],
        hint: "Compare verbo, condição, imagem e trilha, não somente a frase isolada.",
        explanation:
          "A análise multimodal considera como os modos se reforçam e alteram o alcance de uma fala.",
      },
      {
        id: "reedição",
        kind: "choice",
        prompt: "Qual roteiro curto preserva a posição?",
        options: [
          {
            id: "fiel",
            label:
              'Legenda: "Professora propõe inspeção; fechamento seria temporário se houver risco". Incluir a condição na fala.',
            feedback: "A reedição mantém hipótese, proposta atual e limite.",
          },
          {
            id: "total",
            label: 'Legenda: "Fechamento já decidido", com a imagem do portão.',
            feedback: "Não há decisão confirmada no registro.",
          },
          {
            id: "oposto",
            label: 'Legenda: "Professora rejeita qualquer fechamento".',
            feedback: "A fala considera fechamento como possibilidade condicionada.",
          },
        ],
        answer: "fiel",
        hint: "Um resumo curto precisa manter o que muda o sentido da decisão.",
        explanation: "Fidelidade não exige reproduzir tudo, mas preserva condição e posição.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Como corrigir a publicação?",
      options: [
        {
          id: "corrigir",
          label:
            "Substituir o recorte por roteiro fiel, identificar a edição e vincular a transcrição completa.",
          feedback: "A correção torna o procedimento visível e permite conferência.",
        },
        {
          id: "baixar",
          label: "Reduzir o volume do alarme e manter a legenda.",
          feedback: "A falsa exigência continuaria no texto.",
        },
        {
          id: "debate",
          label: "Fazer votação para decidir o que a professora quis dizer.",
          feedback: "A interpretação precisa responder ao registro, não à popularidade.",
        },
      ],
      answer: "corrigir",
      hint: "Corrija o elemento que distorceu e ofereça acesso ao contexto.",
      explanation:
        "A circulação da correção deve permitir reconhecer a mudança de sentido da versão anterior.",
    },
    conclusion: "A reedição manteve a fala como proposta condicionada.",
    reflection: "Que condição poderia caber no vídeo e ainda ser perdida no título?",
    transfer:
      "Ao compartilhar um recorte, confira se título, legenda, imagem e som preservam a modalidade da fala.",
  },
  {
    id: "grafico-na-rede",
    title: "Uma barra que cresce demais",
    focus: "Escala gráfica e evidência pertinente",
    context:
      'Uma postagem compara dois anos de empréstimos da biblioteca e anuncia "crescimento explosivo".',
    mission: "Escolha representação e texto que permitam comparar o dado sem ocultar limites.",
    evidence: [
      {
        id: "grafico",
        title: "Descrição do gráfico publicado",
        text: "Duas barras: 2024, 90 empréstimos; 2025, 100. O eixo começa em 85 e as barras aparentam ter alturas muito diferentes. A imagem não declara o recorte do eixo.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "registro",
        title: "Registro da biblioteca",
        text: "Totais anuais: 90 e 100. Em 2025 houve mais semanas abertas. Não há número de leitores únicos nem comparação por semana.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "comentario",
        title: "Comentário destacado",
        text: '"A campanha de leitura causou a explosão!" A postagem destacou essa fala sem apresentar estudo sobre o efeito da campanha.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "escala",
        kind: "choice",
        prompt: "Qual leitura compara o valor e o efeito visual?",
        options: [
          {
            id: "efeito",
            label: "Houve dez empréstimos a mais; o eixo truncado amplia a diferença visual.",
            feedback: "A leitura distingue aumento registrado e impressão de tamanho.",
          },
          {
            id: "dobrou",
            label: "Os empréstimos mais que dobraram porque a segunda barra é muito maior.",
            feedback: "Altura em eixo truncado não representa uma razão direta entre totais.",
          },
          {
            id: "falso",
            label: "Todo gráfico com eixo truncado é falso.",
            feedback:
              "Um eixo recortado pode servir a uma análise se estiver explícito; o problema é seu uso para induzir leitura inadequada.",
          },
        ],
        answer: "efeito",
        hint: "Compare números e ponto de partida do eixo.",
        explanation: "É necessário avaliar escala, legenda e objetivo da representação.",
      },
      {
        id: "pendencias",
        kind: "multi",
        prompt: "Que duas informações faltam para avaliar melhor a campanha?",
        options: [
          {
            id: "semanas",
            label: "Número de semanas abertas em cada ano.",
            feedback: "Ajuda a comparar acesso ao serviço em períodos diferentes.",
          },
          {
            id: "estudo",
            label: "Dados que permitam investigar o efeito específico da campanha.",
            feedback: "Totais anuais sozinhos não isolam uma causa.",
          },
          {
            id: "cor",
            label: "Cor favorita do autor do gráfico.",
            feedback: "Pode influir no design, mas não resolve a comparação ou causalidade.",
          },
          {
            id: "likes",
            label: "Total de curtidas como prova de que a campanha funcionou.",
            feedback: "Curtidas da postagem não medem empréstimos atribuíveis à campanha.",
          },
        ],
        answer: ["semanas", "estudo"],
        hint: "Diferencie mudança observada de explicação da mudança.",
        explanation:
          "Uma representação clara ainda pode acompanhar uma conclusão causal excessiva.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual publicação representa o dado com responsabilidade?",
      options: [
        {
          id: "clareza",
          label:
            "Mostrar eixo identificado e totais, informar dez empréstimos a mais e a diferença de semanas abertas; não atribuir causa ainda.",
          feedback: "O texto permite conferir valores e inclui variável contextual.",
        },
        {
          id: "impacto",
          label: "Manter barras sem escala para chamar atenção.",
          feedback: "A atenção é obtida por ocultar uma condição de leitura.",
        },
        {
          id: "remover",
          label: "Eliminar o gráfico e afirmar que não houve aumento.",
          feedback: "A crítica visual não elimina a diferença entre 90 e 100.",
        },
      ],
      answer: "clareza",
      hint: "Uma boa correção preserva informação e remove a inferência não sustentada.",
      explanation: "Leitura de mídia articula dados, representação e argumento.",
    },
    conclusion: "O novo post separou magnitude, contexto e hipótese causal.",
    reflection: "Como a escolha de uma unidade por semana poderia mudar a interpretação?",
    transfer:
      "Em um gráfico da rede, procure origem do eixo, unidade, período, fonte e afirmação que acompanha a imagem.",
  },
  {
    id: "curadoria-de-feed",
    title: "Quem aparece no debate?",
    focus: "Curadoria, diversidade e alcance",
    context:
      "O grêmio vai montar um carrossel sobre o uso de uma praça. Seu feed mostra quase só um grupo e a equipe acredita que isso representa o bairro.",
    mission: "Reveja o processo de seleção de vozes antes de publicar uma síntese.",
    evidence: [
      {
        id: "feed",
        title: "Amostra do feed",
        text: "Nove das dez postagens vistas pelo editor defendem eventos com som. O editor segue majoritariamente produtores de eventos.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "escuta",
        title: "Consulta fora do feed",
        text: "Moradores próximos citam descanso e acesso; artistas defendem renda e cultura; pessoas que usam a praça durante o dia pedem manutenção.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "carrossel",
        title: "Roteiro inicial",
        text: 'Título: "Todo o bairro exige shows". Primeiro quadro tem palco cheio; não há critério de seleção nem vozes do entorno.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "amostra",
        kind: "choice",
        prompt: "O feed permite concluir o que todo o bairro deseja?",
        options: [
          {
            id: "recorte",
            label: "Não. Rede seguida e mecanismos de seleção afetam quais posições aparecem.",
            feedback: "A amostra do feed não é uma consulta representativa do território.",
          },
          {
            id: "maioria",
            label: "Sim, nove de dez posts equivalem a 90% dos moradores.",
            feedback: "Postagem não é unidade de morador e a seleção não é aleatória.",
          },
          {
            id: "nada",
            label: "Não existe informação aproveitável em nenhuma postagem.",
            feedback: "As postagens mostram posições de seus autores, com alcance delimitado.",
          },
        ],
        answer: "recorte",
        hint: "Pergunte como o conteúdo chegou até o editor.",
        explanation: "Curadoria muda visibilidade sem transformar posições em opinião de todos.",
      },
      {
        id: "roteiro",
        kind: "order",
        prompt: "Organize uma curadoria mais explícita.",
        options: [
          {
            id: "criterios",
            label: "Definir tema e critérios para incluir diferentes usos e grupos.",
            feedback: "Critério reduz escolha guiada apenas pelo feed.",
          },
          {
            id: "busca",
            label: "Buscar vozes e dados fora da rede habitual.",
            feedback: "O processo amplia o universo considerado.",
          },
          {
            id: "sintese",
            label: "Explicar convergências, conflitos e limites da seleção.",
            feedback: "A síntese não apaga divergências.",
          },
        ],
        answer: ["criterios", "busca", "sintese"],
        hint: "A diversidade de fontes deve ser planejada, não apenas acrescentada no final.",
        explanation: "Uma curadoria responsável declara como escolheu e o que ainda não cobriu.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual abertura serve ao novo carrossel?",
      options: [
        {
          id: "plural",
          label:
            "Praça em debate: cultura, descanso e manutenção. Apresentamos três grupos consultados; a escuta continua.",
          feedback: "Identifica dimensões, participantes e limite da consulta.",
        },
        {
          id: "todos",
          label: "Todo o bairro quer shows, como o feed comprova.",
          feedback: "A generalização continua sem sustentação.",
        },
        {
          id: "empate",
          label: "Todas as afirmações têm a mesma evidência só porque há vários lados.",
          feedback: "Diversidade de vozes não dispensa avaliar cada alegação e seu suporte.",
        },
      ],
      answer: "plural",
      hint: "Pluralidade não significa representar cada fato como igualmente comprovado.",
      explanation:
        "O carrossel pode mostrar conflito de prioridades e distinguir afirmações verificáveis de preferências.",
    },
    conclusion: "A equipe transformou um feed restrito em uma seleção declarada e revisável.",
    reflection: "Quem ainda está ausente e que meio de escuta poderia alcançá-lo?",
    transfer:
      'Antes de dizer "todos", examine quem foi ouvido, como foi selecionado e qual unidade foi contada.',
  },
];
