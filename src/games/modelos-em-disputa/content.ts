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
    id: "crescimento",
    title: "Duas regras, um dado novo",
    focus: "Modelos linear e exponencial, validação e extrapolação",
    context:
      "Uma cultura virtual de microrganismos cresce. Você compara duas regras candidatas com uma medição reservada para validar a previsão.",
    mission: "Escolher o modelo mais compatível com dados sem prometer crescimento infinito.",
    evidence: [
      evidence(
        "ajuste",
        "Dados para ajuste",
        "Índice de população: t = 0 h, 100; t = 1 h, 120; t = 2 h, 144. Índice contínuo proporcional à população, não contagem inteira de organismos.",
      ),
      evidence(
        "modelos",
        "Regras candidatas",
        "Linear: L(t) = 100 + 20t. Exponencial: E(t) = 100 × 1,2^t. As duas coincidem em t = 0 e t = 1.",
      ),
      evidence(
        "validacao",
        "Dado reservado",
        "Em t = 3 h, índice medido 173 ±1. Nutrientes são finitos; nenhum dado após 3 h está disponível. As medições são fictícias.",
      ),
    ],
    model: {
      title: "Teste divergência e dado reservado",
      expression: "L(t) = 100 + 20t; E(t) = 100 × 1,2^t",
      note: "Compare previsões em 3 h e depois extrapole até 10 h para examinar divergência. Não modela limitação de recursos, mortalidade ou capacidade de suporte; não prevê crescimento real indefinido.",
      parameters: [parameter("tempo", "Tempo", 0, 10, 1, 3, "h")],
      evaluate: ({ tempo }) => [
        { label: "Índice linear", value: round(100 + 20 * tempo), unit: "índice" },
        { label: "Índice exponencial", value: round(100 * 1.2 ** tempo), unit: "índice" },
        {
          label: "Dados disponíveis",
          value: tempo <= 3 ? "Intervalo observado" : "Extrapolação sem validação",
          unit: "",
        },
      ],
    },
    tasks: [
      numberTask(
        "exponencial",
        "Qual previsão exponencial em t = 3 h?",
        172.8,
        "índice",
        "Multiplique 100 por 1,2³.",
        "100 × 1,2³ = 172,8, dentro de 172 a 174. A linear prevê 160, fora do intervalo.",
      ),
      numberTask(
        "residuo",
        "Qual resíduo observado menos previsto do modelo linear em 3 h, usando valor central 173?",
        13,
        "índice",
        "L(3) = 100 + 20 × 3.",
        "173 − 160 = 13. O modelo exponencial tem resíduo 0,2; essa comparação usa um dado não empregado nos primeiros dois pontos.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual parecer é sustentado?",
      [
        [
          "local",
          "O exponencial é mais compatível até 3 h; prever além exige novos dados e limites de recursos.",
          "Validação e domínio foram distinguidos.",
        ],
        [
          "linear",
          "As duas regras são equivalentes porque coincidem em dois pontos.",
          "Um terceiro dado distingue as regras.",
        ],
        [
          "infinito",
          "O ajuste prova crescimento exponencial ilimitado.",
          "Recursos finitos e ausência de dados futuros limitam a previsão.",
        ],
      ],
      "local",
      "Valide com dados novos e declare o intervalo.",
      "Menor erro no dado reservado favorece a hipótese exponencial local. Não prova uma lei universal nem permanência da taxa.",
    ),
    conclusion: "Escolha de modelo requer ajuste, validação independente e revisão das hipóteses.",
    reflection: "Qual padrão futuro indicaria saturação?",
    transfer:
      "Ao comparar projeções, separe dados usados para ajustar e para validar, e indique incerteza de extrapolação.",
  },
  {
    id: "producao",
    title: "O melhor plano precisa caber",
    focus: "Otimização com duas restrições",
    context:
      "Uma oficina didática produz dois kits. Você avalia planos de produção considerando dois recursos e margem, sem confundir maior venda e melhor resultado viável.",
    mission: "Encontrar o melhor candidato e conferir todas as restrições.",
    evidence: [
      evidence(
        "recursos",
        "Recursos fictícios",
        "Disponíveis: 40 unidades de material e 50 unidades de trabalho. Kit A usa 2 de material e 1 de trabalho; B usa 1 de material e 2 de trabalho.",
      ),
      evidence(
        "margem",
        "Modelo de contribuição",
        "A contribui R$ 30 e B R$ 40. x e y são quantidades inteiras não negativas; margem total = 30x + 40y. Custos fixos não entram nesta comparação.",
      ),
      evidence(
        "candidatos",
        "Planos a comparar",
        "(x,y): (20,0), (0,25), (10,20), (15,20). Restrições: 2x + y ≤ 40; x + 2y ≤ 50. Demanda hipoteticamente suficiente.",
      ),
    ],
    model: {
      title: "Teste planos contra as duas restrições",
      expression: "Maximizar 30x + 40y; 2x + y ≤ 40; x + 2y ≤ 50",
      note: "Modelo linear com recursos fixos, margem constante e demanda suficiente. O resultado de um plano inviável é só cálculo hipotético; não pode ser realizado. Tarefas usam os candidatos registrados.",
      parameters: [
        parameter("a", "Quantidade A", 0, 25, 1, 10, "kits"),
        parameter("b", "Quantidade B", 0, 30, 1, 20, "kits"),
      ],
      evaluate: ({ a, b }) => [
        { label: "Material usado", value: 2 * a + b, unit: "de 40 unidades" },
        { label: "Trabalho usado", value: a + 2 * b, unit: "de 50 unidades" },
        { label: "Margem calculada", value: 30 * a + 40 * b, unit: "R$" },
        {
          label: "Viabilidade",
          value: 2 * a + b <= 40 && a + 2 * b <= 50 ? "Viável" : "Inviável",
          unit: "",
        },
      ],
    },
    tasks: [
      numberTask(
        "intersecao",
        "Se os dois recursos forem usados sem folga, qual quantidade x de kits A resolve 2x + y = 40 e x + 2y = 50?",
        10,
        "kits A",
        "Da primeira igualdade, y = 40 − 2x. Substitua na segunda.",
        "x + 2(40 − 2x) = 50; −3x = −30, logo x = 10 e y = 20. A margem é 30 × 10 + 40 × 20 = R$ 1.100. As duas restrições precisam valer simultaneamente.",
      ),
      multiTask(
        "viaveis",
        "Selecione todos os candidatos viáveis.",
        [
          ["a", "(20,0)", "Usa 40 de material e 20 de trabalho."],
          ["b", "(0,25)", "Usa 25 de material e 50 de trabalho."],
          ["misto", "(10,20)", "Usa 40 de material e 50 de trabalho."],
          ["excesso", "(15,20)", "Usa 50 de material e 55 de trabalho, acima dos dois limites."],
        ],
        ["a", "b", "misto"],
        "Verifique as duas desigualdades em cada par.",
        "Planos podem respeitar uma restrição e violar outra; as duas devem valer simultaneamente.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual plano tem maior margem entre os candidatos viáveis?",
      [
        [
          "misto",
          "(10,20): R$ 1.100, respeitando ambos os limites.",
          "Supera R$ 600 e R$ 1.000 dos outros candidatos viáveis.",
        ],
        [
          "excesso",
          "(15,20): R$ 1.250 porque é o maior número mostrado.",
          "A margem de um plano inviável não pode ser realizada.",
        ],
        [
          "unico",
          "(0,25): B sempre deve ocupar tudo por ter maior margem unitária.",
          "Margem unitária não considera simultaneamente os consumos dos recursos.",
        ],
      ],
      "misto",
      "Compare só depois de conferir viabilidade.",
      "O plano misto é melhor entre os candidatos. No modelo contínuo, vértices (0,0), (20,0), (10,20), (0,25) também mostram o máximo de R$ 1.100; o ótimo é inteiro.",
    ),
    conclusion:
      "A recomendação de produção depende de recursos, demanda, custos incluídos e viabilidade.",
    reflection:
      "Que restrição deveria ser revista se o trabalho disponível caísse para 45 unidades?",
    transfer:
      "Ao otimizar outro plano, escreva objetivo e restrições separadamente e teste sensibilidade antes de recomendar.",
  },
  {
    id: "reserva-agua",
    title: "Um plano para chuva incerta",
    focus: "Unidades, capacidade e decisão robusta",
    context:
      "Uma oficina quer três dias de autonomia em um reservatório. Você compara um plano que depende de chuva e outro que reduz a demanda no cenário seco.",
    mission: "Transformar precipitação em volume e testar um cenário desfavorável.",
    evidence: [
      evidence(
        "coleta",
        "Coleta hipotética",
        "Telhado de 50 m²; eficiência de coleta de 80%. 1 mm de chuva sobre 1 m² corresponde a 1 L. Previsão de 10 mm, sem garantia.",
      ),
      evidence(
        "tanque",
        "Limite físico",
        "Reservatório de 300 L, inicialmente com 200 L. Chuva entra antes do consumo; excedente transborda. Não é simulado tratamento de água nem uso potável.",
      ),
      evidence(
        "demanda",
        "Planos",
        "Demanda atual 80 L/dia. Plano de economia 60 L/dia. Meta: pelo menos 3 dias completos, incluindo cenário sem chuva.",
      ),
    ],
    model: {
      title: "Teste a previsão e o cenário seco",
      expression:
        "Coleta = 50 × chuva × 0,8; disponível = min(300, 200 + coleta); dias = piso(disponível/demanda)",
      note: "Chuva em mm e volume em L. Sem evaporação, vazamento ou água potável; capacidade impede acumular todo volume. Teste 0 e 10 mm com demandas 80 e 60. Tarefas usam os cenários de referência.",
      parameters: [
        parameter("chuva", "Chuva", 0, 20, 0.5, 10, "mm"),
        parameter("demanda", "Demanda diária", 40, 100, 5, 80, "L/dia"),
      ],
      evaluate: ({ chuva, demanda }) => {
        const coleta = 40 * chuva;
        const volume = Math.min(300, 200 + coleta);
        return [
          { label: "Coleta antes de transbordo", value: coleta, unit: "L" },
          { label: "Volume disponível", value: volume, unit: "L" },
          { label: "Transbordo", value: Math.max(0, 200 + coleta - 300), unit: "L" },
          { label: "Dias completos", value: Math.floor(volume / demanda), unit: "dias" },
        ];
      },
    },
    tasks: [
      numberTask(
        "coleta",
        "Com 10 mm, qual volume coletado antes do transbordo?",
        400,
        "L",
        "Multiplique área, precipitação em L/m² e eficiência.",
        "50 × 10 × 0,8 = 400 L. Com 200 L iniciais, 300 L transbordam e restam 300 L no tanque.",
      ),
      numberTask(
        "seco",
        "Sem chuva e consumindo 80 L/dia, quantos dias completos são atendidos?",
        2,
        "dias",
        "Divida 200 por 80 e conte apenas dias completos.",
        "200/80 = 2,5 dias; são 2 dias completos. O terceiro exigiria mais 40 L.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual plano atinge 3 dias também no cenário seco modelado?",
      [
        [
          "economia",
          "Reduzir a demanda a 60 L/dia: 200 L atendem 3 dias completos sem chuva.",
          "3 × 60 = 180 L, com margem de 20 L.",
        ],
        [
          "previsao",
          "Manter 80 L/dia porque previsão de chuva é garantia.",
          "Sem chuva, a meta falha.",
        ],
        [
          "volume",
          "Contar 600 L disponíveis após a chuva de 10 mm.",
          "O reservatório só comporta 300 L.",
        ],
      ],
      "economia",
      "Teste o cenário seco e a capacidade antes de confiar na previsão.",
      "O plano de economia atende a meta nos cenários modelados, condicionado a demanda, ausência de perdas e volume inicial. Não demonstra qualidade sanitária da água.",
    ),
    conclusion: "Uma decisão robusta explicita cenário desfavorável, margem e limites físicos.",
    reflection: "Que perda diária eliminaria a margem do plano de economia?",
    transfer:
      "Em outro planejamento, compare cenários, capacidade e incerteza, evitando transformar previsão em certeza.",
  },
];
