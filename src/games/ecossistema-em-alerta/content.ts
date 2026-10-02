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
    id: "fluxo-e-ciclo",
    title: "Energia não faz o mesmo caminho da matéria",
    focus: "Fluxo de energia e ciclos da matéria",
    context:
      "Uma maquete de cadeia alimentar indica transferências iguais entre níveis. Você precisa avaliar a produção disponível e uma alegação sobre reciclagem de energia.",
    mission: "Separar transferência de energia, dissipação e reciclagem de nutrientes.",
    evidence: [
      evidence(
        "produtores",
        "Produção didática",
        "Produtores disponibilizam 10.000 kJ/m² por ano. A maquete supõe que 10% da produção disponível passa a cada nível seguinte.",
      ),
      evidence(
        "cadeia",
        "Níveis",
        "Produtores, consumidores primários, secundários e terciários. Os demais 90% em cada etapa não passam ao próximo nível nessa conta; incluem respiração e material não consumido ou não assimilado.",
      ),
      evidence(
        "limites",
        "Ciclo e fluxo",
        "Decompositores contribuem para disponibilizar nutrientes; energia é transformada e dissipada como calor. Eficiência de 10% é hipótese da maquete, não constante universal.",
      ),
    ],
    model: {
      title: "Teste a sensibilidade à eficiência",
      expression: "E_n = E_0 × e^n",
      note: "Produção disponível por área e ano. Cadeia simplificada, mesma eficiência em cada etapa; não modela rede alimentar real. Compare e = 0,1 e 0,2; tarefas usam 10%.",
      parameters: [
        parameter("eficiencia", "Transferência por etapa", 5, 25, 5, 10, "%"),
        parameter("producao", "Produção dos produtores", 5000, 15000, 1000, 10000, "kJ/m²/ano"),
      ],
      evaluate: ({ eficiencia, producao }) => [
        {
          label: "Consumidores primários",
          value: round((producao * eficiencia) / 100),
          unit: "kJ/m²/ano",
        },
        {
          label: "Consumidores secundários",
          value: round(producao * (eficiencia / 100) ** 2),
          unit: "kJ/m²/ano",
        },
        {
          label: "Consumidores terciários",
          value: round(producao * (eficiencia / 100) ** 3),
          unit: "kJ/m²/ano",
        },
      ],
    },
    tasks: [
      numberTask(
        "secundarios",
        "Qual produção chega aos consumidores secundários com 10% por etapa?",
        100,
        "kJ/m²/ano",
        "Aplique 10% duas vezes a 10.000.",
        "10.000 × 0,1 × 0,1 = 100 kJ/m²/ano. Não confundir produção por tempo com biomassa armazenada.",
      ),
      choiceTask(
        "reciclagem",
        "Qual distinção é coerente?",
        [
          [
            "fluxo",
            "Nutrientes podem ciclar; energia flui e é dissipada como calor.",
            "Matéria e energia seguem processos diferentes.",
          ],
          [
            "ciclo",
            "Decompositores devolvem toda energia original aos produtores.",
            "Reciclar nutrientes não recompõe a energia disponível original.",
          ],
          [
            "desaparece",
            "A energia que não passa ao nível seguinte deixa de existir.",
            "Energia se transforma; a fração disponível para o próximo nível diminui.",
          ],
        ],
        "fluxo",
        "A conservação de energia não implica sua disponibilidade para novo trabalho.",
        "Energia é conservada nas transformações, mas sua dispersão como calor limita reaproveitamento biológico.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Como revisar a maquete?",
      [
        [
          "limite",
          "Mostrar fluxo de energia e ciclo de nutrientes separadamente, com 10% como hipótese didática.",
          "Conceito e limite da regra ficam explícitos.",
        ],
        [
          "constante",
          "Apresentar 10% como taxa exata de todo ecossistema.",
          "Eficiências variam entre organismos, recursos e ambientes.",
        ],
        [
          "reciclar",
          "Prometer que decomposição recicla toda energia para a base.",
          "Essa promessa confunde matéria e energia disponível.",
        ],
      ],
      "limite",
      "Separe representação, grandeza e hipótese.",
      "A maquete ajuda a comparar níveis, mas não permite estimar uma rede real sem dados de produtividade e eficiência.",
    ),
    conclusion: "Ciclos de nutrientes e fluxo de energia precisam de representações distintas.",
    reflection: "Por que elevar uma eficiência pode alterar muito o último nível?",
    transfer:
      "Em pirâmides ecológicas, confira se a grandeza é energia por tempo, biomassa ou número de indivíduos.",
  },
  {
    id: "nutrientes-oxigenio",
    title: "Mais nutrientes, menos oxigênio",
    focus: "Eutrofização, controle e intervenção",
    context:
      "O clube analisa mesocosmos virtuais com e sem adição de nutrientes. Você precisa ligar evidências, mecanismo e uma proposta de reduzir a carga de entrada.",
    mission:
      "Interpretar comparação controlada sem prometer recuperação imediata de uma lagoa real.",
    evidence: [
      evidence(
        "ensaio",
        "Desenho didático",
        "Mesocosmos iguais, grupos sorteados com ou sem nutrientes; luz e temperatura constantes. Ambos começam com oxigênio dissolvido de 8 mg/L. Após 7 dias: tratado 3 mg/L; controle 7 mg/L.",
      ),
      evidence(
        "processo",
        "Observações fictícias",
        "No tratado houve aumento de algas seguido por maior decomposição. Respiração e decomposição consomem oxigênio; o nutriente não retira oxigênio simplesmente por ter sido adicionado.",
      ),
      evidence(
        "intervencao",
        "Carga a reduzir",
        "Uma entrada hipotética carrega 40 mg de nutriente por dia. Barreira vegetada com redução suposta de 60% deixaria 16 mg/dia. A lagoa real tem outras entradas, sedimento e renovação de água não modelados.",
      ),
    ],
    model: {
      title: "Teste redução de carga sem prever oxigênio automaticamente",
      expression: "Carga restante = entrada × (1 − redução)",
      note: "Balanço simplificado de entrada diária, sem simular oxigênio, tempo de recuperação, chuvas ou nutrientes acumulados no sedimento. Tarefas usam 40 mg/dia e redução de 60%.",
      parameters: [
        parameter("entrada", "Carga de entrada", 10, 80, 10, 40, "mg/dia"),
        parameter("reducao", "Redução hipotética", 0, 80, 10, 60, "%"),
      ],
      evaluate: ({ entrada, reducao }) => [
        { label: "Carga restante", value: round(entrada * (1 - reducao / 100)), unit: "mg/dia" },
        { label: "Carga evitada", value: round((entrada * reducao) / 100), unit: "mg/dia" },
        { label: "Oxigênio da lagoa real", value: "Não previsto por este modelo", unit: "" },
      ],
    },
    tasks: [
      numberTask(
        "diferenca",
        "Qual diferença de mudanças de oxigênio (tratado menos controle) após 7 dias?",
        -4,
        "mg/L",
        "Tratado mudou 3 − 8; controle mudou 7 − 8. Subtraia as mudanças.",
        "(−5) − (−1) = −4 mg/L. A comparação controlada apoia efeito adicional no mesocosmo, sob as condições declaradas.",
      ),
      orderTask(
        "mecanismo",
        "Ordene a hipótese mecanística de eutrofização.",
        [
          [
            "decomposicao",
            "Mais matéria orgânica é respirada e decomposta, consumindo oxigênio",
            "Liga a produção excessiva ao consumo de oxigênio.",
          ],
          ["entrada", "Aumenta a entrada de nutrientes", "É a intervenção inicial."],
          [
            "algas",
            "Aumenta a produção de algas nas condições do ensaio",
            "Resposta intermediária observada.",
          ],
        ],
        ["entrada", "algas", "decomposicao"],
        "Use as observações para conectar causa, resposta e mecanismo.",
        "O encadeamento não substitui medir oxigênio; depende também de luz, temperatura, circulação e disponibilidade de nutrientes.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual proposta é proporcional à evidência?",
      [
        [
          "monitorar",
          "Reduzir fontes de nutrientes, medir carga e oxigênio ao longo do tempo e avaliar outras entradas.",
          "A intervenção atende ao mecanismo sem prometer prazo não medido.",
        ],
        [
          "certeza",
          "Redução de 60% garante oxigênio de 8 mg/L no dia seguinte.",
          "Carga de entrada não determina sozinha concentração e recuperação.",
        ],
        [
          "agua",
          "Adicionar qualquer produto para matar todas as algas sem medir impactos.",
          "Essa ação não avalia benefícios, riscos ou matéria orgânica que será decomposta.",
        ],
      ],
      "monitorar",
      "Diferencie ensaio controlado e sistema aberto real.",
      "Os mesocosmos apoiam o mecanismo local. Intervenção em lagoa exige monitoramento, avaliação de múltiplas fontes e acompanhamento dos seres vivos.",
    ),
    conclusion:
      "Uma intervenção plausível precisa de mecanismo, comparação e monitoramento de efeitos e limites.",
    reflection: "Por que a carga externa pode cair sem melhora imediata de oxigênio?",
    transfer:
      "Ao avaliar um problema ambiental, combine medida de entrada, processos internos e resultados ao longo do tempo.",
  },
  {
    id: "biodiversidade-amostra",
    title: "Menos espécies ou menos procura?",
    focus: "Detecção, esforço e comparação de biodiversidade",
    context:
      "Um inventário rápido anuncia perda de biodiversidade entre duas áreas. Você verifica métodos e dados de uma nova campanha antes de recomendar ação.",
    mission: "Distinguir riqueza observada, detecção e proteção.",
    evidence: [
      evidence(
        "primeira",
        "Primeira campanha fictícia",
        "Área A: 8 espécies em uma visita pela manhã. Área B: 12 espécies em três visitas, em horários diferentes. Métodos e esforço não são equivalentes.",
      ),
      evidence(
        "padronizada",
        "Nova campanha",
        "Com três visitas em horários iguais e mesmo método: A registra 14 espécies, B registra 12. Ambas têm espécies exclusivas; não há estimativa de abundância ou histórico comparável.",
      ),
      evidence(
        "deteccao",
        "Limite de observação",
        "Não detectar uma espécie não prova ausência. Detecção depende de esforço, estação e método. Riqueza é número de espécies, não número total de indivíduos.",
      ),
    ],
    model: {
      title: "Teste o efeito da chance de detecção",
      expression: "Espécies detectadas esperadas = riqueza real × probabilidade de detecção",
      note: "Hipótese ilustrativa de 20 espécies reais com igual detecção, independência simplificada e identificação correta. Variar detecção não muda riqueza real. Não estima riqueza das áreas sem um modelo e dados próprios.",
      parameters: [parameter("deteccao", "Chance de detectar cada espécie", 20, 100, 10, 40, "%")],
      evaluate: ({ deteccao }) => [
        { label: "Riqueza real hipotética", value: 20, unit: "espécies" },
        { label: "Espécies detectadas esperadas", value: (20 * deteccao) / 100, unit: "espécies" },
        {
          label: "Espécies não detectadas esperadas",
          value: 20 * (1 - deteccao / 100),
          unit: "espécies",
        },
      ],
    },
    tasks: [
      numberTask(
        "modelo",
        "Com 20 espécies reais e detecção de 40%, quantas seriam detectadas em média?",
        8,
        "espécies",
        "Multiplique riqueza pela chance de detecção.",
        "20 × 0,4 = 8. Riqueza real permanece 20 no modelo; observação incompleta não implica extinção.",
      ),
      multiTask(
        "comparacao",
        "Quais duas informações são essenciais a uma comparação?",
        [
          [
            "esforco",
            "Esforço, horários, estação e método equivalentes ou modelados",
            "Detecção pode variar entre campanhas.",
          ],
          [
            "historico",
            "Histórico comparável e identidade das espécies",
            "Uma perda temporal exige referência e espécies exclusivas importam.",
          ],
          [
            "individuos",
            "Só o total de indivíduos, sem identificar espécies",
            "Abundância total não informa riqueza ou composição por si só.",
          ],
        ],
        ["esforco", "historico"],
        "A alegação é de perda; isso exige comparar tempos, além de áreas.",
        "Uma campanha espacial com esforço desigual não prova perda temporal. A composição também orienta conservação.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual parecer revisa a alegação e orienta cuidado?",
      [
        [
          "cautela",
          "A primeira comparação era limitada; padronizar mudou a riqueza observada. Proteger ambas e monitorar composição sem alegar extinção comprovada.",
          "A evidência e as espécies exclusivas foram consideradas.",
        ],
        [
          "perda",
          "8 contra 12 prova que A perdeu exatamente 4 espécies.",
          "Não há histórico temporal nem esforço equivalente.",
        ],
        [
          "descartar",
          "A tem 14 agora, então B não precisa de proteção.",
          "Riqueza maior em uma área não elimina espécies exclusivas e funções da outra.",
        ],
      ],
      "cautela",
      "Considere detecção e exclusividade, não só um ranking.",
      "A nova campanha melhora a comparação, mas não estabelece riqueza total ou tendência temporal. Monitoramento mantém a decisão aberta a novos dados.",
    ),
    conclusion:
      "Riqueza observada depende de detecção; decisões de conservação precisam de composição e métodos comparáveis.",
    reflection: "O que um histórico de visitas padronizadas acrescentaria?",
    transfer:
      "Ao ler inventários, confira esforço, unidade espacial, época, método, identificação e limites de ausência.",
  },
];
