import type { InvestigationCase } from "../_shared/investigation-types";
import {
  choiceTask,
  evidence,
  numberTask,
  orderTask,
  parameter,
  round,
} from "../_shared/math-science-authoring";

export const CASES: InvestigationCase[] = [
  {
    id: "sintese-agua",
    title: "Conservar não elimina sobras",
    focus: "Balanceamento e reagente limitante",
    context:
      "Na bancada virtual, hidrogênio e oxigênio formam água. Você deve conservar átomos e verificar se todo reagente disponível pode reagir.",
    mission: "Distinguir proporção estequiométrica e disponibilidade.",
    evidence: [
      evidence(
        "formulas",
        "Espécies",
        "H₂ tem 2 H; O₂ tem 2 O; H₂O tem 2 H e 1 O. Balancear altera coeficientes, nunca os índices das fórmulas.",
      ),
      evidence(
        "equacao",
        "Proporção",
        "\\(\\ce{2 H2 + O2 -> 2 H2O}\\). São 4 H e 2 O de cada lado; a mesma proporção vale em mol.",
      ),
      evidence(
        "estoque",
        "Estoque de referência",
        "Há 4 mol de H₂ e 1 mol de O₂. Hipótese de reação completa até esgotar o limitante, sem perdas ou reações paralelas; experimento somente virtual.",
      ),
    ],
    model: {
      title: "Teste a hipótese de que tudo reage",
      expression: "Extensão = min(n(H₂)/2, n(O₂)); água = 2 × extensão",
      note: "Quantidades em mol. A proporção está balanceada; disponibilidade limita produto. Não modela velocidade nem energia necessária. Tarefas usam 4 mol H₂ e 1 mol O₂.",
      parameters: [
        parameter("hidrogenio", "Hidrogênio inicial", 0, 6, 0.5, 4, "mol"),
        parameter("oxigenio", "Oxigênio inicial", 0, 4, 0.5, 1, "mol"),
      ],
      evaluate: ({ hidrogenio, oxigenio }) => {
        const extensao = Math.min(hidrogenio / 2, oxigenio);
        return [
          { label: "Água produzida", value: 2 * extensao, unit: "mol" },
          { label: "Hidrogênio restante", value: hidrogenio - 2 * extensao, unit: "mol" },
          { label: "Oxigênio restante", value: oxigenio - extensao, unit: "mol" },
        ];
      },
    },
    tasks: [
      choiceTask(
        "balancear",
        "Qual equação conserva H e O sem mudar substâncias?",
        [
          ["certa", "2 H₂ + O₂ → 2 H₂O", "Há 4 H e 2 O de cada lado."],
          [
            "indice",
            "H₂ + O₂ → H₂O₂",
            "Alterar o índice cria outra substância: peróxido de hidrogênio.",
          ],
          ["desbalanceada", "H₂ + O₂ → H₂O", "Oxigênio passa de 2 para 1 átomo."],
        ],
        "certa",
        "Conte cada elemento nos dois lados.",
        "Coeficientes multiplicam toda a fórmula; índices definem a identidade da espécie.",
      ),
      numberTask(
        "produto",
        "Qual máximo de água em mol com 4 mol H₂ e 1 mol O₂?",
        2,
        "mol",
        "1 mol de O₂ reage com 2 mol de H₂.",
        "Oxigênio limita: 1 mol O₂ produz 2 mol H₂O. Sobram 2 mol H₂.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual relatório respeita conservação e estoque?",
      [
        [
          "sobra",
          "Produz até 2 mol H₂O e deixa 2 mol H₂; a equação balanceada não exige consumo de tudo.",
          "A disponibilidade foi comparada à proporção.",
        ],
        ["quatro", "Produz 4 mol H₂O porque há 4 mol H₂.", "Seriam necessários 2 mol O₂."],
        [
          "criar",
          "A conservação cria o oxigênio que falta.",
          "Conservação impede criar átomos ausentes.",
        ],
      ],
      "sobra",
      "Separe a receita balanceada do estoque.",
      "A equação descreve a proporção do que reage, não garante disponibilidade suficiente de cada reagente.",
    ),
    conclusion: "Balanceamento e reagente limitante respondem a perguntas diferentes.",
    reflection: "Quanto oxigênio seria necessário para consumir os 4 mol H₂?",
    transfer:
      "Em outra reação, primeiro conserve átomos e depois compare estoques com os coeficientes.",
  },
  {
    id: "fogao-gas",
    title: "Oxigênio faz parte da conta",
    focus: "Combustão completa e hipótese de produtos",
    context:
      "Uma proposta de relatório prevê gases de uma combustão de metano sem conferir o oxigênio. Você deve revisar a previsão quantitativa e seus limites.",
    mission: "Calcular limite teórico sem prever automaticamente combustão real.",
    evidence: [
      evidence(
        "equacao",
        "Modelo de combustão completa",
        "CH₄ + 2 O₂ → CO₂ + 2 H₂O. São 1 C, 4 H e 4 O de cada lado.",
      ),
      evidence(
        "estoque",
        "Estoque virtual",
        "3 mol CH₄ e 4 mol O₂. O simulador admite apenas a rota de combustão completa; eventual combustível restante não entra em outras reações.",
      ),
      evidence(
        "limite",
        "O que o modelo não descreve",
        "Em combustão real com condições inadequadas podem surgir CO e outros produtos. Não se infere segurança, temperatura ou composição real somente da equação. Nenhuma chama deve ser produzida nesta atividade.",
      ),
    ],
    model: {
      title: "Teste a necessidade de oxigênio",
      expression: "CH₄ consumido = min(n(CH₄), n(O₂)/2)",
      note: "Limite teórico da rota completa. O combustível não consumido é uma sobra do modelo, sem prever CO ou fuligem. Tarefas usam 3 mol CH₄ e 4 mol O₂.",
      parameters: [
        parameter("metano", "Metano inicial", 0, 5, 0.5, 3, "mol"),
        parameter("oxigenio", "Oxigênio inicial", 0, 10, 0.5, 4, "mol"),
      ],
      evaluate: ({ metano, oxigenio }) => {
        const consumido = Math.min(metano, oxigenio / 2);
        return [
          { label: "CO₂ pela rota completa", value: consumido, unit: "mol" },
          { label: "Água pela rota completa", value: consumido * 2, unit: "mol" },
          { label: "CH₄ não consumido no modelo", value: metano - consumido, unit: "mol" },
        ];
      },
    },
    tasks: [
      numberTask(
        "necessario",
        "Quantos mol de O₂ seriam necessários para combustão completa dos 3 mol CH₄?",
        6,
        "mol",
        "Cada mol de metano exige 2 mol de oxigênio.",
        "3 × 2 = 6 mol O₂. Os 4 mol disponíveis não bastam para essa rota consumir todo o metano.",
      ),
      numberTask(
        "dioxido",
        "Com somente 4 mol O₂, qual máximo de CO₂ pela rota completa modelada?",
        2,
        "mol",
        "Divida os 4 mol O₂ pelo coeficiente 2.",
        "4/2 = 2 mol CH₄ consumidos, produzindo 2 mol CO₂ e 4 mol H₂O; 1 mol CH₄ sobra no modelo.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual parecer distingue cálculo e limite?",
      [
        [
          "limite",
          "A rota completa pode produzir até 2 mol CO₂; a composição de uma combustão real exige outros dados.",
          "Quantidade e hipótese foram explicitadas.",
        ],
        [
          "tres",
          "Produz 3 mol CO₂, ignorando o oxigênio.",
          "Conservação não garante reagente suficiente.",
        ],
        [
          "segura",
          "A equação balanceada prova que não há CO nem risco numa chama real.",
          "Balanceamento não determina condições, rotas paralelas ou segurança.",
        ],
      ],
      "limite",
      "Identifique a rota admitida pelo simulador.",
      "Uma previsão quantitativa só vale para suas hipóteses; combustão incompleta e exposição exigem avaliação própria.",
    ),
    conclusion:
      "Disponibilidade e rota de reação limitam a previsão; conservação sozinha não determina os produtos reais.",
    reflection: "Que informações faltam para estimar produtos de uma chama real?",
    transfer:
      "Ao comunicar rendimento teórico, declare reagente limitante e reações que ficaram fora do modelo.",
  },
  {
    id: "motor-etano",
    title: "Massa que aparece como gás",
    focus: "Proporção molar, massa e fronteira do sistema",
    context:
      "Uma equipe alega que a massa aumentou porque os produtos pesam mais que o etano inicial. Você deve incluir o oxigênio e separar mol de massa.",
    mission: "Fechar o balanço e avaliar o rendimento medido.",
    evidence: [
      evidence(
        "equacao",
        "Equação balanceada",
        "2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O. Conserva 4 C, 12 H e 14 O. Massas molares adotadas: etano 30 g/mol; O₂ 32; CO₂ 44; água 18.",
      ),
      evidence(
        "inicio",
        "Carga do sistema",
        "2 mol etano (60 g) e 7 mol oxigênio (224 g). Sistema fechado ideal; somente combustão completa.",
      ),
      evidence(
        "coleta",
        "Medição didática",
        "Previsão: 4 mol CO₂ = 176 g. Coleta experimental fictícia: 158,4 g CO₂; rendimento de coleta inclui perdas ou reação incompleta ainda não distinguidas.",
      ),
    ],
    model: {
      title: "Teste proporções e balanço de massa",
      expression: "2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O",
      note: "Mistura estequiométrica escalada, reação completa no modelo. Mude a escala mantendo a proporção; eficiência refere-se somente à massa de CO₂ coletada, sem identificar a causa da perda.",
      parameters: [
        parameter("escala", "Fator da mistura", 0.5, 3, 0.5, 1, ""),
        parameter("eficiencia", "Eficiência de coleta de CO₂", 50, 100, 5, 90, "%"),
      ],
      evaluate: ({ escala, eficiencia }) => [
        { label: "Massa de reagentes", value: round(284 * escala), unit: "g" },
        { label: "Massa teórica total de produtos", value: round(284 * escala), unit: "g" },
        { label: "CO₂ coletado", value: round((176 * escala * eficiencia) / 100), unit: "g" },
      ],
    },
    tasks: [
      numberTask(
        "massa",
        "Qual massa total dos reagentes na mistura de referência?",
        284,
        "g",
        "Some etano e oxigênio, não apenas etano.",
        "60 + 224 = 284 g. Produtos teóricos: 176 g CO₂ + 108 g água = 284 g; o número total de mol muda, mas a massa se conserva no modelo.",
      ),
      orderTask(
        "processo",
        "Ordene a análise do rendimento de CO₂.",
        [
          [
            "comparar",
            "Comparar 158,4 g coletados com a previsão",
            "Última etapa: razão entre coletado e previsto.",
          ],
          [
            "balancear",
            "Conferir conservação dos átomos",
            "A proporção vem da equação balanceada.",
          ],
          ["prever", "Converter 4 mol CO₂ em 176 g", "Use massa molar depois da proporção."],
        ],
        ["balancear", "prever", "comparar"],
        "Comece pela equação e só depois converta e confronte a coleta.",
        "O rendimento de coleta é 158,4/176 = 90%. Isso não explica sozinho se houve perda na coleta ou reação incompleta.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual relatório respeita o sistema e a medição?",
      [
        [
          "completo",
          "A previsão conserva 284 g; coleta de CO₂ é 90% da teórica, e a causa da diferença precisa investigação.",
          "Inclui oxigênio, água e limite da medição.",
        ],
        [
          "criada",
          "A massa foi criada porque 176 g CO₂ superam 60 g etano.",
          "Os 224 g de oxigênio também entram no sistema.",
        ],
        [
          "mol",
          "A conservação exige o mesmo número total de mol antes e depois.",
          "Coeficientes somam 9 antes e 10 depois; conservam-se átomos, não o número de moléculas.",
        ],
      ],
      "completo",
      "Defina a fronteira e não confunda mol com massa.",
      "Em sistema fechado, o balanço completo inclui todos os reagentes e produtos. Uma coleta parcial não mede a massa de todo o sistema.",
    ),
    conclusion:
      "Massa molar conecta proporção em mol e massa; o balanço precisa incluir gases e todos os produtos.",
    reflection: "Que ensaio distinguiria perda de coleta e reação incompleta?",
    transfer:
      "Em outro balanço, declare fronteira do sistema, espécies medidas e incertezas antes de atribuir uma causa.",
  },
];
