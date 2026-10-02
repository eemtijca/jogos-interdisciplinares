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
    id: "tempo-tipico",
    title: "Qual tempo representa o grupo?",
    focus: "Mediana, média, dispersão e valor extremo",
    context:
      "Um relatório anuncia o tempo típico de acesso ao material digital. Você examina uma lista pequena antes de recomendar uma medida e um gráfico.",
    mission: "Comparar centro e dispersão preservando a informação sobre um atraso grande.",
    evidence: [
      evidence(
        "tempos",
        "Cinco acessos fictícios",
        "Tempos em minutos: 8, 9, 10, 11 e 42. O valor 42 foi confirmado, sem registro de falha na medição.",
      ),
      evidence(
        "anuncio",
        "Título do relatório",
        "'O acesso típico leva 16 minutos'. O gráfico usa barras com eixo vertical de 8 a 42 min, sem indicação de corte de escala.",
      ),
      evidence(
        "criterios",
        "Perguntas de análise",
        "A equipe quer descrever o centro e os atrasos. Um valor extremo pode influenciar a média; excluir um valor verdadeiro exige outra justificativa.",
      ),
    ],
    model: {
      title: "Teste o efeito de um atraso extremo",
      expression: "Média = (8 + 9 + 10 + 11 + x)/5; mediana = 10 para x ≥ 11",
      note: "Quatro registros fixos e um atraso variável. Mude o último valor para verificar sensibilidade. Modelo de uma lista, sem inferência para toda a escola; tarefas usam x = 42.",
      parameters: [parameter("extremo", "Quinto tempo", 11, 60, 1, 42, "min")],
      evaluate: ({ extremo }) => [
        { label: "Média", value: round((38 + extremo) / 5), unit: "min" },
        { label: "Mediana", value: 10, unit: "min" },
        { label: "Amplitude", value: extremo - 8, unit: "min" },
      ],
    },
    tasks: [
      numberTask(
        "mediana",
        "Qual a mediana dos cinco tempos de referência?",
        10,
        "min",
        "Ordene a lista e procure o terceiro valor.",
        "8, 9, 10, 11, 42 têm mediana 10. A média é 80/5 = 16 min; ambas são corretas, mas descrevem aspectos diferentes.",
      ),
      numberTask(
        "amplitude",
        "Qual amplitude dos tempos?",
        34,
        "min",
        "Subtraia menor tempo do maior.",
        "42 − 8 = 34 min. Relatar somente o centro oculta a variação e o atraso confirmado.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual revisão comunica melhor os dados?",
      [
        [
          "duas",
          "Informar mediana 10, média 16 e amplitude 34 min; preservar 42 e explicitar a escala do gráfico.",
          "Centro, variação e representação ficam transparentes.",
        ],
        [
          "apagar",
          "Apagar 42 para a média ficar próxima de 10.",
          "Um valor confirmado não pode ser removido apenas por contrariar a narrativa.",
        ],
        [
          "unica",
          "Dizer que todos levam 16 min porque a média é 16.",
          "Uma média não é o tempo de cada pessoa.",
        ],
      ],
      "duas",
      "A medida precisa responder à pergunta sem esconder dispersão.",
      "A mediana descreve o centro menos sensível ao extremo; a média e a amplitude tornam visível seu efeito. Escala truncada precisa identificação.",
    ),
    conclusion: "Uma medida isolada pode ser numericamente correta e comunicar mal a distribuição.",
    reflection: "Que pergunta seria melhor respondida pela média do que pela mediana?",
    transfer:
      "Em outro relatório, confira lista, fonte, unidade, extremos e eixo do gráfico antes de repetir 'típico'.",
  },
  {
    id: "amostra-turnos",
    title: "Quem entrou na pesquisa?",
    focus: "Viés amostral, estratos e ponderação",
    context:
      "Uma enquete voluntária concentra respostas do turno diurno. Você precisa avaliar uma conclusão sobre a escola inteira e usar outra amostra com cautela.",
    mission: "Distinguir porcentagem da amostra e estimativa ponderada da população.",
    evidence: [
      evidence(
        "populacao",
        "Escola fictícia",
        "600 estudantes: 400 diurnos e 200 noturnos. Pergunta: 'Há acesso estável à internet fora da escola?' Nenhum dado pessoal real é usado.",
      ),
      evidence(
        "voluntaria",
        "Enquete online",
        "90 respostas diurnas e 10 noturnas. A enquete voluntária registrou 78 respostas 'sim' em 100 e foi anunciada como 78% da escola.",
      ),
      evidence(
        "estratos",
        "Amostra planejada didática",
        "Sorteio por turno: 40 diurnos, com 32 'sim'; 20 noturnos, com 8 'sim'. Mesmo método de pergunta e acompanhamento de não resposta. Taxas observadas: 80% e 40%.",
      ),
    ],
    model: {
      title: "Teste como a composição muda a estimativa",
      expression: "Estimativa ponderada = w × 80% + (1 − w) × 40%; w = diurnos/600",
      note: "Total de 600 estudantes; variar diurnos altera o número de noturnos para manter esse total. Taxas amostrais fixas, sem intervalo de confiança. Ponderar não elimina não resposta ou erro de medida. Tarefas usam 400 diurnos e 200 noturnos.",
      parameters: [
        parameter("diurno", "Estudantes diurnos (total 600)", 0, 600, 100, 400, "estudantes"),
      ],
      evaluate: ({ diurno }) => [
        {
          label: "Estimativa ponderada de acesso",
          value: round((diurno / 600) * 80 + (1 - diurno / 600) * 40),
          unit: "%",
        },
        { label: "Estimativa se pesos fossem iguais", value: 60, unit: "%" },
      ],
    },
    tasks: [
      numberTask(
        "estimativa",
        "Com pesos 400/600 e 200/600, qual estimativa ponderada de acesso? Arredonde a duas casas.",
        66.67,
        "%",
        "Multiplique 80% por 2/3 e 40% por 1/3.",
        "(2/3) × 80 + (1/3) × 40 = 66,67%. É estimativa amostral, não um censo nem um valor sem erro.",
      ),
      multiTask(
        "limites",
        "Quais dois limites precisam aparecer no relatório?",
        [
          [
            "voluntaria",
            "A enquete voluntária pode ter viés de cobertura e adesão",
            "Quem não tem acesso pode nem alcançar o formulário.",
          ],
          [
            "incerteza",
            "A amostra sorteada ainda tem incerteza e não resposta a examinar",
            "Planejamento melhora a evidência, mas não produz certeza.",
          ],
          [
            "tamanho",
            "100 respostas voluntárias garantem representatividade",
            "Quantidade não corrige automaticamente seleção enviesada.",
          ],
        ],
        ["voluntaria", "incerteza"],
        "Pergunte quem teve oportunidade e motivo para responder.",
        "Representatividade depende do desenho e da execução, além do tamanho da amostra.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual conclusão é defensável para planejar acesso?",
      [
        [
          "planejada",
          "Usar 66,67% como estimativa da amostra planejada, relatar limites e investigar não resposta, sem tratar 78% voluntário como censo.",
          "A população e o desenho foram considerados.",
        ],
        [
          "maior",
          "Preferir 78% só porque 100 respostas superam 60.",
          "Mais respostas enviesadas não garantem estimativa melhor.",
        ],
        [
          "sessenta",
          "Usar média simples 60% porque os turnos são dois.",
          "Os turnos têm tamanhos diferentes; seus pesos não são 50% cada.",
        ],
      ],
      "planejada",
      "Compare desenho e pesos, não só tamanho.",
      "A estimativa ponderada é mais adequada ao desenho declarado; uma política ainda deve considerar quem ficou sem acesso e a incerteza.",
    ),
    conclusion: "Amostra, população e pesos precisam aparecer junto da estimativa.",
    reflection: "Como investigar estudantes que não responderam sem coletar dados desnecessários?",
    transfer:
      "Em outra enquete, declare população-alvo, recrutamento, tamanho por grupo e limites de generalização.",
  },
  {
    id: "causa-resultados",
    title: "A melhora veio de quê?",
    focus: "Comparação, confundimento e desenho experimental",
    context:
      "Uma ferramenta de estudo foi oferecida a quem quis aderir. Um anúncio atribui a ela todo o ganho de notas. Você compara os grupos e prepara uma conclusão proporcional à evidência.",
    mission: "Calcular mudanças e distinguir associação de efeito causal.",
    evidence: [
      evidence(
        "grupos",
        "Grupos fictícios",
        "Adesão voluntária. Grupo A usou a ferramenta: média inicial 70, final 80. Grupo B não usou: inicial 50, final 60. Mesma escala de 0 a 100.",
      ),
      evidence(
        "contexto",
        "Condições",
        "Não houve sorteio da intervenção; motivação, acesso e estudo extra não foram medidos. Ambos os grupos tiveram revisão comum antes da avaliação final.",
      ),
      evidence(
        "anuncio",
        "Alegação",
        "'A ferramenta causou vantagem de 20 pontos'. O anúncio compara só as médias finais e não menciona a diferença inicial nem a seleção dos grupos.",
      ),
    ],
    model: {
      title: "Teste a diferença entre nível final e mudança",
      expression:
        "Ganho A = final A − 70; ganho B = final B − 50; diferença de ganhos = ganho A − ganho B",
      note: "Variações hipotéticas de médias finais. Diferença de ganhos não estabelece causalidade sozinha; pressupostos e comparabilidade ainda importam. Tarefas usam finais 80 e 60.",
      parameters: [
        parameter("finalA", "Média final A", 60, 100, 1, 80, "pontos"),
        parameter("finalB", "Média final B", 40, 80, 1, 60, "pontos"),
      ],
      evaluate: ({ finalA, finalB }) => [
        { label: "Diferença de médias finais", value: finalA - finalB, unit: "pontos" },
        { label: "Ganho A", value: finalA - 70, unit: "pontos" },
        { label: "Diferença de ganhos", value: finalA - 70 - (finalB - 50), unit: "pontos" },
      ],
    },
    tasks: [
      numberTask(
        "ganhos",
        "Qual a diferença de ganhos (A menos B) nos registros?",
        0,
        "pontos",
        "Calcule os dois ganhos antes de subtrair.",
        "A ganhou 80 − 70 = 10; B ganhou 60 − 50 = 10. Diferença de ganhos = 0, embora os níveis finais difiram em 20.",
      ),
      multiTask(
        "desenho",
        "Quais duas ações fortaleceriam a investigação de efeito?",
        [
          [
            "sorteio",
            "Sortear a oferta entre participantes elegíveis, com condições comparáveis",
            "Design planejado reduz viés de seleção e confundimento em média.",
          ],
          [
            "medir",
            "Registrar medidas comparáveis antes e depois e perdas de acompanhamento",
            "Ajuda a conferir grupos, mudança e dados ausentes.",
          ],
          [
            "excluir",
            "Excluir o grupo B por ter começado com nota menor",
            "Isso removeria a comparação sem resolver a inferência.",
          ],
        ],
        ["sorteio", "medir"],
        "Pense no contrafactual e em como os grupos foram formados.",
        "Um desenho ético e planejado distingue intervenção e seleção; nenhum procedimento dispensa análise de adesão, perdas e contexto.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual texto substitui a alegação do anúncio?",
      [
        [
          "associacao",
          "Os grupos terminaram diferentes, mas ambos ganharam 10 pontos; os dados não isolam efeito causal da ferramenta.",
          "A diferença inicial e a adesão voluntária foram consideradas.",
        ],
        [
          "causa",
          "A diferença final prova efeito causal de 20 pontos.",
          "A diferença de 20 já existia no início.",
        ],
        [
          "ineficaz",
          "Diferença de ganhos zero prova que a ferramenta é inútil em todo contexto.",
          "Este desenho limitado não demonstra eficácia nem ausência universal de efeito.",
        ],
      ],
      "associacao",
      "Ajustar uma comparação não elimina todos os fatores não medidos.",
      "Os registros não sustentam o efeito de 20 pontos atribuído à ferramenta. Um estudo melhor pode produzir outra conclusão.",
    ),
    conclusion:
      "Uma diferença entre grupos não identifica automaticamente a causa dessa diferença.",
    reflection: "Por que uma comparação antes e depois ainda pode ter confundimento?",
    transfer:
      "Ao ler uma alegação de efeito, confira recrutamento, comparação inicial, intervenção, perdas e limites.",
  },
];
