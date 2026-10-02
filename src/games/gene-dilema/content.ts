import type { InvestigationCase } from "../_shared/investigation-types";
import {
  choiceTask,
  evidence,
  multiTask,
  numberTask,
  orderTask,
  parameter,
  round,
} from "../_shared/math-science-authoring";

export const CASES: InvestigationCase[] = [
  {
    id: "heranca",
    title: "Dominante não significa mais frequente",
    focus: "Genótipo, fenótipo e probabilidade",
    context:
      "Você revisa uma explicação sobre cor de pelo em uma espécie fictícia. O padrão é monogênico idealizado e não descreve toda a genética da cor em coelhos reais.",
    mission: "Prever um cruzamento sem transformar probabilidade em quota.",
    evidence: [
      evidence(
        "modelo",
        "Herança didática",
        "Um locus com alelos A e a. Dominância completa: AA e Aa têm pelo marrom; aa, branco. Sem efeito ambiental na expressão neste modelo.",
      ),
      evidence(
        "cruzamento",
        "Genitores",
        "Cruzamento Aa × aa. Primeiro genitor produz gametas A ou a, com 50% cada; o segundo produz apenas a.",
      ),
      evidence(
        "amostra",
        "Ninhada fictícia",
        "Uma ninhada de 4 tem 3 marrons e 1 branco. Cada filhote é um evento independente sob as hipóteses do modelo.",
      ),
    ],
    model: {
      title: "Teste expectativa e variação de uma ninhada",
      expression: "P(Aa) = 1/2; P(aa) = 1/2; E(marrons) = n/2",
      note: "Cruzamento Aa × aa fixo; dominância completa e eventos independentes. Valores esperados podem ser fracionários, embora contagens reais sejam inteiras. Não são quotas obrigatórias.",
      parameters: [parameter("filhotes", "Filhotes", 1, 20, 1, 4, "filhotes")],
      evaluate: ({ filhotes }) => [
        { label: "Marrons esperados", value: filhotes / 2, unit: "filhotes" },
        { label: "Brancos esperados", value: filhotes / 2, unit: "filhotes" },
        {
          label: "Probabilidade de todos marrons",
          value: round(0.5 ** filhotes * 100, 4),
          unit: "%",
        },
      ],
    },
    tasks: [
      numberTask(
        "probabilidade",
        "Qual chance de um filhote branco em Aa × aa?",
        50,
        "%",
        "Combine A ou a com o alelo a do outro genitor.",
        "Metade das combinações é Aa e metade aa. O fenótipo branco tem chance de 50% por filhote.",
      ),
      choiceTask(
        "dominancia",
        "O que 'dominante' significa neste modelo?",
        [
          [
            "expressao",
            "O fenótipo de Aa é igual ao de AA e diferente do de aa neste traço.",
            "Dominância relaciona fenótipos dos genótipos, não superioridade ou frequência.",
          ],
          [
            "maioria",
            "A sempre aparece em mais da metade da população.",
            "Frequência depende de história e processos populacionais.",
          ],
          [
            "forte",
            "A é um alelo sempre mais forte e adaptado.",
            "Dominância não estabelece valor adaptativo em qualquer ambiente.",
          ],
        ],
        "expressao",
        "Observe o fenótipo de Aa.",
        "Dominância completa relaciona genótipo e fenótipo; não determina a frequência do alelo nem sua vantagem.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "A ninhada 3 marrons e 1 branco contradiz o cruzamento?",
      [
        [
          "variacao",
          "Não; 50% é chance por filhote, e amostras pequenas variam.",
          "A amostra não precisa reproduzir a proporção esperada exatamente.",
        ],
        [
          "erro",
          "Sim; toda ninhada de 4 precisa de 2 de cada cor.",
          "Expectativa não é quota obrigatória.",
        ],
        [
          "mudar",
          "O ambiente obrigou um branco a transformar seu genótipo em Aa.",
          "Nenhum dado mostra transformação de genótipo por necessidade.",
        ],
      ],
      "variacao",
      "Diferencie chance e resultado de uma amostra.",
      "Em eventos independentes com p = 1/2, três marrons entre quatro têm probabilidade 4/16 = 25%; é resultado possível.",
    ),
    conclusion:
      "Dominância se refere à expressão; frequência observada e probabilidade são conceitos distintos.",
    reflection: "Uma ninhada maior garantiria exatamente metade de cada cor?",
    transfer:
      "Ao interpretar herança, declare modelo, cruzamento e tamanho da amostra antes de concluir.",
  },
  {
    id: "selecao",
    title: "Variação antes da pressão",
    focus: "Seleção diferencial sem teleologia",
    context:
      "Uma população fictícia tem variantes de cor herdáveis antes da exposição a predadores. Você acompanha as contagens sem supor que os indivíduos mudam para atender ao ambiente.",
    mission: "Explicar a mudança de proporção pela sobrevivência diferencial.",
    evidence: [
      evidence(
        "inicio",
        "Antes da pressão",
        "100 indivíduos: 50 marrons e 50 brancos. As variantes já existem e são herdáveis no modelo.",
      ),
      evidence(
        "sobrevivencia",
        "Cenário de fundo marrom",
        "Probabilidades didáticas de sobrevivência: marrom 80%; branco 40%. Sobreviventes deixam, em média, a mesma quantidade de descendentes por indivíduo.",
      ),
      evidence(
        "limites",
        "Mecanismo e limites",
        "Não há mudança de cor dos indivíduos, mutação dirigida, migração ou deriva modeladas. Camuflagem só favorece sobrevivência sob este predador visual e este fundo.",
      ),
    ],
    model: {
      title: "Teste uma pressão diferencial",
      expression:
        "Sobreviventes esperados = inicial × sobrevivência; proporção = marrons/(marrons + brancos)",
      note: "Uma etapa de sobrevivência e contribuição reprodutiva igual entre sobreviventes. Não é um modelo completo de gerações ou frequências alélicas. Tarefas usam 80% e 40%.",
      parameters: [
        parameter("marrom", "Sobrevivência marrom", 10, 100, 10, 80, "%"),
        parameter("branco", "Sobrevivência branca", 10, 100, 10, 40, "%"),
      ],
      evaluate: ({ marrom, branco }) => [
        {
          label: "Marrons sobreviventes esperados",
          value: (50 * marrom) / 100,
          unit: "indivíduos",
        },
        {
          label: "Brancos sobreviventes esperados",
          value: (50 * branco) / 100,
          unit: "indivíduos",
        },
        {
          label: "Proporção marrom entre sobreviventes",
          value: round((marrom / (marrom + branco)) * 100),
          unit: "%",
        },
      ],
    },
    tasks: [
      numberTask(
        "proporcao",
        "Qual porcentagem esperada de marrons entre sobreviventes no cenário 80% e 40%? Arredonde a duas casas.",
        66.67,
        "%",
        "Há 40 marrons e 20 brancos esperados; divida 40 pelo total.",
        "40/(40 + 20) = 2/3 ≈ 66,67%. A proporção muda por sobrevivência diferencial, sem indivíduos mudarem de cor.",
      ),
      orderTask(
        "mecanismo",
        "Ordene a explicação do mecanismo, incluindo descendência.",
        [
          [
            "descendencia",
            "Sobreviventes contribuem para a geração seguinte",
            "Herança liga a seleção à mudança entre gerações.",
          ],
          [
            "variacao",
            "Variantes herdáveis já existem na população",
            "A variação precede a pressão.",
          ],
          [
            "diferencial",
            "A pressão provoca sobrevivência diferencial",
            "O ambiente afeta probabilidades, não cria uma cor por necessidade.",
          ],
        ],
        ["variacao", "diferencial", "descendencia"],
        "Seleção depende de variação prévia e herança.",
        "Variação herdável, diferença de sobrevivência e contribuição reprodutiva podem mudar frequências na população.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual explicação se sustenta?",
      [
        [
          "populacao",
          "A proporção mudou porque variantes preexistentes sobreviveram de forma diferente; não houve intenção ou transformação dirigida.",
          "O mecanismo é populacional.",
        ],
        [
          "vontade",
          "Os brancos desejaram camuflagem e ficaram marrons.",
          "Nenhum indivíduo mudou no modelo; necessidade não dirige mutação.",
        ],
        [
          "perfeita",
          "Marrom é sempre superior em qualquer ambiente.",
          "A vantagem depende do fundo, predador e outras condições.",
        ],
      ],
      "populacao",
      "Compare contagem antes e depois sem atribuir finalidade.",
      "Seleção não antecipa uma meta. Mudanças ambientais podem alterar ou inverter vantagens relativas.",
    ),
    conclusion:
      "Mudança de frequência é um efeito populacional de diferenças entre variantes herdáveis.",
    reflection: "Que aconteceria se as sobrevivências fossem trocadas?",
    transfer:
      "Ao explicar resistência em microrganismos, distinga variação prévia e seleção de uma suposta mudança porque precisaram.",
  },
  {
    id: "pressao-neutra",
    title: "Menos indivíduos, proporção igual?",
    focus: "Pressão neutra ao traço e incerteza",
    context:
      "A comida diminuiu, mas não há evidência de relação entre cor e uso de alimento. Você precisa distinguir queda da população, seleção de um traço e variação ao acaso.",
    mission: "Avaliar o que a evidência permite afirmar sobre o traço.",
    evidence: [
      evidence(
        "inicio",
        "População de referência",
        "50 marrons e 50 brancos antes da escassez. Cores têm a mesma chance didática de sobreviver: 60%.",
      ),
      evidence(
        "observado",
        "Duas repetições fictícias",
        "Ensaio A: 31 marrons e 29 brancos. Ensaio B: 28 marrons e 32 brancos. Não foram medidos genótipos nem descendentes.",
      ),
      evidence(
        "incerteza",
        "Conclusão a testar",
        "Esperam-se 30 de cada cor. Igual chance não exige contagens idênticas; flutuações podem ocorrer. Escassez não prova seleção pela cor sem vínculo entre traço e sucesso reprodutivo.",
      ),
    ],
    model: {
      title: "Teste sobrevivências iguais",
      expression: "E(marrons) = 50s; E(brancos) = 50s; frequência esperada = 50%",
      note: "Modelo de valores esperados, sem realizar sorteios. Pressão reduz ambas as contagens igualmente em média. Deriva genética refere-se à mudança aleatória de frequências alélicas entre gerações e não é medida por estes dados.",
      parameters: [
        parameter("sobrevivencia", "Sobrevivência de ambas as cores", 10, 100, 10, 60, "%"),
      ],
      evaluate: ({ sobrevivencia }) => [
        { label: "Marrons esperados", value: (50 * sobrevivencia) / 100, unit: "indivíduos" },
        { label: "Brancos esperados", value: (50 * sobrevivencia) / 100, unit: "indivíduos" },
        { label: "Frequência marrom esperada", value: 50, unit: "%" },
      ],
    },
    tasks: [
      numberTask(
        "total",
        "Qual total esperado de sobreviventes com chance igual de 60%?",
        60,
        "indivíduos",
        "Calcule 100 × 0,6.",
        "Esperam-se 30 marrons + 30 brancos = 60 indivíduos, sem quota exata por cor.",
      ),
      multiTask(
        "evidencia",
        "Quais dois dados fortaleceriam uma hipótese de seleção pela cor?",
        [
          [
            "diferenca",
            "Diferença reprodutível de sobrevivência por cor, controlando condições",
            "Pode mostrar associação entre traço e sobrevivência.",
          ],
          [
            "heranca",
            "Herança e contribuição de cada variante aos descendentes",
            "Seleção evolutiva exige relação com sucesso reprodutivo e herança.",
          ],
          [
            "narrativa",
            "Uma história em que o ambiente deseja uma cor",
            "Intenção atribuída ao ambiente não é evidência de mecanismo.",
          ],
        ],
        ["diferenca", "heranca"],
        "Procure vínculo mensurável entre traço e contribuição à geração seguinte.",
        "Uma diferença em uma repetição não prova seleção; controles e descendência tornam a hipótese examinável.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual conclusão cabe às duas repetições?",
      [
        [
          "cautela",
          "Houve queda de contagens; as pequenas diferenças são compatíveis com acaso, e não demonstram seleção pela cor.",
          "A conclusão respeita a chance igual e a falta de dados reprodutivos.",
        ],
        [
          "sempre",
          "Qualquer redução da população prova evolução por seleção de cor.",
          "Tamanho populacional e frequência de um traço não são a mesma grandeza.",
        ],
        [
          "deriva",
          "Os ensaios provam deriva de alelos entre gerações.",
          "Não foram medidos alelos nem gerações sucessivas.",
        ],
      ],
      "cautela",
      "Distingua contagem total, traço observado e frequência alélica.",
      "Os dados são compatíveis com uma pressão neutra à cor. Não excluem outros mecanismos, mas não os demonstram.",
    ),
    conclusion:
      "Mudanças de tamanho, proporção fenotípica e frequência alélica precisam de evidências próprias.",
    reflection: "Por que duas repetições ajudam mais que uma, mas ainda não medem herança?",
    transfer:
      "Antes de atribuir seleção, descreva traço, herança, pressão e diferenças no sucesso reprodutivo.",
  },
];
