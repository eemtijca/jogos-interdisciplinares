import type { InvestigationCase, InvestigationModel } from "@/games/_shared/investigation-types";

const MODELO_TEMPO: InvestigationModel = {
  title: "A semana tem 168 horas",
  expression: "Renda líquida = horas × pagamento − R$ 30; tempo restante = 49 − horas",
  note: "Agenda e valores fictícios de uma pessoa adulta. O modelo só compara renda e tempo: não mede saúde, qualidade do trabalho nem define limites legais. Horários sobrepostos e custos variáveis exigem análise adicional.",
  parameters: [
    {
      id: "horas",
      label: "Horas de trabalho na semana",
      min: 0,
      max: 40,
      step: 5,
      initial: 20,
      unit: "h",
    },
    {
      id: "pagamento",
      label: "Pagamento hipotético por hora",
      min: 10,
      max: 25,
      step: 1,
      initial: 15,
      unit: "R$/h",
    },
  ],
  evaluate: ({ horas, pagamento }) => [
    {
      label: "Renda após deslocamento",
      value: horas === 0 ? 0 : horas * pagamento - 30,
      unit: "R$",
    },
    { label: "Tempo restante para descanso livre e imprevistos", value: 49 - horas, unit: "h" },
  ],
};
/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "fila-de-apoio",
    title: "A mesma oferta, necessidades distintas",
    focus: "Igualdade, equidade e justificativa",
    context:
      "A escola tem dez kits de apoio à leitura para quinze solicitações. Uma comissão fictícia precisa estabelecer prioridade inicial.",
    mission: "Compare regras sem transformar necessidade em inferioridade.",
    evidence: [
      {
        id: "necessidades",
        title: "Registro autorizado",
        text: "Cinco pessoas já dispõem de recurso equivalente em casa; dez relatam barreira de acesso para atividades. Não há ranking de valor entre estudantes.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "recurso",
        title: "Condições do empréstimo",
        text: "Os kits podem circular em dois turnos; algumas atividades exigem uso fora da escola. A comissão ainda precisa ouvir cada necessidade de tempo.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "propostas",
        title: "Regras em debate",
        text: "A: ordem de chegada; B: sorteio geral; C: prioridade para barreira identificada e rodízio acompanhado. Regras propostas para o caso, sem efeito de lei.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "igual",
        kind: "choice",
        prompt: "Qual diferença relevante aparece entre tratar todos igual e garantir acesso?",
        options: [
          {
            id: "equidade",
            label: "A mesma regra pode manter uma barreira para quem não tem alternativa.",
            feedback: "A avaliação considera condições de participação, sem hierarquizar pessoas.",
          },
          {
            id: "merito",
            label: "Quem tem recurso em casa merece mais kits.",
            feedback: "Posse de recurso não mede mérito nem necessidade.",
          },
          {
            id: "sorte",
            label: "Um sorteio sempre resolve toda desigualdade.",
            feedback:
              "O sorteio pode ser imparcial no procedimento e não atender a barreiras desiguais.",
          },
        ],
        answer: "equidade",
        hint: "Compare oportunidades concretas, além do formato da regra.",
        explanation: "Equidade exige explicitar a necessidade atendida e justificar o critério.",
      },
      {
        id: "cuidados",
        kind: "multi",
        prompt: "Que duas salvaguardas tornam a prioridade justificável?",
        options: [
          {
            id: "privacidade",
            label: "Registrar necessidade sem publicar nomes ou rótulos.",
            feedback: "Transparência do critério não exige exposição pessoal.",
          },
          {
            id: "revisao",
            label: "Permitir revisão e ouvir necessidades de duração do uso.",
            feedback: "Um critério inicial pode falhar em situações específicas.",
          },
          {
            id: "fixo",
            label: "Impedir qualquer contestação para preservar a autoridade.",
            feedback: "Fecha o caminho para corrigir uma avaliação inadequada.",
          },
          {
            id: "inferior",
            label: "Apresentar quem recebe como menos capaz.",
            feedback: "Necessidade de acesso não significa incapacidade.",
          },
        ],
        answer: ["privacidade", "revisao"],
        hint: "Uma regra ética considera também como as pessoas serão tratadas.",
        explanation: "Critério, privacidade e revisão evitam converter apoio em estigma.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual encaminhamento deve abrir a distribuição?",
      options: [
        {
          id: "apoio",
          label:
            "Priorizar barreiras sem alternativa, ouvir duração necessária, preservar privacidade e revisar o rodízio.",
          feedback:
            "A escolha atende ao objetivo de acesso e mantém controle sobre suas consequências.",
        },
        {
          id: "chegada",
          label: "Usar só ordem de chegada sem observar quem não consegue solicitar no horário.",
          feedback: "Essa regra pode premiar facilidade de acesso ao processo.",
        },
        {
          id: "expor",
          label: "Publicar necessidades individuais para que colegas aprovem.",
          feedback: "Expõe pessoas a julgamento sem necessidade.",
        },
      ],
      answer: "apoio",
      hint: "A prioridade precisa reduzir uma barreira concreta e ter revisão.",
      explanation:
        "A resposta esperada está vinculada ao objetivo de acesso do caso, não a uma receita universal para todo recurso.",
    },
    conclusion: "A comissão justificou prioridade e criou revisão sem rotular estudantes.",
    reflection: "Em que situação o rodízio poderia prejudicar alguém mesmo parecendo justo?",
    transfer:
      "Ao propor uma regra, pergunte quem terá acesso, quem ficará de fora e como corrigir o resultado.",
  },
  {
    id: "tempo-trabalho",
    title: "Renda, tempo e responsabilidades",
    focus: "Consequências e limites de um modelo",
    context:
      "Lia tem 19 anos, estuda e avalia uma semana de trabalho temporário. O pagamento e as tarefas são fictícios; o caso não determina direitos ou vínculos jurídicos.",
    mission: "Use o modelo para identificar custo de tempo e construir uma negociação.",
    evidence: [
      {
        id: "semana",
        title: "Agenda base",
        text: "Semana de 168 h: sono planejado 56 h, estudo 35 h, deslocamento e cuidados 28 h. Restam 49 h antes do trabalho e do descanso livre.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "propostas",
        title: "Condições oferecidas",
        text: "Trabalho paga R$ 15 por hora, com custo fixo de deslocamento de R$ 30 na semana. Há proposta de 20 h ou 40 h; horários precisam ser negociados.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "familia",
        title: "Conversa de casa",
        text: "A casa precisa de R$ 200 adicionais. Lia quer preservar estudo e descanso; a família aceita conversar sobre outras formas de dividir os cuidados.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "comparacao",
        kind: "choice",
        prompt: "No modelo, o que muda de 20 h para 40 h de trabalho?",
        options: [
          {
            id: "troca",
            label: "A renda líquida vai de R$ 270 para R$ 570 e o tempo restante de 29 h para 9 h.",
            feedback: "Os cálculos mostram custo de oportunidade temporal; não medem saúde.",
          },
          {
            id: "saude",
            label: "A saúde cai exatamente vinte pontos.",
            feedback: "Não há escala clínica nem relação validada para esse resultado.",
          },
          {
            id: "semcusto",
            label: "Só a renda muda; o tempo se recupera sozinho.",
            feedback: "A semana mantém 168 horas.",
          },
        ],
        answer: "troca",
        hint: "Observe dois resultados juntos, sem transformar um deles em medida de bem-estar.",
        explanation:
          "O modelo explicita renda e tempo; não prevê consequências individuais automaticamente.",
      },
      {
        id: "negociar",
        kind: "multi",
        prompt: "Quais duas ações enfrentam o dilema em vez de apenas deslocar o custo?",
        options: [
          {
            id: "horario",
            label: "Negociar horários compatíveis com estudo e esclarecer tarefas.",
            feedback: "A negociação enfrenta a condição que gera conflito.",
          },
          {
            id: "cuidado",
            label: "Rever a divisão de cuidados e outras formas de cobrir os R$ 200.",
            feedback: "Não deixa toda a solução concentrada no trabalho de Lia.",
          },
          {
            id: "culpa",
            label: "Culpar Lia se o orçamento da casa não fechar.",
            feedback: "Culpabilização apaga condições e responsabilidades compartilhadas.",
          },
          {
            id: "certeza",
            label: "Afirmar que renda maior sempre compensa qualquer desgaste.",
            feedback: "A prioridade financeira não elimina outros valores.",
          },
        ],
        answer: ["horario", "cuidado"],
        hint: "Considere pessoas, condições e responsabilidades da escolha.",
        explanation: "Deliberação ética examina alternativas e quem suporta seus custos.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual plano é justificável pelos objetivos declarados?",
      options: [
        {
          id: "plano",
          label:
            "Negociar 20 h compatíveis com estudo, destinar R$ 200 à casa e revisar agenda e custos após a semana.",
          feedback:
            "O cálculo atende a necessidade indicada com tempo restante maior, sob condições de horário.",
        },
        {
          id: "maximo",
          label: "Aceitar 40 h porque a renda decide tudo.",
          feedback:
            "É uma prioridade possível, mas ignora explicitamente os demais objetivos do caso.",
        },
        {
          id: "absoluto",
          label: "Declarar que trabalhar 20 h garante boa saúde.",
          feedback: "O modelo não mede saúde nem situações individuais.",
        },
      ],
      answer: "plano",
      hint: "A decisão precisa combinar o cálculo com valores e condições que ele não calcula.",
      explanation:
        "A resposta esperada atende aos objetivos e dados deste caso; renda líquida e tempo não esgotam o que significa trabalho decente.",
    },
    conclusion: "A escolha ficou condicionada a horário compatível, divisão de cuidado e revisão.",
    reflection: "Que custo não previsto no modelo poderia alterar o plano?",
    transfer:
      "Antes de avaliar uma proposta de trabalho, faça uma agenda e uma conta de despesas, depois discuta proteção, condições e voz dos envolvidos.",
    model: MODELO_TEMPO,
  },
  {
    id: "imagem-solidariedade",
    title: "A campanha que expõe",
    focus: "Dignidade, consentimento e responsabilidade coletiva",
    context:
      "Uma campanha quer divulgar uma foto identificável de uma família recebendo auxílio. A comissão acredita que imagens com sofrimento atraem doações.",
    mission: "Pondere a arrecadação sem usar pessoas como meio para uma meta.",
    evidence: [
      {
        id: "pedido",
        title: "Manifestação da família",
        text: "A família autorizou registrar a entrega para prestação de contas interna, mas não autorizou publicação em rede.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "campanha",
        title: "Teste fictício de peças",
        text: "Uma imagem identificável recebeu mais curtidas no teste interno. Não houve medição de doações reais nem de exposição futura.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "alternativa",
        title: "Proposta de prestação de contas",
        text: "É possível publicar totais, critérios de entrega e imagens de materiais sem identificar famílias, com revisão da comissão.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "alcance",
        kind: "choice",
        prompt: "A autorização interna permite concluir que a publicação aberta foi consentida?",
        options: [
          {
            id: "nao",
            label: "Não. Finalidade e circulação são diferentes.",
            feedback: "A manifestação autoriza um uso delimitado, não qualquer uso da imagem.",
          },
          {
            id: "sim",
            label: "Sim, autorizar uma foto permite todos os usos.",
            feedback: "A alternativa ignora o limite explicitado.",
          },
          {
            id: "likes",
            label: "Sim, curtidas mostram que a família será beneficiada.",
            feedback: "Curtidas não medem benefício nem substituem manifestação das pessoas.",
          },
        ],
        answer: "nao",
        hint: "Compare finalidade e público do registro com os da postagem.",
        explanation:
          "Consentimento e responsabilidade dependem do uso concreto, não apenas da existência da imagem.",
      },
      {
        id: "valores",
        kind: "choice",
        prompt: "Qual argumento reconhece o conflito ético?",
        options: [
          {
            id: "dignidade",
            label:
              "Arrecadação importa, mas exposição e vontade da família limitam os meios de campanha.",
            feedback: "O argumento considera resultado e respeito às pessoas.",
          },
          {
            id: "numero",
            label: "A meta de doações justifica qualquer exposição.",
            feedback: "Trata as pessoas como instrumento sem limite.",
          },
          {
            id: "proibir",
            label: "Toda prestação de contas necessariamente viola privacidade.",
            feedback: "Há formas de transparência sem identificação.",
          },
        ],
        answer: "dignidade",
        hint: "Separe objetivo legítimo de todos os meios possíveis para alcançá-lo.",
        explanation: "Uma avaliação ética exige examinar consequências e limites de conduta.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual peça deve seguir para publicação neste cenário?",
      options: [
        {
          id: "anonima",
          label:
            "Totais e critérios de entrega, materiais sem identificação e contato para dúvidas.",
          feedback: "A peça mantém transparência sem ultrapassar a autorização recebida.",
        },
        {
          id: "familia",
          label: "Foto identificável com frase emocional, pois a campanha é solidária.",
          feedback: "O propósito não remove o limite de uso da imagem.",
        },
        {
          id: "semconta",
          label: "Nenhuma prestação de contas, para não discutir o problema.",
          feedback: "A alternativa evita o dilema sem cumprir responsabilidade pública.",
        },
      ],
      answer: "anonima",
      hint: "Procure uma alternativa que realize transparência e respeite a manifestação da família.",
      explanation:
        "A solução do caso muda o meio da campanha, preservando prestação de contas e dignidade.",
    },
    conclusion:
      "A campanha mostrou resultados sem converter uma família em instrumento de divulgação.",
    reflection:
      "Que condições deveriam ser discutidas se a família desejasse participar de um depoimento público?",
    transfer:
      "Em projetos solidários, planeje a prestação de contas antes de coletar imagens e explique finalidade e circulação.",
  },
];
