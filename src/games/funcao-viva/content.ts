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
    id: "entrega",
    title: "A tarifa tem origem",
    focus: "Função afim, variação e inversão",
    context:
      "Você confere a cobrança de uma cooperativa a partir de uma tabela de entregas. É preciso distinguir taxa inicial e preço por quilômetro.",
    mission: "Construir e validar a expressão da tarifa.",
    evidence: [
      evidence(
        "tabela",
        "Tabela de referência",
        "0 km: R$ 4; 2 km: R$ 11; 6 km: R$ 25. Regra válida de 0 a 15 km.",
      ),
      evidence(
        "condicao",
        "Condições",
        "Taxa inicial cobrada uma vez; custo por km constante. Não há tarifa dinâmica nem arredondamento da distância.",
      ),
      evidence("alvo", "Pedidos", "Um recibo de 10 km cobra R$ 39. Outro cliente dispõe de R$ 32."),
    ],
    model: {
      title: "Teste: dobrar a distância dobra o custo?",
      expression: "f(d) = 4 + ad",
      note: "Taxa inicial em R$, a em R$/km, d em km. Compare d = 5 e d = 10 mantendo a = 3,5. A regra foi validada até 15 km; tarefas usam a tabela original.",
      parameters: [
        parameter("distancia", "Distância", 0, 15, 0.5, 10, "km"),
        parameter("taxa", "Preço por quilômetro", 2, 5, 0.5, 3.5, "R$/km"),
      ],
      evaluate: ({ distancia, taxa }) => [
        { label: "Tarifa", value: round(4 + taxa * distancia), unit: "R$" },
        { label: "Parcela variável", value: round(taxa * distancia), unit: "R$" },
        {
          label: "Tarifa em metade da distância",
          value: round(4 + (taxa * distancia) / 2),
          unit: "R$",
        },
      ],
    },
    tasks: [
      numberTask(
        "inclinacao",
        "Qual taxa por quilômetro a tabela indica?",
        3.5,
        "R$/km",
        "Divida a diferença de tarifas pela diferença de distâncias.",
        "(11 − 4)/(2 − 0) = 3,5 R$/km. O ponto de 6 km valida 4 + 3,5 × 6 = 25.",
      ),
      numberTask(
        "inversa",
        "Até quantos quilômetros R$ 32 pagam pela regra da tabela?",
        8,
        "km",
        "Subtraia a taxa fixa antes de dividir por 3,5.",
        "32 = 4 + 3,5d; d = 28/3,5 = 8 km. R$ dividido por R$/km resulta em km.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual parecer confere o recibo?",
      [
        [
          "valido",
          "R$ 39 está correto: f(10) = 4 + 3,5 × 10.",
          "A regra reproduz tabela e pedido.",
        ],
        [
          "proporcional",
          "Deveria ser R$ 35, pois o custo total é diretamente proporcional à distância.",
          "A taxa inicial faz f(0) ≠ 0.",
        ],
        [
          "origem",
          "A taxa inicial é R$ 11 porque 2 km custam R$ 11.",
          "R$ 11 já incluem dois quilômetros.",
        ],
      ],
      "valido",
      "Verifique intercepto e taxa de variação.",
      "O custo é afim, não diretamente proporcional. A cobrança respeita o modelo e seu domínio.",
    ),
    conclusion: "A taxa fixa impede proporcionalidade direta entre custo total e distância.",
    reflection: "Por que f(10) não é o dobro de f(5)?",
    transfer:
      "Em outra tarifa, identifique preço inicial, custo por unidade e intervalo de validade.",
  },
  {
    id: "lanche",
    title: "O máximo tem vizinhos",
    focus: "Vértice, domínio discreto e restrição",
    context:
      "A cantina usa um modelo que inclui custos e redução de preço em lotes maiores. Você precisa recomendar uma quantidade viável hoje.",
    mission: "Comparar máximo matemático e melhor resultado possível.",
    evidence: [
      evidence(
        "modelo",
        "Lucro modelado",
        "L(q) = −2q² + 40q − 72, em R$. q é a quantidade de lanches por dia. Modelo didático válido para inteiros de 0 a 20.",
      ),
      evidence(
        "tabela",
        "Conferência",
        "L(9) = 126; L(10) = 128; L(11) = 126. L(0) = −72 representa custo fixo.",
      ),
      evidence(
        "limite",
        "Restrição de hoje",
        "Há ingredientes para no máximo 8 lanches. Lucro é receita menos custo, não apenas receita.",
      ),
    ],
    model: {
      title: "Teste o máximo com uma restrição",
      expression: "\\(L(q) = -2q^{2} + 40q - 72\\)",
      note: "Quantidades inteiras; demanda real não é prevista. Compare vizinhos de 10 e depois restrinja q a no máximo 8 para decidir hoje.",
      parameters: [parameter("quantidade", "Lanches vendidos", 0, 20, 1, 8, "lanches")],
      evaluate: ({ quantidade }) => [
        { label: "Lucro", value: -2 * quantidade ** 2 + 40 * quantidade - 72, unit: "R$" },
        {
          label: "Ingredientes",
          value: quantidade <= 8 ? "Viável hoje" : "Excede 8 lanches",
          unit: "",
        },
        {
          label: "Lucro do vizinho seguinte",
          value:
            quantidade < 20
              ? -2 * (quantidade + 1) ** 2 + 40 * (quantidade + 1) - 72
              : "Fora do domínio",
          unit: "R$",
        },
      ],
    },
    tasks: [
      numberTask(
        "vertice",
        "Sem a restrição de ingredientes, quantos lanches maximizam L?",
        10,
        "lanches",
        "Use q = −b/(2a), com a = −2 e b = 40.",
        "q = −40/(−4) = 10. A < 0 dá máximo; os vizinhos têm lucro menor.",
      ),
      numberTask(
        "limite",
        "Qual lucro do modelo em q = 8?",
        120,
        "R$",
        "Substitua 8 incluindo o custo fixo.",
        "L(8) = −128 + 320 − 72 = R$ 120.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual recomendação respeita o cenário de hoje?",
      [
        [
          "oito",
          "Vender 8 lanches, com lucro modelado de R$ 120, acompanhando a demanda.",
          "É o melhor ponto viável enquanto a função cresce.",
        ],
        [
          "dez",
          "Vender 10 porque o vértice supera qualquer restrição.",
          "O máximo matemático não cria ingredientes.",
        ],
        [
          "vinte",
          "Vender 20 porque lucro sempre cresce com a quantidade.",
          "L(20) = −72; a função cai após o vértice.",
        ],
      ],
      "oito",
      "O ótimo precisa pertencer ao conjunto viável.",
      "No domínio restrito de 0 a 8, L cresce e tem maior valor em 8. Isso continua condicionado à validade do modelo e às vendas.",
    ),
    conclusion: "O ótimo de uma função precisa respeitar domínio e restrições.",
    reflection: "Como a recomendação mudaria com capacidade para 12?",
    transfer: "Antes de recomendar um vértice, confira unidades, custos, domínio e restrições.",
  },
  {
    id: "reservatorio",
    title: "A reta encontra outra medição",
    focus: "Resíduo e limite de extrapolação",
    context:
      "O clube estima a água de um tanque. Uma reta descreve as primeiras leituras, mas uma medição independente exige rever a previsão.",
    mission: "Quantificar a discrepância e propor validação.",
    evidence: [
      evidence(
        "registros",
        "Leituras iniciais",
        "No início 100 L; após 2 min 80 L; após 4 min 60 L. A saída parecia constante.",
      ),
      evidence(
        "proposta",
        "Hipótese",
        "V(t) = 100 − 10t, com V em L e t em min. Prevê zero em 10 min e volume negativo depois.",
      ),
      evidence(
        "validacao",
        "Novo registro",
        "Após 6 min, foram medidos 50 L com incerteza ±2 L. Não há registro de mudança de válvula ou entrada de água.",
      ),
    ],
    model: {
      title: "Compare previsão e dado independente",
      expression: "V(t) = 100 − rt; resíduo = observado − previsto",
      note: "r é vazão suposta constante. A previsão bruta pode ficar negativa: isso mostra limite físico. O registro de 50 L refere-se somente ao minuto 6. Tarefas usam r = 10.",
      parameters: [
        parameter("tempo", "Tempo", 0, 12, 1, 6, "min"),
        parameter("vazao", "Vazão suposta", 5, 15, 1, 10, "L/min"),
      ],
      evaluate: ({ tempo, vazao }) => [
        { label: "Previsão bruta", value: 100 - vazao * tempo, unit: "L" },
        {
          label: "Validade física",
          value: 100 - vazao * tempo < 0 ? "Volume negativo: inválido" : "Volume não negativo",
          unit: "",
        },
        { label: "Resíduo no minuto 6", value: 50 - (100 - vazao * 6), unit: "L" },
      ],
    },
    tasks: [
      numberTask(
        "residuo",
        "Para r = 10, qual resíduo observado menos previsto no minuto 6?",
        10,
        "L",
        "Subtraia a previsão 100 − 10 × 6 dos 50 L.",
        "V(6) = 40 L; resíduo = 50 − 40 = 10 L, maior que a incerteza de ±2 L.",
      ),
      multiTask(
        "avaliar",
        "Quais duas ações sustentam uma revisão responsável?",
        [
          ["medir", "Repetir medições e verificar vazão", "Investiga instrumento e hipótese."],
          [
            "dominio",
            "Restringir a regra a condições validadas",
            "Uma reta não representa volume negativo real.",
          ],
          [
            "apagar",
            "Apagar a leitura discordante",
            "Excluir evidência sem justificativa protege a regra e impede a investigação.",
          ],
        ],
        ["medir", "dominio"],
        "A discrepância pode vir do modelo ou da medição.",
        "Validação confronta previsões com dados novos e verifica condições e instrumentos.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual conclusão o novo registro permite?",
      [
        [
          "revisar",
          "A reta ajusta as leituras iniciais, mas precisa revisão; não garante vazão constante depois.",
          "Reconhece ajuste local e falha de previsão.",
        ],
        [
          "certeza",
          "A reta garante o volume em qualquer instante.",
          "Há discrepância e extrapolações negativas.",
        ],
        [
          "entrada",
          "Alguém certamente adicionou 10 L.",
          "Outras causas, como mudança de vazão, são possíveis.",
        ],
      ],
      "revisar",
      "Uma diferença não identifica sozinha sua causa.",
      "O resíduo contradiz a precisão esperada no minuto 6, mas não determina o mecanismo responsável.",
    ),
    conclusion: "Uma função é uma hipótese sobre grandezas, validada por medições e condições.",
    reflection: "Que registro distinguiria mudança de vazão e falha do instrumento?",
    transfer:
      "Ao extrapolar outra série, apresente domínio, erro e condições em que a regra poderá mudar.",
  },
];
