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
    id: "reposicao",
    title: "Duas retiradas e uma condição",
    focus: "Probabilidade sucessiva e reposição",
    context:
      "Uma urna tem 3 azuis e 2 amarelas. Dois modos premiam a retirada de duas azuis. Você precisa verificar se as chances são iguais.",
    mission: "Calcular a chance considerando a segunda retirada.",
    evidence: [
      evidence(
        "urna",
        "Composição",
        "3 fichas azuis e 2 amarelas, indistinguíveis ao toque e com mistura uniforme. Todas igualmente prováveis.",
      ),
      evidence(
        "modos",
        "Regulamentos",
        "A: devolver e misturar a primeira ficha. B: não devolver a primeira ficha.",
      ),
      evidence(
        "evento",
        "Prêmio",
        "Ganhar exige azul na primeira e na segunda. Não basta uma azul.",
      ),
    ],
    model: {
      title: "Teste se a reposição importa",
      expression: "Com reposição: (A/N)²; sem: (A/N)((A − 1)/(N − 1))",
      note: "Probabilidade teórica de duas azuis em urna ideal com 2 amarelas. Mude a quantidade de azuis; não prevê uma retirada específica. Tarefas usam 3 azuis.",
      parameters: [parameter("azuis", "Azuis", 1, 8, 1, 3, "fichas")],
      evaluate: ({ azuis }) => [
        {
          label: "Duas azuis com reposição",
          value: round((azuis / (azuis + 2)) ** 2 * 100),
          unit: "%",
        },
        {
          label: "Duas azuis sem reposição",
          value: round((((azuis / (azuis + 2)) * (azuis - 1)) / (azuis + 1)) * 100),
          unit: "%",
        },
      ],
    },
    tasks: [
      numberTask(
        "com",
        "Qual chance de duas azuis com reposição na urna de referência?",
        36,
        "%",
        "Multiplique 3/5 por 3/5.",
        "P(AA) = 9/25 = 36%. A reposição preserva a composição.",
      ),
      numberTask(
        "sem",
        "Qual chance de duas azuis sem reposição?",
        30,
        "%",
        "Após uma azul, restam 2 azuis em 4 fichas.",
        "P(AA) = (3/5)(2/4) = 30%. A segunda chance depende da primeira.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual regra aumenta a chance desse prêmio?",
      [
        ["devolver", "Reposição: passa de 30% para 36%.", "Comparação do mesmo evento."],
        [
          "igual",
          "Tanto faz, pois a primeira chance é 3/5.",
          "Primeira chance igual não torna a segunda igual.",
        ],
        [
          "somar",
          "Sem reposição dá 110%, somando 60% e 50%.",
          "Conjunção de retiradas usa produto de chances condicionais, não soma.",
        ],
      ],
      "devolver",
      "Examine a urna após a primeira azul.",
      "A reposição muda a dependência das retiradas. O efeito foi calculado para o evento de duas azuis.",
    ),
    conclusion: "O regulamento altera o espaço amostral e a chance do evento.",
    reflection: "E no evento de cores diferentes?",
    transfer: "Descreva evento e regra de reposição antes de calcular outro sorteio.",
  },
  {
    id: "frequencias",
    title: "Três séries, a mesma urna",
    focus: "Frequência e falácia do jogador",
    context:
      "A equipe interpreta uma sequência de amarelas como uma dívida que o acaso deverá compensar. Você analisa os registros de séries independentes.",
    mission: "Distinguir frequência observada e probabilidade.",
    evidence: [
      evidence(
        "teoria",
        "Regra fixa",
        "3 azuis entre 5; reposição e mistura após cada retirada. P(azul) = 60% em toda retirada.",
      ),
      evidence(
        "series",
        "Séries didáticas",
        "8 azuis em 10 retiradas; 58 em 100; 612 em 1.000. Registros fictícios para estudar variação.",
      ),
      evidence(
        "sequencia",
        "Últimos resultados",
        "As cinco últimas foram amarelas. A equipe afirma: 'Agora azul é garantida'. Nenhuma ficha foi retirada definitivamente.",
      ),
    ],
    model: {
      title: "Teste a expectativa sem tratá-la como garantia",
      expression: "E(azuis) = np; DP(contagem) = √(np(1 − p))",
      note: "Modelo binomial com independência e p = 0,6. Desvio padrão não é limite obrigatório. Aumentar n reduz variação relativa, sem impor frequência exata.",
      parameters: [parameter("n", "Retiradas", 10, 1000, 10, 100, "retiradas")],
      evaluate: ({ n }) => [
        { label: "Contagem esperada", value: round(n * 0.6), unit: "azuis" },
        {
          label: "Desvio padrão da contagem",
          value: round(Math.sqrt(n * 0.6 * 0.4)),
          unit: "azuis",
        },
        {
          label: "Desvio padrão da frequência",
          value: round(Math.sqrt((0.6 * 0.4) / n) * 100),
          unit: "pontos percentuais",
        },
      ],
    },
    tasks: [
      numberTask(
        "freq",
        "Qual frequência de azuis na série de 1.000 retiradas?",
        61.2,
        "%",
        "Calcule 612/1000 × 100.",
        "A frequência é 61,2%, próxima de 60%, mas não igual à probabilidade teórica.",
      ),
      choiceTask(
        "seguinte",
        "Qual chance de azul após cinco amarelas neste modelo?",
        [
          ["sessenta", "60%", "Composição e independência se mantêm."],
          ["cem", "100%", "O acaso não precisa compensar a sequência."],
          ["zero", "0%", "A sequência não elimina azuis."],
        ],
        "sessenta",
        "A reposição modifica a composição?",
        "Cada retirada mantém 3 azuis entre 5. O modelo não tem memória.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Como apresentar as séries?",
      [
        [
          "variacao",
          "As frequências variam; séries maiores tendem a menor variação relativa, sem garantia em uma série.",
          "Distingue tendência e resultado.",
        ],
        [
          "fraude",
          "8 em 10 prova fraude porque deveriam ser 6.",
          "6 é expectativa, não quota obrigatória.",
        ],
        [
          "lei",
          "1.000 retiradas devem ter exatamente 600 azuis.",
          "Regularidade em amostras grandes não exige igualdade exata.",
        ],
      ],
      "variacao",
      "Compare expectativa e resultados possíveis.",
      "Uma discrepância pede investigação do mecanismo, sem virar prova automática de fraude.",
    ),
    conclusion:
      "Regularidade probabilística não determina o próximo resultado nem a contagem exata.",
    reflection: "Que dado sobre mistura ajudaria a investigar viés?",
    transfer: "Registre tamanho da série, frequência e hipóteses ao comparar simulação e teoria.",
  },
  {
    id: "rifa",
    title: "Justa em qual sentido?",
    focus: "Valor esperado e critérios de justiça",
    context:
      "O grêmio avalia uma rifa didática sem venda real. A igualdade de chances foi confundida com equilíbrio financeiro para quem compra.",
    mission: "Calcular o saldo esperado e explicitar critérios.",
    evidence: [
      evidence(
        "bilhetes",
        "Regulamento didático",
        "100 bilhetes equiprováveis; único prêmio hipotético de R$ 300; preço R$ 5. Uma pessoa compra um bilhete.",
      ),
      evidence(
        "custos",
        "Saldos possíveis",
        "Ganhador: recebe R$ 300 e pagou R$ 5, saldo R$ 295. Perdedor: saldo −R$ 5.",
      ),
      evidence(
        "finalidade",
        "Critérios",
        "Se todos os bilhetes forem vendidos, restam R$ 200 depois do prêmio, antes de outros custos. Equiprobabilidade e saldo esperado zero são critérios diferentes.",
      ),
    ],
    model: {
      title: "Teste o preço de equilíbrio esperado",
      expression: "E(saldo) = prêmio/100 − preço",
      note: "Um bilhete entre 100, prêmio fixo, todos vendidos e sorteio uniforme. Expectativa é média de repetições hipotéticas; em um sorteio a pessoa ganha ou perde. Não é proposta de aposta.",
      parameters: [
        parameter("preco", "Preço", 1, 10, 0.5, 5, "R$"),
        parameter("premio", "Prêmio", 100, 600, 50, 300, "R$"),
      ],
      evaluate: ({ preco, premio }) => [
        { label: "Saldo esperado por bilhete", value: round(premio / 100 - preco), unit: "R$" },
        { label: "Arrecadação depois do prêmio", value: round(100 * preco - premio), unit: "R$" },
        { label: "Preço de saldo esperado zero", value: round(premio / 100), unit: "R$" },
      ],
    },
    tasks: [
      numberTask(
        "esperado",
        "Qual saldo esperado líquido do bilhete a R$ 5? Use sinal negativo para perda.",
        -2,
        "R$",
        "Use 300/100 − 5, ou 0,01 × 295 + 0,99 × (−5).",
        "R$ 3 de prêmio esperado − R$ 5 de custo = −R$ 2. Isso não é uma perda exata de R$ 2 em um sorteio.",
      ),
      multiTask(
        "afirmacoes",
        "Quais duas afirmações o regulamento sustenta?",
        [
          ["chance", "Cada bilhete tem chance de 1%", "Equiprobabilidade foi declarada."],
          [
            "negativo",
            "O saldo esperado do comprador é negativo",
            "O prêmio esperado não cobre o custo.",
          ],
          [
            "lucro",
            "Repetir garante lucro",
            "Nem o acaso nem a expectativa negativa garantem lucro.",
          ],
        ],
        ["chance", "negativo"],
        "Separe chances e resultado financeiro.",
        "Um sorteio uniforme pode destinar parte da receita a uma causa; isso deve ser comunicado.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual parecer considera os dois critérios?",
      [
        [
          "transparencia",
          "É equiprovável, mas não tem equilíbrio financeiro para o comprador; explicitar custo, chance e finalidade.",
          "Critérios e números foram distinguidos.",
        ],
        [
          "lucro",
          "É investimento vantajoso porque prêmio supera preço.",
          "O prêmio precisa ser ponderado pela chance.",
        ],
        [
          "fraude",
          "Expectativa negativa prova fraude.",
          "Arrecadação declarada não prova manipulação.",
        ],
      ],
      "transparencia",
      "Não use 'justa' sem nomear um critério.",
      "O comprador tem chance de 1% e saldo esperado de −R$ 2. Transparência permite avaliar finalidade e risco.",
    ),
    conclusion: "Equiprobabilidade não equivale a vantagem financeira ou lucro garantido.",
    reflection: "Que preço faria a expectativa líquida ser zero?",
    transfer:
      "Em promoções, compare probabilidade, custo, prêmio e condições sem confundir retorno possível e garantido.",
  },
];
