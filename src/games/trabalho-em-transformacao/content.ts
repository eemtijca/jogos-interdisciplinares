import type { InvestigationCase, InvestigationModel } from "@/games/_shared/investigation-types";

const MODELO_TRABALHO: InvestigationModel = {
  title: "Compare receita e tempo total",
  expression: "Renda por tempo total = (receita − despesas)/(6 horas de tarefas + espera)",
  note: "Valores fictícios de adulta. Não determina direitos, vínculo ou qualidade de vida. Receita e despesas ficam fixas para isolar a espera, mas podem variar no mundo real.",
  parameters: [
    {
      id: "receita",
      label: "Receita diária",
      min: 60,
      max: 300,
      step: 15,
      initial: 180,
      unit: "R$",
    },
    {
      id: "despesas",
      label: "Despesas diárias",
      min: 0,
      max: 90,
      step: 5,
      initial: 45,
      unit: "R$",
    },
    {
      id: "espera",
      label: "Espera além das seis horas de tarefas",
      min: 0,
      max: 6,
      step: 1,
      initial: 3,
      unit: "h",
    },
  ],
  evaluate: ({ receita, despesas, espera }) => [
    {
      label: "Receita bruta por hora de tarefa",
      value: Number((receita / 6).toFixed(2)),
      unit: "R$/h",
    },
    {
      label: "Renda após despesas por hora total",
      value: Number(((receita - despesas) / (6 + espera)).toFixed(2)),
      unit: "R$/h",
    },
    { label: "Tempo total dedicado", value: 6 + espera, unit: "h" },
  ],
};

