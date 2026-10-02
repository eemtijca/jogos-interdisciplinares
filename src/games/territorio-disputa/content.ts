import type { InvestigationCase, InvestigationModel } from "@/games/_shared/investigation-types";

const MODELO_DRENAGEM: InvestigationModel = {
  title: "Compare chuva, permeabilidade e capacidade",
  expression: "Excedente = máximo(0, chuva × (1 − permeável/100) − capacidade)",
  note: "Modelo didático uniforme em mm. A permeabilidade é uma aproximação; não inclui bacia, relevo, duração, saturação nem rede real. Excedente não é altura prevista de inundação e zero não significa ausência de risco.",
  parameters: [
    {
      id: "chuva",
      label: "Chuva acumulada hipotética",
      min: 20,
      max: 100,
      step: 10,
      initial: 60,
      unit: "mm",
    },
    {
      id: "permeavel",
      label: "Parcela permeável idealizada",
      min: 0,
      max: 80,
      step: 10,
      initial: 30,
      unit: "%",
    },
    {
      id: "capacidade",
      label: "Capacidade acumulada de escoamento",
      min: 0,
      max: 50,
      step: 5,
      initial: 20,
      unit: "mm",
    },
  ],
  evaluate: ({ chuva, permeavel, capacidade }) => [
    {
      label: "Escoamento idealizado",
      value: Number((chuva * (1 - permeavel / 100)).toFixed(1)),
      unit: "mm",
    },
    {
      label: "Lâmina excedente no modelo",
      value: Number(Math.max(0, chuva * (1 - permeavel / 100) - capacidade).toFixed(1)),
      unit: "mm",
    },
  ],
};
/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "mapa-bairro",
    title: "Relevo não decide sozinho",
    focus: "Alocação espacial com risco e acesso",
    context:
      "Mapa textual fictício: A, baixada junto ao rio; B, avenida com ônibus; C, vila residencial; D, parte alta por estrada de terra; E, nascente; F, corredor escolar. O conselho precisa localizar praça drenante, galpão e campo.",
    mission: "Compare usos e acesso; trate o mapa como uma representação simplificada.",
    evidence: [
      {
        id: "relevo",
        title: "Camada de suscetibilidade",
        text: "A e E concentram água. B e F têm drenagem, mas podem alagar se sua capacidade for excedida. D fica alto e tem acesso difícil.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "usos",
        title: "Necessidades dos projetos",
        text: "Galpão precisa de acesso de caminhões e área menos exposta; campo precisa de acesso de moradores; praça drenante precisa de estudo de solo e manutenção.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "comunidade",
        title: "Escuta dos moradores",
        text: "A vila prefere campo em C e pede preservar a nascente E. Comerciantes indicam B para o galpão; a comissão aceita estudar uma praça em A.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "alocar",
        kind: "multi",
        prompt: "Escolha as duas alocações compatíveis com o dossiê.",
        options: [
          {
            id: "galpao",
            label: "Galpão em B, com verificação de drenagem e acesso.",
            feedback: "É uma hipótese adequada de localização, ainda dependente de avaliação.",
          },
          {
            id: "nascente",
            label: "Galpão em E porque terrenos úmidos são baratos.",
            feedback: "Ignora suscetibilidade e função da nascente.",
          },
          {
            id: "campo",
            label: "Campo em C com consulta sobre ruído e horários.",
            feedback: "Atende acesso coletivo e registra conflito de vizinhança.",
          },
          {
            id: "alto",
            label: "Todo equipamento em D, pois alto significa sem risco e acesso garantido.",
            feedback: "Altitude não garante ausência de risco nem acesso.",
          },
        ],
        answer: ["galpao", "campo"],
        hint: "Localização precisa combinar características físicas, função e usuários.",
        explanation:
          "Escolher um lugar envolve conexão e distribuição, não só a posição no relevo.",
      },
      {
        id: "chuva",
        kind: "choice",
        prompt: "Ao aumentar chuva ou reduzir permeabilidade no modelo, o que muda?",
        options: [
          {
            id: "excedente",
            label: "A lâmina excedente tende a crescer, mantida a mesma capacidade de drenagem.",
            feedback: "É o comportamento do modelo simplificado de comparação.",
          },
          {
            id: "zero",
            label: "Drenagem nova impede alagamento sob qualquer chuva.",
            feedback: "Toda capacidade no modelo é finita.",
          },
          {
            id: "certeza",
            label: "O valor obtido prevê a altura real da água em cada lote.",
            feedback: "O modelo não inclui topografia, bacia, tempo de chuva nem redes reais.",
          },
        ],
        answer: "excedente",
        hint: "Altere uma variável por vez e observe o excedente.",
        explanation:
          "O resultado compara cenários, não emite previsão nem substitui avaliação técnica.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual plano merece avançar para estudo?",
      options: [
        {
          id: "estudo",
          label:
            "Estudar praça em A, galpão em B e campo em C, preservar E e avaliar drenagem, acesso e moradores.",
          feedback: "A decisão combina camadas e mantém verificação técnica e participação.",
        },
        {
          id: "automatico",
          label: "Autorizar a praça em A e afirmar que ela eliminará toda inundação.",
          feedback: "A eficácia não foi calculada nem pode ser universal.",
        },
        {
          id: "expulsao",
          label: "Retirar moradores da vila para usar toda a área sem consulta.",
          feedback: "Ignora direitos, vínculos e custos sociais.",
        },
      ],
      answer: "estudo",
      hint: "Uma proposta escolar de mapa não equivale a autorização urbanística.",
      explanation:
        "O melhor plano deste cenário é uma hipótese fundamentada para estudo, com limites e pessoas afetadas.",
    },
    conclusion: "A alocação considerou risco, função, acesso e vínculos comunitários.",
    reflection: "Qual nova camada poderia mudar a indicação de B para o galpão?",
    transfer:
      "Ao analisar um mapa urbano, sobreponha usos, circulação, serviços, suscetibilidade e experiência dos moradores.",
    model: MODELO_DRENAGEM,
  },
  {
    id: "rota-acesso",
    title: "Uma rota que não atende a todos",
    focus: "Distância, conexão e acessibilidade",
    context:
      "O mapa do bairro mostra a escola ligada ao centro por F e à vila por C. Duas obras concorrem por R$ 100 mil fictícios.",
    mission: "Escolha uma rota usando cobertura e barreiras, além de distância.",
    evidence: [
      {
        id: "rotas",
        title: "Mapa textual de trajetos",
        text: "Rota F: 800 m, escadas e travessia sem sinalização. Rota C: 1.100 m, sem escadas, mas 300 m de calçada interrompida.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "custos",
        title: "Planilha de propostas",
        text: "Intervir em F custa R$ 100 mil e mantém as escadas. Completar C e sinalizar sua travessia custa R$ 90 mil.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "usuarios",
        title: "Escuta sobre deslocamento",
        text: "A rota C conecta vila e posto de saúde; atende pessoas que não podem usar escadas. F encurta o caminho de outros estudantes.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "criterio",
        kind: "choice",
        prompt: "Por que a menor distância não resolve a escolha?",
        options: [
          {
            id: "acesso",
            label: "Escadas podem excluir usuários; conexão com outros serviços também importa.",
            feedback: "Distância é um indicador, não a experiência completa do percurso.",
          },
          {
            id: "metros",
            label: "Toda pessoa se beneficia igualmente de 300 m a menos.",
            feedback: "A afirmação ignora barreiras diferentes.",
          },
          {
            id: "preco",
            label: "O maior custo sempre corresponde à melhor obra.",
            feedback: "Custo não mede automaticamente acesso ou prioridade.",
          },
        ],
        answer: "acesso",
        hint: "Analise quem consegue realizar o percurso.",
        explanation:
          "Uma política de mobilidade pode priorizar remover uma barreira mesmo com trajeto maior.",
      },
      {
        id: "condicoes",
        kind: "multi",
        prompt: "Que duas condições precisam acompanhar a proposta de C?",
        options: [
          {
            id: "continua",
            label: "Calçada contínua e travessia verificadas com usuários.",
            feedback: "A continuidade precisa ser funcional na experiência real.",
          },
          {
            id: "visita",
            label:
              "Avaliação presencial, pois mapa textual não descreve inclinação e todos os obstáculos.",
            feedback: "Escala e simplificação limitam a informação disponível.",
          },
          {
            id: "sobras",
            label: "Ignorar manutenção porque sobraram R$ 10 mil.",
            feedback: "A sobra não elimina a necessidade de planejamento futuro.",
          },
          {
            id: "todos",
            label: "Declarar que F deixou de ser relevante para qualquer estudante.",
            feedback: "A rota curta ainda serve pessoas e pode ter melhorias futuras.",
          },
        ],
        answer: ["continua", "visita"],
        hint: "Compare funcionamento e informação ainda ausente.",
        explanation: "A escolha de prioridade não apaga necessidades da alternativa preterida.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt:
        "O conselho prioriza acesso de quem hoje não usa escadas. Qual plano responde ao critério?",
      options: [
        {
          id: "c",
          label:
            "Priorizar C por R$ 90 mil, verificar continuidade com usuários e registrar melhorias pendentes em F.",
          feedback: "O plano atende ao critério e explicita o custo de oportunidade.",
        },
        {
          id: "f",
          label: "Priorizar F apenas por ser 300 m menor.",
          feedback: "A intervenção mantém a barreira relevante ao critério.",
        },
        {
          id: "adiar",
          label: "Esperar até poder realizar toda obra simultaneamente.",
          feedback: "Adiamento preserva uma barreira que o orçamento já permite enfrentar.",
        },
      ],
      answer: "c",
      hint: "Use o critério público e explique quem ainda precisará de outra etapa.",
      explanation:
        "Neste cenário, prioridade significa remover uma exclusão identificada, sem prometer atendimento completo.",
    },
    conclusion: "A comissão escolheu acesso e conexão como prioridades explícitas.",
    reflection: "Que dados de inclinação ou fluxo poderiam exigir revisar a proposta?",
    transfer:
      "Em um trajeto real, compare distância com continuidade, obstáculos, segurança da travessia e destinos.",
  },
  {
    id: "orçamento-territorial",
    title: "Uma cidade, dois objetivos",
    focus: "Custo de oportunidade e escala",
    context:
      "O orçamento participativo fictício dispõe de R$ 120 mil. O conselho prioriza reduzir exposição à água na baixada e melhorar o acesso ao posto.",
    mission: "Monte um pacote viável e defina como avaliar resultados.",
    evidence: [
      {
        id: "pacotes",
        title: "Opções de intervenção",
        text: "Praça permeável em A: R$ 70 mil; ligação acessível C ao posto: R$ 50 mil; reforma estética em B: R$ 80 mil; campanha de informação: R$ 10 mil.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "efeitos",
        title: "Estudo preliminar",
        text: "Praça pode reduzir escoamento local, mas não resolve toda a bacia. Ligação remove trecho com barreira; a estética não altera drenagem.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "equidade",
        title: "Distribuição no mapa",
        text: "A e C reúnem população com menos acesso a serviços. B já recebeu dois investimentos recentes. O estudo não mede todos os benefícios de cada intervenção.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "pacote",
        kind: "choice",
        prompt: "Qual pacote atende aos dois objetivos com R$ 120 mil?",
        options: [
          {
            id: "ac",
            label: "Praça em A + ligação em C.",
            feedback: "R$ 70 mil + R$ 50 mil atendem as duas prioridades do cenário.",
          },
          {
            id: "ab",
            label: "Praça em A + reforma em B.",
            feedback: "Custa R$ 150 mil e não atende o acesso ao posto.",
          },
          {
            id: "bc",
            label: "Reforma em B + ligação em C.",
            feedback: "Custa R$ 130 mil e a reforma não atua na exposição à água.",
          },
        ],
        answer: "ac",
        hint: "Compare soma dos custos e efeitos esperados.",
        explanation:
          "O orçamento viável deve ser compatível com objetivos, não apenas somar ações populares.",
      },
      {
        id: "monitoramento",
        kind: "order",
        prompt: "Organize uma avaliação do pacote.",
        options: [
          {
            id: "base",
            label: "Registrar pontos de acúmulo de água e barreiras antes das obras.",
            feedback: "Uma linha de base permite comparação.",
          },
          {
            id: "execucao",
            label: "Verificar execução e uso com equipes e moradores.",
            feedback: "Uma obra no papel não significa funcionamento.",
          },
          {
            id: "resultado",
            label: "Comparar após chuvas e trajetos, distinguindo influência de outros fatores.",
            feedback: "O contexto pode mudar junto com a intervenção.",
          },
        ],
        answer: ["base", "execucao", "resultado"],
        hint: "Defina o ponto de comparação antes de procurar melhora.",
        explanation:
          "Avaliação considera implementação e efeitos, sem atribuir toda mudança a uma única obra.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual justificativa deve acompanhar A + C?",
      options: [
        {
          id: "justificar",
          label:
            "O pacote atende duas barreiras com a verba disponível; a reforma em B fica para análise futura e os efeitos serão monitorados.",
          feedback: "A decisão explicita prioridade, limite e custo de oportunidade.",
        },
        {
          id: "garantia",
          label: "O pacote eliminará qualquer enchente e desigualdade.",
          feedback: "As obras são locais e não resolvem todas as dimensões do problema.",
        },
        {
          id: "culpa",
          label: "A comissão escolheu A porque moradores causam sua própria vulnerabilidade.",
          feedback:
            "Vulnerabilidade tem condições sociais e territoriais que não podem ser reduzidas a culpa individual.",
        },
      ],
      answer: "justificar",
      hint: "Informe benefício previsto, limite e ação que ficou fora.",
      explanation:
        "A prioridade é justificada por objetivos e distribuição de necessidades, não por garantia total de resultado.",
    },
    conclusion: "O plano viável atendeu duas prioridades e tornou visível a alternativa adiada.",
    reflection:
      "Se o custo da praça aumentar, qual objetivo ou etapa precisará ser renegociado publicamente?",
    transfer:
      "Ao avaliar uma política local, registre orçamento, escala, beneficiários, manutenção e o que não foi atendido.",
  },
];
