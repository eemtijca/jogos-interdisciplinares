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
    id: "consumo",
    title: "Potência não é consumo mensal",
    focus: "Energia, eficiência e serviço prestado",
    context:
      "A escola fictícia compara duas soluções de iluminação para o mesmo serviço. Você verifica consumo e custos sem usar o número de watts como sinônimo de energia total.",
    mission: "Converter potência e tempo em energia e comparar uso equivalente.",
    evidence: [
      evidence(
        "opcoes",
        "Soluções comparáveis",
        "10 lâmpadas A de 40 W ou 10 B de 10 W, com serviço luminoso equivalente declarado neste cenário. Uso 5 h/dia por 20 dias; nenhuma instalação será realizada.",
      ),
      evidence(
        "tarifa",
        "Custo didático",
        "Preço hipotético de R$ 1 por kWh, sem tarifas fixas, tributos ou bandeiras. Não é tarifa real nem orçamento de obra.",
      ),
      evidence(
        "limite",
        "Avaliação ampliada",
        "A escolha também depende de durabilidade, compra, manutenção, descarte e condições de uso. A energia economizada não calcula sozinha todo impacto do ciclo de vida.",
      ),
    ],
    model: {
      title: "Teste efeito do tempo de uso",
      expression: "E = número × potência × horas/dia × dias /1000",
      note: "10 lâmpadas, 20 dias; potências constantes e serviço equivalente. Varie horas igualmente nos dois modelos. A potência é W; energia é kWh. Custos totais e instalação não são modelados.",
      parameters: [parameter("horas", "Horas por dia", 1, 10, 1, 5, "h/dia")],
      evaluate: ({ horas }) => [
        { label: "Energia A", value: round((10 * 40 * horas * 20) / 1000), unit: "kWh" },
        { label: "Energia B", value: round((10 * 10 * horas * 20) / 1000), unit: "kWh" },
        { label: "Economia de energia", value: round((10 * 30 * horas * 20) / 1000), unit: "kWh" },
        {
          label: "Economia no custo variável hipotético",
          value: round((10 * 30 * horas * 20) / 1000),
          unit: "R$",
        },
      ],
    },
    tasks: [
      numberTask(
        "energia",
        "Qual energia consumida por B nas condições de referência?",
        10,
        "kWh",
        "São 100 W no conjunto e 100 horas no período; converta W para kW.",
        "10 × 10 W = 100 W = 0,1 kW. 0,1 × (5 × 20) = 10 kWh.",
      ),
      numberTask(
        "economia",
        "Quanto B economiza em energia em relação a A no período?",
        30,
        "kWh",
        "A consome 0,4 kW × 100 h.",
        "A = 40 kWh e B = 10 kWh; economia = 30 kWh, ou 75% de A, mantendo o mesmo serviço declarado.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual recomendação considera grandezas e limites?",
      [
        [
          "avaliar",
          "B reduz consumo modelado em 30 kWh; comparar compra, durabilidade, descarte e condições antes da substituição.",
          "O cálculo sustenta energia operacional, com avaliação ampliada.",
        ],
        [
          "watts",
          "10 W significam 10 kWh em qualquer período.",
          "Watts são potência; energia depende de tempo e número de aparelhos.",
        ],
        [
          "total",
          "A economia operacional prova impacto ambiental total zero.",
          "Fabricação, materiais e descarte não entraram no modelo.",
        ],
      ],
      "avaliar",
      "Diferencie serviço, potência, tempo e ciclo de vida.",
      "Eficiência deve ser comparada para serviço equivalente. A redução operacional é demonstrada, mas não esgota custos e impactos.",
    ),
    conclusion: "Consumo combina potência e tempo; eficiência exige comparar o serviço prestado.",
    reflection: "B ligada quatro vezes mais tempo consumiria quanto em relação a A?",
    transfer:
      "Ao comparar aparelhos, leia potência, horas de uso, número de unidades e desempenho equivalente.",
  },
  {
    id: "armazenamento",
    title: "O painel não atende a noite sozinho",
    focus: "Geração variável, armazenamento e perdas",
    context:
      "Uma oficina virtual quer abastecer uma carga noturna com energia solar diurna. Você verifica geração e bateria, sem transformar potência nominal em autonomia garantida.",
    mission: "Dimensionar o balanço de energia sob cenários declarados.",
    evidence: [
      evidence(
        "painel",
        "Geração hipotética",
        "Painel de potência nominal 1 kW. Cenário de 4 horas solares equivalentes por dia e fator global de geração 80%: 3,2 kWh/dia. Horas equivalentes não são horas fixas de luz.",
      ),
      evidence(
        "bateria",
        "Armazenamento",
        "Bateria com capacidade nominal de 4 kWh; fração utilizável 80%; eficiência de descarga 90%. Energia máxima entregue à carga: 2,88 kWh. Outros limites de potência e segurança não são simulados.",
      ),
      evidence(
        "carga",
        "Demanda",
        "Carga noturna precisa de 2 kWh. Bateria começa vazia e recebe a energia solar do dia; energia útil entregue = min(geração, 3,2 kWh armazenáveis) × 0,9.",
      ),
    ],
    model: {
      title: "Teste um dia menos favorável",
      expression: "Geração = 1 kW × H × 0,8; entrega = min(geração, 4 × 0,8) × 0,9",
      note: "Carga idealizada sem perdas adicionais; 80% é fator global de geração e 90% é eficiência de descarga. Bateria inicialmente vazia; sem envelhecimento, temperatura ou limite de potência. Teste H = 4 e H = 2; nenhuma ligação física é proposta.",
      parameters: [
        parameter("sol", "Horas solares equivalentes", 0, 6, 0.5, 4, "h"),
        parameter("demanda", "Demanda noturna", 1, 4, 0.5, 2, "kWh"),
      ],
      evaluate: ({ sol, demanda }) => {
        const entregue = Math.min(sol * 0.8, 3.2) * 0.9;
        return [
          { label: "Geração", value: round(sol * 0.8), unit: "kWh" },
          { label: "Energia entregue", value: round(entregue), unit: "kWh" },
          { label: "Saldo diante da demanda", value: round(entregue - demanda), unit: "kWh" },
          {
            label: "Atendimento neste cenário",
            value: entregue >= demanda ? "Atende" : "Precisa complemento ou reduzir demanda",
            unit: "",
          },
        ];
      },
    },
    tasks: [
      numberTask(
        "entrega",
        "Qual energia entregue no cenário de 4 horas solares equivalentes?",
        2.88,
        "kWh",
        "A geração e a fração utilizável são 3,2; aplique 90% na descarga.",
        "min(3,2; 3,2) × 0,9 = 2,88 kWh, cobrindo os 2 kWh de demanda neste cenário.",
      ),
      numberTask(
        "deficit",
        "Com 2 horas equivalentes e demanda 2 kWh, qual déficit positivo?",
        0.56,
        "kWh",
        "A entrega é 1 × 2 × 0,8 × 0,9; subtraia da demanda.",
        "Entrega 1,44 kWh; déficit = 2 − 1,44 = 0,56 kWh. Capacidade nominal maior não cria energia que não foi gerada.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual plano considera variabilidade e armazenamento?",
      [
        [
          "complemento",
          "No cenário de 4 h atende; planejar complemento ou redução para dias de 2 h e verificar limites com projeto qualificado.",
          "Distingue cenário favorável e confiabilidade.",
        ],
        [
          "garantia",
          "1 kW nominal garante 24 kWh todo dia e dispensa bateria.",
          "Potência nominal não é produção contínua de 24 horas.",
        ],
        [
          "maior",
          "Basta bateria maior, mesmo começando vazia num dia sem sol.",
          "Armazenamento não gera energia.",
        ],
      ],
      "complemento",
      "Compare fonte, capacidade útil, perdas e demanda.",
      "A autonomia é condicional aos cenários; projeto real exige dados meteorológicos, limites de potência, proteções e manutenção.",
    ),
    conclusion:
      "Potência nominal, energia gerada, armazenamento e entrega são grandezas diferentes.",
    reflection: "Que informação falta para estimar muitos dias consecutivos nublados?",
    transfer:
      "Em outra proposta solar, confira geração variável, estado inicial, capacidade útil, perdas e carga ao longo do tempo.",
  },
  {
    id: "decisao-transicao",
    title: "Transição com critérios explícitos",
    focus: "Cenários, emissões e impactos socioambientais",
    context:
      "Um conselho fictício precisa suprir 100 kWh/dia. Dois cenários combinam fontes com fatores de emissão didáticos. Você deve comparar o indicador sem reduzir a decisão a uma única conta.",
    mission: "Avaliar emissões estimadas, confiabilidade e limites de uma escolha coletiva.",
    evidence: [
      evidence(
        "fatores",
        "Fatores hipotéticos",
        "Fonte T: 0,8 kg CO₂e/kWh; fonte R: 0,05 kg CO₂e/kWh. Fatores fixos meramente didáticos; não representam todas as tecnologias nem estudos reais de ciclo de vida.",
      ),
      evidence(
        "cenarios",
        "Serviço equivalente",
        "Demanda de 100 kWh/dia. A: 100% T. B: 60% R e 40% T. O balanço diário fecha, mas ainda não mostra atendimento em cada hora.",
      ),
      evidence(
        "criterios",
        "Consulta do conselho",
        "Considerar disponibilidade horária, rede, armazenamento, custo, água, resíduos, uso do solo e comunidades. Impactos e distribuição de benefícios não foram quantificados pelos fatores.",
      ),
    ],
    model: {
      title: "Teste participação e emissão estimada",
      expression: "Emissão = demanda × (fração R × 0,05 + fração T × 0,8)",
      note: "Mistura por energia diária, fatores hipotéticos constantes, sem curva horária ou custo. Varie participação e demanda; o modelo não decide aceitabilidade social nem confiabilidade.",
      parameters: [
        parameter("renovavel", "Participação R na energia", 0, 100, 10, 60, "%"),
        parameter("demanda", "Demanda diária", 50, 150, 10, 100, "kWh/dia"),
      ],
      evaluate: ({ renovavel, demanda }) => [
        {
          label: "Emissão estimada da mistura",
          value: round(demanda * ((renovavel / 100) * 0.05 + (1 - renovavel / 100) * 0.8)),
          unit: "kg CO₂e/dia",
        },
        { label: "Referência 100% T", value: round(demanda * 0.8), unit: "kg CO₂e/dia" },
        {
          label: "Redução estimada",
          value: round(((demanda * renovavel) / 100) * 0.75),
          unit: "kg CO₂e/dia",
        },
      ],
    },
    tasks: [
      numberTask(
        "mistura",
        "Qual emissão do cenário B para 100 kWh/dia e 60% R?",
        35,
        "kg CO₂e/dia",
        "São 60 kWh de R e 40 kWh de T.",
        "60 × 0,05 + 40 × 0,8 = 3 + 32 = 35 kg CO₂e/dia. A dá 80; redução didática de 45 kg, ou 56,25%.",
      ),
      multiTask(
        "investigar",
        "Quais duas dimensões ainda precisam investigação para recomendar implantação?",
        [
          [
            "horaria",
            "Oferta e demanda horárias, rede e armazenamento",
            "Um balanço diário não garante atendimento em toda hora.",
          ],
          [
            "social",
            "Custos, uso do solo, resíduos e participação das comunidades",
            "O fator de emissão não cobre esses impactos.",
          ],
          [
            "zero",
            "Declarar que qualquer fonte R tem impactos zero",
            "Mesmo o fator didático de R é diferente de zero; outras dimensões não foram medidas.",
          ],
        ],
        ["horaria", "social"],
        "Procure o que ficou fora da conta de emissões.",
        "Decisão tecnológica combina indicadores e valores explícitos. A consulta precisa avaliar quem recebe benefícios e quem suporta impactos.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual encaminhamento é defensável?",
      [
        [
          "condicional",
          "B reduz emissões nos fatores dados; avançar para estudo horário e socioambiental participativo antes de recomendar o sistema real.",
          "O indicador apoia uma etapa de análise, sem encerrar os demais critérios.",
        ],
        [
          "automatico",
          "Escolher B automaticamente porque todo impacto cabe em kg CO₂e.",
          "Emissões são um indicador importante, mas não esgotam impactos ou confiabilidade.",
        ],
        [
          "igual",
          "Emissões são iguais porque ambos fornecem 100 kWh.",
          "O fator por kWh é diferente entre as fontes.",
        ],
      ],
      "condicional",
      "Separe resultado do modelo e decisão pública.",
      "A comparação quantifica redução sob fatores dados. Confiabilidade, custos, impactos e participação exigem dados próprios e podem alterar a recomendação.",
    ),
    conclusion:
      "Uma transição responsável explicita indicadores, limites, pessoas afetadas e condições de atendimento.",
    reflection: "Que critério poderia mudar a comparação sem alterar os fatores de emissão?",
    transfer:
      "Ao avaliar uma tecnologia, use serviço equivalente, fronteira do estudo, fontes dos indicadores e critérios de decisão compartilhados.",
  },
];
