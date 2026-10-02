import type { InvestigationCase } from "../_shared/investigation-types";
import {
  choiceTask,
  evidence,
  multiTask,
  numberTask,
  parameter,
  round,
} from "../_shared/math-science-authoring";

export const CASES: InvestigationCase[] = [
  {
    id: "celular-nao-carrega",
    title: "Onde o caminho se interrompe",
    focus: "Circuito fechado, tensão e corrente",
    context:
      "O clube examina uma bancada virtual de baixa tensão com um resistor representando uma carga. Você precisa diagnosticar ausência de corrente usando medidas, sem tratar o circuito simples como um celular real.",
    mission: "Comparar chave aberta e fechada sob tensão conhecida.",
    evidence: [
      evidence(
        "fonte",
        "Fonte e carga",
        "Fonte ideal de 9 V e resistor de 20 Ω. Fios ideais; resistência constante. A bancada é inteiramente virtual.",
      ),
      evidence(
        "medida",
        "Registro inicial",
        "Chave aberta: corrente de 0 A. Há 9 V nos terminais da fonte. Ao fechar a chave, a corrente medida é 0,45 A.",
      ),
      evidence(
        "limite",
        "Limite da analogia",
        "Carregadores e celulares reais têm eletrônica, proteção e negociação de potência. O resistor não reproduz esses sistemas; não se conclui um defeito real apenas por esta bancada.",
      ),
    ],
    model: {
      title: "Teste a hipótese de caminho aberto",
      expression: "Fechado: I = U/R e P = UI; aberto: I = 0",
      note: "Simulação de resistor ôhmico, fonte ideal e chave. 0 significa aberta; 1 significa fechada. Não realizar testes em tomadas ou carregadores. Tarefas usam 9 V e 20 Ω.",
      parameters: [
        parameter("chave", "Chave (0 aberta, 1 fechada)", 0, 1, 1, 0, ""),
        parameter("tensao", "Tensão", 3, 12, 1, 9, "V"),
      ],
      evaluate: ({ chave, tensao }) => [
        { label: "Corrente", value: round((chave * tensao) / 20, 3), unit: "A" },
        { label: "Potência na carga", value: round((chave * tensao ** 2) / 20), unit: "W" },
        { label: "Caminho", value: chave ? "Fechado" : "Aberto", unit: "" },
      ],
    },
    tasks: [
      numberTask(
        "corrente",
        "Com chave fechada, 9 V e 20 Ω, qual corrente?",
        0.45,
        "A",
        "Divida tensão por resistência.",
        "I = 9/20 = 0,45 A. Na chave aberta, não há caminho contínuo para corrente permanente.",
      ),
      choiceTask(
        "tensao",
        "A medida de 9 V na fonte aberta implica corrente na carga?",
        [
          [
            "nao",
            "Não, a diferença de potencial pode existir sem caminho fechado.",
            "Tensão e corrente são grandezas diferentes.",
          ],
          [
            "sim",
            "Sim, tensão e corrente são a mesma grandeza.",
            "Tensão mede energia por carga; corrente mede carga por tempo.",
          ],
          [
            "fonte",
            "A fonte fica sem tensão sempre que a chave abre.",
            "O registro mostra 9 V mesmo com chave aberta.",
          ],
        ],
        "nao",
        "Compare as duas medidas iniciais.",
        "Ter tensão não garante corrente; é necessário um caminho e uma carga conectada.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual diagnóstico cabe aos dados desta bancada?",
      [
        [
          "aberto",
          "A chave aberta interrompia o caminho; fechá-la explica a corrente prevista e medida.",
          "A intervenção controlada confirma a hipótese local.",
        ],
        [
          "curto",
          "Havia curto, porque qualquer corrente zero é um curto.",
          "Curto costuma reduzir a resistência do caminho; aqui a abertura interrompe o caminho.",
        ],
        [
          "celular",
          "Todo celular que não carrega tem necessariamente fio rompido.",
          "A analogia não modela eletrônica ou outros defeitos.",
        ],
      ],
      "aberto",
      "Delimite a conclusão à bancada investigada.",
      "As medidas antes e depois de fechar a chave sustentam circuito aberto neste modelo; não diagnosticam aparelhos reais.",
    ),
    conclusion: "A corrente depende do caminho e da carga, além da tensão da fonte.",
    reflection:
      "Que medição adicional seria necessária se a chave estivesse fechada e a corrente continuasse zero?",
    transfer:
      "Em diagramas virtuais, identifique caminhos e grandezas; em equipamento real, encaminhe a avaliação a pessoa qualificada.",
  },
  {
    id: "quarto-duas-lampadas",
    title: "Um ramo pode falhar sozinho",
    focus: "Série, paralelo e conservação de corrente",
    context:
      "Duas cargas idênticas representam iluminação em uma bancada ideal. Você compara corrente e comportamento quando uma delas se abre.",
    mission: "Confrontar independência dos ramos com demanda total da fonte.",
    evidence: [
      evidence(
        "cargas",
        "Bancada de referência",
        "Fonte ideal de 12 V; duas cargas ôhmicas de 10 Ω cada. A falha simulada abre uma carga, sem curto.",
      ),
      evidence(
        "serie",
        "Associação em série",
        "Um único caminho. Resistência equivalente de 20 Ω; corrente de 0,6 A nas duas cargas. Uma abertura interrompe o circuito inteiro.",
      ),
      evidence(
        "paralelo",
        "Associação em paralelo",
        "Cada ramo recebe 12 V. Corrente por ramo de 1,2 A. Com os dois íntegros, corrente total de 2,4 A. Uma abertura deixa outro ramo ligado.",
      ),
    ],
    model: {
      title: "Teste custo da independência dos ramos",
      expression: "Série: R_eq = 2R; paralelo: R_eq = R/2; I_total = U/R_eq",
      note: "Cargas resistivas idênticas com fonte ideal; brilho real depende de dispositivo e temperatura. Controle 0 indica série; 1 indica paralelo. Tarefas usam as duas cargas íntegras de 10 Ω.",
      parameters: [
        parameter("paralelo", "Associação (0 série, 1 paralelo)", 0, 1, 1, 0, ""),
        parameter("resistencia", "Resistência de cada carga", 5, 20, 1, 10, "Ω"),
      ],
      evaluate: ({ paralelo, resistencia }) => [
        {
          label: "Resistência equivalente",
          value: round(paralelo ? resistencia / 2 : 2 * resistencia),
          unit: "Ω",
        },
        {
          label: "Corrente total",
          value: round(paralelo ? 24 / resistencia : 6 / resistencia, 3),
          unit: "A",
        },
        {
          label: "Potência total",
          value: round(paralelo ? 288 / resistencia : 72 / resistencia),
          unit: "W",
        },
      ],
    },
    tasks: [
      numberTask(
        "total",
        "Qual corrente total com as duas cargas de 10 Ω em paralelo?",
        2.4,
        "A",
        "Some as correntes de dois ramos de 1,2 A.",
        "I_total = 1,2 + 1,2 = 2,4 A; R_eq = 5 Ω. Corrente se conserva nos nós, não é consumida pelas cargas.",
      ),
      multiTask(
        "falha",
        "Quais duas previsões valem para uma carga que se abre?",
        [
          ["serie", "Em série, as duas ficam sem corrente", "Há somente um caminho."],
          [
            "paralelo",
            "Em paralelo, o outro ramo permanece com corrente",
            "O caminho do outro ramo continua fechado.",
          ],
          [
            "mesma",
            "A corrente total permanece 2,4 A com um ramo aberto",
            "Com apenas um ramo, a fonte fornece 1,2 A neste modelo.",
          ],
        ],
        ["serie", "paralelo"],
        "Trace os caminhos antes e depois da abertura.",
        "No paralelo, a fonte passa a alimentar apenas a carga íntegra. A corrente total diminui.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual parecer inclui benefício e limite do paralelo?",
      [
        [
          "correta",
          "Isola a abertura de um ramo, mas exige 2,4 A com ambos íntegros; a fonte real precisa suportar a demanda.",
          "A conclusão considera caminhos e capacidade.",
        ],
        [
          "consumo",
          "Cada carga consome a corrente, por isso sobra menos para a segunda.",
          "A carga transforma energia; corrente não é consumida em sequência.",
        ],
        [
          "universal",
          "Paralelo garante segurança com qualquer fonte e fio.",
          "Capacidade, proteção e aquecimento dependem do projeto real.",
        ],
      ],
      "correta",
      "Compare a corrente total entre as associações.",
      "Independência dos ramos não significa ausência de limites elétricos. Este cálculo usa fonte ideal e resistores constantes.",
    ),
    conclusion:
      "Em paralelo há ramos independentes e maior corrente total que em série para estas cargas.",
    reflection: "Por que a corrente total cai quando um ramo se abre?",
    transfer:
      "Ao analisar um diagrama, confira caminhos, corrente da fonte e potência antes de generalizar para uma instalação real.",
  },
  {
    id: "curto-perigoso",
    title: "A fonte também tem resistência",
    focus: "Curto, resistência interna e potência",
    context:
      "Uma simulação anterior tratava a fonte como ilimitada. Você acrescenta resistência interna e avalia por que um caminho de baixa resistência aumenta aquecimento.",
    mission: "Comparar modelos e reconhecer limites de segurança.",
    evidence: [
      evidence(
        "fonte",
        "Fonte não ideal didática",
        "Força eletromotriz de 9 V e resistência interna de 2 Ω, constantes neste modelo. Caminho externo inicialmente de 1 Ω.",
      ),
      evidence(
        "equacao",
        "Modelo em série",
        "I = 9/(R_externa + 2). P_externa = I²R_externa; P_interna = I² × 2. Não representa a atuação de proteções reais.",
      ),
      evidence(
        "seguranca",
        "Condição de investigação",
        "Tudo ocorre virtualmente. Não ligar fio diretamente aos polos de uma bateria, fonte ou tomada. Um curto real pode causar aquecimento e danos; desligar e procurar pessoa qualificada.",
      ),
    ],
    model: {
      title: "Teste: a corrente pode crescer sem limite?",
      expression: "I = E/(R + r); P_externa = I²R; P_interna = I²r",
      note: "E = 9 V e r = 2 Ω fixos. Proteções, química da bateria e temperatura não são modeladas. Reduza R e observe também a potência interna; tarefas usam R = 1 Ω.",
      parameters: [parameter("resistencia", "Resistência externa", 0.5, 20, 0.5, 1, "Ω")],
      evaluate: ({ resistencia }) => {
        const corrente = 9 / (resistencia + 2);
        return [
          { label: "Corrente", value: round(corrente, 3), unit: "A" },
          { label: "Potência externa", value: round(corrente ** 2 * resistencia), unit: "W" },
          { label: "Potência interna", value: round(corrente ** 2 * 2), unit: "W" },
        ];
      },
    },
    tasks: [
      numberTask(
        "corrente",
        "Qual corrente com resistência externa de 1 Ω e interna de 2 Ω?",
        3,
        "A",
        "Some as resistências antes de dividir 9 V.",
        "I = 9/(1 + 2) = 3 A. O modelo ideal com resistência externa de 1 Ω daria 9 A, revelando a diferença entre hipóteses.",
      ),
      numberTask(
        "potencia",
        "Qual potência dissipada na resistência interna nesse cenário?",
        18,
        "W",
        "Use I²r com I = 3 A e r = 2 Ω.",
        "P_interna = 3² × 2 = 18 W. A externa dissipa 9 W; potência total fornecida no modelo é EI = 27 W.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual conclusão respeita modelo e segurança?",
      [
        [
          "limites",
          "Baixa resistência eleva corrente e aquecimento interno; o modelo ajuda a explicar, mas não autoriza testar curtos reais.",
          "A interpretação inclui resistência interna e limites.",
        ],
        [
          "infinita",
          "A corrente real necessariamente fica infinita quando a resistência externa vai a zero.",
          "Neste modelo r = 2 Ω limita I a 4,5 A; aparelhos reais também têm outros limites.",
        ],
        [
          "fria",
          "Só a resistência externa pode aquecer.",
          "A resistência interna dissipa I²r, que aqui dá 18 W.",
        ],
      ],
      "limites",
      "Considere a fonte como parte do circuito.",
      "A simulação torna visível a dissipação dentro da fonte. Sua simplificação não prevê temperatura ou atuação de fusíveis.",
    ),
    conclusion:
      "Curto exige considerar toda a resistência e os limites da fonte, sem experimentação física improvisada.",
    reflection: "Por que reduzir a resistência externa pode aquecer mais a fonte?",
    transfer:
      "Compare previsões de fontes ideais e não ideais em simuladores; deixe inspeções reais para profissionais.",
  },
];
