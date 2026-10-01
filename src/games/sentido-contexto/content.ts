import type { InvestigationCase } from "../_shared/investigation-game";

export const CASES: InvestigationCase[] = [
  {
    id: "manchete-cantina",
    title: "A manchete da cantina",
    mission: "Distinguir o fato do julgamento na notícia da escola.",
    context:
      "O jornal escreveu: 'Finalmente, a cantina acaba com o desperdício absurdo'. O registro da cozinha informa que, em uma semana, as sobras caíram de 10 kg para 6 kg. Não há dados de outras semanas.",
    evidence: [
      {
        category: "O dado",
        hook: "O que foi medido?",
        icon: "documento",
        evidence:
          "As sobras passaram de 10 kg para 6 kg na semana observada. Houve redução de 4 kg, mas ainda sobraram 6 kg.",
      },
      {
        category: "A escolha de palavras",
        hook: "Fato ou avaliação?",
        icon: "conversa",
        evidence:
          "'Finalmente' apresenta a mudança como atrasada. 'Absurdo' expressa o julgamento de quem escreveu.",
      },
      {
        category: "O limite",
        hook: "O que falta saber?",
        icon: "busca",
        evidence:
          "Uma semana de registro não mostra se a redução vai durar. 'Acaba' afirma mais do que os dados permitem.",
      },
    ],
    test: {
      prompt: "Qual trecho apresenta uma avaliação do autor?",
      hint: "Procure uma palavra que julgue a situação, em vez de informar uma quantidade.",
      correctId: "julgamento",
      options: [
        {
          id: "quantidade",
          title: "As sobras caíram de 10 kg para 6 kg.",
          explanation:
            "Esse trecho informa quantidades medidas. Procure a palavra que expressa julgamento.",
        },
        {
          id: "julgamento",
          title: "O desperdício era absurdo.",
          explanation: "Isso. 'Absurdo' é uma avaliação, e não uma medida registrada.",
        },
        {
          id: "periodo",
          title: "O registro foi feito durante uma semana.",
          explanation: "A duração é um dado do registro. Ela não diz se o autor aprova a situação.",
        },
      ],
    },
    decision: {
      prompt: "Que manchete respeita os dados disponíveis?",
      hint: "A nova manchete precisa reconhecer a redução e o período observado, sem prometer o fim das sobras.",
      correctId: "reduziu",
      options: [
        {
          id: "acabou",
          title: "Cantina elimina todas as sobras.",
          explanation:
            "Ainda sobraram 6 kg. Eliminar todas as sobras não é o que o registro mostrou.",
        },
        {
          id: "reduziu",
          title: "Sobras da cantina diminuem na semana observada.",
          explanation: "A frase informa a redução sem extrapolar o período medido.",
        },
        {
          id: "sempre",
          title: "Cantina nunca mais desperdiçará alimentos.",
          explanation:
            "O futuro não foi medido. Uma semana não garante que o resultado será permanente.",
        },
      ],
    },
    verdict: {
      title: "Manchete com medida",
      text: "As palavras orientam a leitura. Uma notícia responsável distingue números, avaliações e promessas. O desperdício diminuiu na semana observada; não desapareceu.",
      detail: {
        label: "Para conversar em sala",
        text: "Compare 'absurdo', 'elevado' e '10 kg'. Qual expressão exige uma medida? Qual apresenta uma avaliação? Opiniões podem aparecer, desde que sejam reconhecidas como opiniões.",
      },
    },
  },
  {
    id: "convite-reuniao",
    title: "O convite da reunião",
    mission: "Reconhecer como a linguagem pode incluir ou pressionar.",
    context:
      "Um cartaz anuncia: 'Só quem se importa de verdade vai à reunião de sábado'. A reunião discutirá o uso da quadra. Algumas famílias trabalham aos sábados e poderão enviar sugestões por escrito.",
    evidence: [
      {
        category: "A finalidade",
        hook: "Para que serve o convite?",
        icon: "alvo",
        evidence:
          "A reunião busca sugestões sobre o uso da quadra. O objetivo é ouvir a comunidade.",
      },
      {
        category: "A pressão",
        hook: "Quem fica de fora?",
        icon: "usuarios",
        evidence:
          "A expressão 'só quem se importa' apresenta a presença como prova de cuidado, desconsiderando impedimentos reais.",
      },
      {
        category: "A alternativa",
        hook: "Há outra participação?",
        icon: "documento",
        evidence:
          "Sugestões por escrito também serão recebidas. O cartaz não informa essa possibilidade.",
      },
    ],
    test: {
      prompt: "Que efeito a frase do cartaz pode produzir?",
      hint: "Pense em uma pessoa interessada que precisa trabalhar no horário da reunião.",
      correctId: "pressao",
      options: [
        {
          id: "neutralidade",
          title: "Informar apenas o horário da reunião.",
          explanation: "O cartaz também julga quem comparece. Não apresenta somente um horário.",
        },
        {
          id: "pressao",
          title: "Fazer quem não pode ir parecer desinteressado.",
          explanation: "Isso. A frase relaciona presença e cuidado como se fossem a mesma coisa.",
        },
        {
          id: "alternativa",
          title: "Explicar como enviar sugestões por escrito.",
          explanation: "Essa alternativa existe, mas a frase do cartaz não a explica.",
        },
      ],
    },
    decision: {
      prompt: "Qual convite amplia a participação?",
      hint: "Mantenha o convite e informe a alternativa para quem não pode comparecer.",
      correctId: "inclusao",
      options: [
        {
          id: "culpa",
          title: "Quem faltar não poderá opinar sobre a quadra.",
          explanation:
            "Há uma alternativa por escrito. Impedir a opinião exclui pessoas sem necessidade.",
        },
        {
          id: "presenca",
          title: "Todos devem comparecer, sem exceção.",
          explanation: "O convite ignora os impedimentos de horário já conhecidos.",
        },
        {
          id: "inclusao",
          title: "Participe no sábado ou envie sua sugestão por escrito.",
          explanation: "O convite informa duas formas de participar sem julgar as famílias.",
        },
      ],
    },
    verdict: {
      title: "Convite que acolhe",
      text: "A linguagem pode abrir ou fechar caminhos de participação. Um convite claro apresenta opções e evita transformar a ausência em julgamento sobre a pessoa.",
    },
  },
  {
    id: "previsao-feira",
    title: "A previsão da feira",
    mission: "Comunicar uma previsão sem transformá-la em certeza.",
    context:
      "O grupo da feira recebeu duas mensagens: 'Pode chover à tarde' e 'Vai chover com certeza; cancelem tudo'. O boletim local informa possibilidade de chuva, sem confirmação do horário. A escola dispõe de um espaço coberto.",
    evidence: [
      {
        category: "O boletim",
        hook: "Qual é a informação original?",
        icon: "documento",
        evidence:
          "A informação disponível é uma possibilidade de chuva. O boletim não confirma chuva no horário da feira.",
      },
      {
        category: "O grau de certeza",
        hook: "Pode ou vai?",
        icon: "conversa",
        evidence:
          "'Pode' expressa possibilidade. 'Com certeza' apresenta a ocorrência como garantida.",
      },
      {
        category: "O planejamento",
        hook: "Qual alternativa existe?",
        icon: "escudo",
        evidence:
          "A escola tem um espaço coberto e pode preparar uma alternativa, acompanhando a atualização do boletim.",
      },
    ],
    test: {
      prompt: "Qual mensagem preserva o grau de certeza do boletim?",
      hint: "Uma possibilidade não é uma garantia nem uma impossibilidade.",
      correctId: "possibilidade",
      options: [
        {
          id: "certeza",
          title: "A chuva está garantida.",
          explanation: "Garantia é mais forte do que a possibilidade informada.",
        },
        {
          id: "possibilidade",
          title: "Há possibilidade de chuva à tarde.",
          explanation: "Isso. A mensagem mantém a possibilidade sem inventar certeza.",
        },
        {
          id: "impossivel",
          title: "Não há chance de chover.",
          explanation: "O boletim admite chuva. Negar qualquer chance também muda a informação.",
        },
      ],
    },
    decision: {
      prompt: "Que comunicado orienta a comunidade com cuidado?",
      hint: "Informe o que se sabe e o plano alternativo disponível.",
      correctId: "plano",
      options: [
        {
          id: "plano",
          title: "Pode chover; haverá espaço coberto e novos avisos.",
          explanation: "A mensagem mantém a incerteza e apresenta uma medida concreta.",
        },
        {
          id: "garantia",
          title: "Garantimos que não haverá chuva.",
          explanation: "A equipe da escola não pode garantir a ausência de chuva.",
        },
        {
          id: "cancelamento",
          title: "A feira foi cancelada porque a chuva é certa.",
          explanation: "Não há certeza de chuva nem confirmação de cancelamento no contexto.",
        },
      ],
    },
    verdict: {
      title: "Certeza na medida certa",
      text: "Palavras como 'pode', 'provavelmente' e 'certamente' mudam a força de uma afirmação. Comunicar a incerteza com clareza ajuda a planejar sem espalhar conclusões que a fonte não sustenta.",
    },
  },
];