export const CASES: InvestigationCase[] = [
  {
    id: "fabrica-digital",
    title: "A produtividade subiu, e o trabalho?",
    focus: "Transformação tecnológica e distribuição",
    context:
      "Uma fábrica fictícia instalou máquinas digitais. A direção anuncia sucesso; trabalhadores pedem análise das consequências.",
    mission: "Compare produção, emprego e condições sem declarar a tecnologia causa única de tudo.",
    evidence: [
      {
        id: "periodos",
        title: "Indicadores locais",
        text: "Antes: 100 peças/dia e 20 postos. Depois: 150 peças/dia e 16 postos. O período também teve mudança na demanda e no turno.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "formacao",
        title: "Registros da transição",
        text: "Oito pessoas receberam formação no expediente; outras não puderam participar por incompatibilidade de horário. Não há dados de destino das quatro pessoas que saíram.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "relatos",
        title: "Escuta dos grupos",
        text: "Operadores relatam menos esforço físico e maior vigilância das metas. Manutenção recebeu novas tarefas; o dossiê não informa a remuneração.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "inferir",
        kind: "multi",
        prompt: "Quais duas conclusões respeitam os indicadores?",
        options: [
          {
            id: "mudanca",
            label: "A produção aumentou e os postos registrados diminuíram.",
            feedback: "Descreve os dois períodos sem atribuir causa única.",
          },
          {
            id: "causa",
            label: "As máquinas foram comprovadamente a única causa das quatro saídas.",
            feedback: "Mudanças simultâneas e falta de dados não sustentam essa causa única.",
          },
          {
            id: "grupos",
            label: "Os grupos tiveram oportunidades e experiências distintas.",
            feedback: "Formação e relatos indicam distribuição desigual dos efeitos.",
          },
          {
            id: "ganho",
            label: "A maior produção prova melhora nas condições de todos.",
            feedback: "Produção não mede renda, proteção ou voz.",
          },
        ],
        answer: ["mudanca", "grupos"],
        hint: "Separe descrição, explicação causal e avaliação social.",
        explanation:
          "Transformações técnicas precisam ser analisadas junto com organização, contexto e grupos atingidos.",
      },
      {
        id: "proposta",
        kind: "choice",
        prompt: "Qual proposta enfrenta a barreira de formação registrada?",
        options: [
          {
            id: "acesso",
            label:
              "Reorganizar horários, ouvir grupos e acompanhar o destino dos postos alterados.",
            feedback: "Responde à barreira concreta e procura a informação ausente.",
          },
          {
            id: "media",
            label: "Divulgar peças por trabalhador e encerrar a discussão.",
            feedback: "Produtividade não mede acesso à formação ou proteção.",
          },
          {
            id: "igual",
            label: "Repetir a aula no mesmo horário incompatível.",
            feedback: "A mesma oferta mantém o obstáculo identificado.",
          },
        ],
        answer: "acesso",
        hint: "Uma proposta deve responder ao mecanismo de exclusão.",
        explanation: "A tecnologia não determina sozinha quem terá acesso aos benefícios.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Que síntese deve ir à negociação?",
      options: [
        {
          id: "negociar",
          label:
            "Reconhecer aumento produtivo e negociar formação, novas tarefas, remuneração e proteção.",
          feedback: "Integra ganhos e questões ainda não resolvidas.",
        },
        {
          id: "sucesso",
          label: "Declarar sucesso social total porque há 50 peças a mais.",
          feedback: "O ganho produtivo não responde às condições de trabalho.",
        },
        {
          id: "rejeitar",
          label: "Afirmar que toda inovação piora toda experiência.",
          feedback: "Os relatos registram efeitos diferentes, sem regra universal.",
        },
      ],
      answer: "negociar",
      hint: "Relacione indicadores e experiências dos grupos.",
      explanation: "A resposta transforma uma mudança técnica em objeto de diálogo social.",
    },
    conclusion:
      "A investigação separou produtividade de condições e distribuição de oportunidades.",
    reflection:
      "Que dado permitiria avaliar se o aumento produtivo se converteu em ganho de renda?",
    transfer:
      "Em notícias de automação, compare produção, postos, renda, formação e quem foi ouvido.",
  },
  {
    id: "plataforma-e-tempo",
    title: "O pagamento que não conta a espera",
    focus: "Renda líquida, indicador e organização do trabalho",
    context:
      "Uma trabalhadora adulta avalia uma plataforma fictícia. A propaganda anuncia apenas receita por hora de tarefa.",
    mission: "Calcule pelo tempo total e identifique o que o indicador deixa de fora.",
    evidence: [
      {
        id: "dia",
        title: "Registro de um dia",
        text: "Receita: R$ 180; despesas: R$ 45; 6 h de tarefas e 3 h de espera ligada ao serviço. Proteção social não é descrita.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "propaganda",
        title: "Indicador anunciado",
        text: "A plataforma divide R$ 180 por 6 h e anuncia R$ 30/h, sem descontar despesas nem incluir espera.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "regras",
        title: "Escuta da trabalhadora",
        text: "A espera é imprevisível. Ela propõe transparência de regras e revisão de decisões automáticas que afetam acesso a tarefas.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "indicador",
        kind: "choice",
        prompt: "Com os valores iniciais, que comparação é correta?",
        options: [
          {
            id: "comparar",
            label:
              "Receita bruta por tarefa: R$ 30/h; renda após despesas por tempo total: R$ 15/h.",
            feedback:
              "R$ 135 divididos por 9 h são R$ 15/h. As razões têm denominadores distintos.",
          },
          {
            id: "ignorar",
            label: "Ambas são R$ 30/h porque a espera não conta como tempo.",
            feedback: "O tempo dedicado não deixa de existir por não ter tarefa concluída.",
          },
          {
            id: "juridico",
            label: "R$ 15/h define automaticamente salário e vínculo jurídico.",
            feedback: "O cálculo não determina classificação jurídica.",
          },
        ],
        answer: "comparar",
        hint: "Confira numerador, despesas e horas incluídas.",
        explanation:
          "Indicadores podem conter contas corretas e representar recortes diferentes da experiência.",
      },
      {
        id: "dimensoes",
        kind: "multi",
        prompt: "Que duas dimensões faltam para avaliar trabalho decente?",
        options: [
          {
            id: "protecao",
            label: "Condições de proteção e segurança social.",
            feedback: "Renda não esgota as condições do trabalho.",
          },
          {
            id: "dialogo",
            label: "Possibilidade de contestar regras e participar de decisões.",
            feedback: "Voz e diálogo afetam a relação de poder.",
          },
          {
            id: "curtidas",
            label: "Número de curtidas da propaganda.",
            feedback: "Não mede condição laboral.",
          },
          {
            id: "certeza",
            label: "Garantia de que mais tarefas sempre melhoram a vida.",
            feedback: "Receita adicional pode ter custos diferentes.",
          },
        ],
        answer: ["protecao", "dialogo"],
        hint: "Considere direitos, proteção, qualidade e diálogo.",
        explanation: "Trabalho decente é uma perspectiva multidimensional.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual apresentação orienta a negociação?",
      options: [
        {
          id: "ambos",
          label:
            "Mostrar as duas razões, explicar espera e despesas e pedir dados sobre proteção e contestação.",
          feedback: "Conserva a informação econômica e amplia a avaliação.",
        },
        {
          id: "bruto",
          label: "Usar somente R$ 30/h, pois a divisão está correta.",
          feedback: "O recorte não descreve renda líquida por tempo total.",
        },
        {
          id: "excluir",
          label: "Excluir qualquer indicador monetário porque não mede tudo.",
          feedback: "Um indicador limitado continua útil se o alcance ficar claro.",
        },
      ],
      answer: "ambos",
      hint: "Explique a conta e as dimensões que ela não calcula.",
      explanation: "A negociação precisa conectar cálculo a condições e poder de decisão.",
    },
    conclusion:
      "O modelo tornou visível a diferença entre receita por tarefa e renda por tempo dedicado.",
    reflection: "Que efeito uma espera maior tem quando receita e despesas ficam fixas?",
    transfer:
      "Em uma oferta de renda, identifique custos, horas invisíveis, proteção e quem define as regras.",
    model: MODELO_TRABALHO,
  },
  {
    id: "cuidado-invisivel",
    title: "O trabalho fora da folha",
    focus: "Cuidado, gênero e participação",
    context:
      "Um bairro fictício oferece um curso gratuito à noite. Parte das pessoas não participa por cuidar de familiares.",
    mission:
      "Analise a barreira sem confundir ausência de emprego remunerado com ausência de trabalho.",
    evidence: [
      {
        id: "consulta",
        title: "Consulta local voluntária",
        text: "Em vinte respostas, dez mulheres relatam 20 h semanais de cuidado; dez homens, 10 h. A consulta não representa todo o bairro.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "matriculas",
        title: "Registro de participação",
        text: "Oito desistências citam cuidado sem alternativa. O registro não mede outros motivos nem quem nunca se matriculou.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "opcoes",
        title: "Planilha fictícia",
        text: "Verba: R$ 12 mil. Dois horários com equipe: R$ 8 mil. Apoio de cuidado durante o curso: R$ 4 mil. Publicidade extra: R$ 6 mil.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "leitura",
        kind: "choice",
        prompt: "Que análise evita naturalizar a diferença?",
        options: [
          {
            id: "social",
            label:
              "A consulta sugere divisão desigual nesse grupo; responsabilidades e alternativas exigem investigação.",
            feedback: "A diferença é uma condição social investigável com alcance delimitado.",
          },
          {
            id: "natureza",
            label: "As mulheres têm uma capacidade natural que explica a diferença.",
            feedback:
              "Os dados não testaram essa explicação e ela naturaliza uma organização social.",
          },
          {
            id: "inativo",
            label: "Quem cuida sem remuneração não realiza trabalho.",
            feedback: "Cuidado é uma forma de trabalho, embora não seja emprego remunerado.",
          },
        ],
        answer: "social",
        hint: "Diferencie atividade, grupo consultado e explicação testada.",
        explanation:
          "Tempo de cuidado pode limitar formação e emprego sem ser uma característica biológica inevitável.",
      },
      {
        id: "pacote",
        kind: "multi",
        prompt: "Quais duas ações formam um pacote de R$ 12 mil que enfrenta a barreira?",
        options: [
          {
            id: "horarios",
            label: "Dois horários com equipe, R$ 8 mil.",
            feedback: "Ampliam possibilidades de participação.",
          },
          {
            id: "cuidado",
            label: "Apoio de cuidado no curso, R$ 4 mil.",
            feedback: "Atua sobre a falta de alternativa.",
          },
          {
            id: "publicidade",
            label: "Publicidade extra, R$ 6 mil, além das duas ações.",
            feedback: "Eleva o custo a R$ 18 mil sem enfrentar diretamente a barreira.",
          },
          {
            id: "gratuito",
            label: "Afirmar que gratuidade elimina toda desigualdade.",
            feedback: "Matrícula sem custo não resolve todas as condições de acesso.",
          },
        ],
        answer: ["horarios", "cuidado"],
        hint: "Relacione custo e ação ao obstáculo demonstrado.",
        explanation:
          "Uma política pode combinar remoção de barreiras e distribuição de responsabilidades.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "O conselho prioriza quem citou cuidado. Qual encaminhamento atende ao critério?",
      options: [
        {
          id: "acesso",
          label: "Horários e apoio de cuidado, com escuta e avaliação da participação.",
          feedback: "Cabe na verba e verifica se a barreira diminuiu.",
        },
        {
          id: "anunciar",
          label: "Só publicidade, pois cada pessoa deve organizar o próprio tempo.",
          feedback: "Transfere uma barreira coletiva para a pessoa.",
        },
        {
          id: "fixar",
          label: "Reservar o cuidado às mulheres para facilitar a organização.",
          feedback: "Reproduz a divisão desigual sem discussão.",
        },
      ],
      answer: "acesso",
      hint: "Avalie quem terá suas responsabilidades modificadas.",
      explanation: "A resposta atende ao objetivo e mantém revisão das condições.",
    },
    conclusion: "A comissão tratou cuidado como trabalho e participação como problema coletivo.",
    reflection: "Como ouvir quem nem chegou a se matricular?",
    transfer:
      "Ao avaliar acesso à formação, investigue custo, transporte, horário, cuidado e divisão de responsabilidades.",
  },
];
