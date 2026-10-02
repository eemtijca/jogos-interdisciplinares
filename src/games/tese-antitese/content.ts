import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "espaco-leitura",
    title: "Sala de leitura em debate",
    focus: "Responder a uma objeção com condição verificável",
    context:
      "O conselho escolar debate abrir a sala de leitura no almoço. O objetivo é ampliar acesso sem retirar o descanso de quem cuida do espaço.",
    mission: "Formule uma proposta que enfrente o custo de funcionamento.",
    evidence: [
      {
        id: "demanda",
        title: "Consulta às turmas",
        text: "Das 120 pessoas que responderam voluntariamente, 72 pediram acesso no almoço. A consulta não representa necessariamente toda a escola.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "equipe",
        title: "Escuta da equipe",
        text: "A pessoa responsável trabalha durante as aulas e precisa do intervalo para descanso. Não existe equipe adicional autorizada.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "alternativa",
        title: "Proposta do clube",
        text: "Dois adultos voluntários podem acompanhar um piloto em dois dias por semana, se houver aprovação da direção e combinados de cuidado.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "tese",
        kind: "choice",
        prompt: "Qual tese pode ser sustentada com o dossiê?",
        options: [
          {
            id: "total",
            label: "Abrir diariamente, pois a maioria de toda a escola quer.",
            feedback:
              "A amostra voluntária não autoriza falar de toda a escola, nem resolve a equipe.",
          },
          {
            id: "piloto",
            label: "Propor piloto em dois dias com acompanhamento aprovado e avaliar procura.",
            feedback: "A tese atende parte da demanda e assume a condição de funcionamento.",
          },
          {
            id: "fechar",
            label: "Não abrir nunca, pois descanso impede qualquer alternativa.",
            feedback:
              "A objeção identifica um limite de equipe, não impossibilidade de todo arranjo.",
          },
        ],
        answer: "piloto",
        hint: "Procure uma proposta que não transfira custo invisível para a equipe.",
        explanation: "Uma tese defensável contém ação, condição e critério de acompanhamento.",
      },
      {
        id: "replica",
        kind: "choice",
        prompt: 'Como responder à objeção "a equipe perderá o descanso"?',
        options: [
          {
            id: "escuta",
            label:
              "Concordar com a proteção do descanso e limitar o piloto ao acompanhamento aprovado.",
            feedback: "A réplica modifica a proposta diante de uma preocupação relevante.",
          },
          {
            id: "ataque",
            label: "Dizer que quem se opõe não gosta de leitura.",
            feedback: "Isso julga a pessoa sem responder ao problema de trabalho.",
          },
          {
            id: "numero",
            label: "Repetir as 72 respostas até encerrar a discussão.",
            feedback: "O número expressa demanda; não cria equipe.",
          },
        ],
        answer: "escuta",
        hint: "Uma resposta pode preservar o objetivo e revisar os meios.",
        explanation:
          "Responder à objeção requer enfrentar sua razão, não apenas reforçar a demanda.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual síntese deve ir à ata?",
      options: [
        {
          id: "ata",
          label:
            "Piloto em dois dias, condicionado a acompanhamento aprovado; avaliar acesso e carga de trabalho após um mês.",
          feedback: "A proposta incorpora demanda, descanso e um modo de revisão.",
        },
        {
          id: "vitoria",
          label: "Abrir imediatamente porque o argumento venceu.",
          feedback: "Debate não substitui autorização e condições materiais.",
        },
        {
          id: "promessa",
          label: "Prometer abertura diária sem registrar equipe.",
          feedback: "Uma promessa ignora a principal objeção.",
        },
      ],
      answer: "ata",
      hint: "Registre também o que poderá levar a revisar a proposta.",
      explanation:
        "A síntese é um acordo provisório fundamentado, com condições e responsabilidade.",
    },
    conclusion: "A posição inicial ficou mais precisa após a objeção sobre descanso.",
    reflection: "Que resultado do piloto justificaria ampliar ou reduzir os dias?",
    transfer:
      "Em um debate, separe objetivo comum, divergência sobre meios e condição para testar a proposta.",
  },
  {
    id: "verba-festa",
    title: "Festa e laboratório",
    focus: "Comparar argumentos financeiros e culturais",
    context:
      "Há R$ 10.000 para um projeto coletivo. Festa e laboratório apresentam propostas, mas uma divisão simples pode deixar os dois incompletos.",
    mission: "Examine mínimos de funcionamento antes de defender uma porcentagem.",
    evidence: [
      {
        id: "custos",
        title: "Planilha",
        text: "Festa completa: R$ 7.000. Festa reduzida e acessível: R$ 5.000. Kit de laboratório utilizável: R$ 4.000. Acessibilidade já incluída nos valores.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "cultura",
        title: "Depoimento da comissão",
        text: "A festa reúne famílias e grupos culturais. Redução exige renegociar atrações, mas mantém as atividades centrais.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "ciencia",
        title: "Plano de uso",
        text: "O kit serve a quatro turmas com rodízio. A equipe pede R$ 1.000 adicionais para manutenção, mas aceita reservar essa etapa para outra captação.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "planos",
        kind: "multi",
        prompt: "Quais duas propostas cabem no orçamento e têm funcionamento documentado?",
        options: [
          {
            id: "equilibrio",
            label: "Festa reduzida (R$ 5.000) + kit (R$ 4.000) + reserva (R$ 1.000).",
            feedback: "Os custos somam R$ 10.000 com os mínimos funcionais.",
          },
          {
            id: "setenta",
            label: "Festa completa (R$ 7.000) + laboratório com R$ 3.000.",
            feedback: "O laboratório ficaria abaixo do mínimo documentado de R$ 4.000.",
          },
          {
            id: "festa",
            label: "Festa completa (R$ 7.000) + reserva (R$ 3.000) para futuro kit.",
            feedback: "Cabe no orçamento, mas adia o laboratório; esse custo precisa ser assumido.",
          },
          {
            id: "ambos",
            label: "Festa completa + kit + manutenção por R$ 10.000.",
            feedback: "A soma real é R$ 12.000.",
          },
        ],
        answer: ["equilibrio", "festa"],
        hint: "Viabilidade e preferência não são a mesma coisa.",
        explanation: "Mais de um plano pode ser viável; o debate compara efeitos e prioridades.",
      },
      {
        id: "objecao",
        kind: "choice",
        prompt: "A comissão teme perder o valor cultural. Qual réplica aborda a preocupação?",
        options: [
          {
            id: "tratar",
            label: "Examinar com a comissão quais atrações centrais sobrevivem à festa reduzida.",
            feedback: "A réplica verifica a consequência cultural da divisão proposta.",
          },
          {
            id: "desprezar",
            label: "Chamar a festa de supérflua.",
            feedback: "Desqualifica um valor coletivo sem examinar a alternativa.",
          },
          {
            id: "porcento",
            label: "Dizer que qualquer divisão 50/50 sempre é justa.",
            feedback: "Percentuais não garantem funcionamento nem equidade.",
          },
        ],
        answer: "tratar",
        hint: "Avalie o que o corte muda, além de quanto economiza.",
        explanation: "Argumentos qualitativos e quantitativos cumprem papéis diferentes.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt:
        "O conselho prioriza realizar ambas as atividades agora. Que proposta atende a esse critério?",
      options: [
        {
          id: "plano",
          label:
            "Festa reduzida + kit, com R$ 1.000 de reserva e validação das atividades culturais mantidas.",
          feedback: "É viável e explicita a negociação exigida para preservar o valor cultural.",
        },
        {
          id: "fixa",
          label: "Divisão 70/30, sem alterar o plano do laboratório.",
          feedback: "O kit continua inviável neste dossiê.",
        },
        {
          id: "adiar",
          label: "Só festa completa, sem explicar adiamento do laboratório.",
          feedback:
            "Pode ser uma escolha política, mas não atende ao critério adotado de fazer ambas agora.",
        },
      ],
      answer: "plano",
      hint: "A decisão é condicionada ao critério anunciado pelo conselho.",
      explanation:
        "Não existe proporção automaticamente justa. Aqui, custos mínimos e critério público sustentam a proposta.",
    },
    conclusion: "A síntese combinou viabilidade, prioridade e negociação cultural.",
    reflection:
      "Se o conselho priorizasse a festa completa, que consequência deveria registrar com honestidade?",
    transfer: "Ao discutir uma verba, compare mínimos, efeitos do corte e critérios de prioridade.",
  },
  {
    id: "passe-prova",
    title: "Transporte e frequência",
    focus: "Reconhecer limite causal e negociar uma política",
    context:
      "Uma consulta fictícia debate apoio ao transporte estudantil. Os participantes apresentam dados, custos e experiências.",
    mission: "Defenda uma medida sem prometer eliminar faltas que têm causas distintas.",
    evidence: [
      {
        id: "faltas",
        title: "Levantamento",
        text: "Em 100 faltas a avaliações, 20 estudantes citaram transporte; 15 dessas pessoas também citaram trabalho ou cuidado familiar. Respostas permitem causas combinadas.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "custos",
        title: "Estimativa",
        text: "Piloto em dias de avaliação: R$ 12.000. Apoio mensal por critério de necessidade: R$ 30.000. Orçamento inicial disponível: R$ 15.000.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "voz",
        title: "Escuta estudantil",
        text: "Uma representante lembra que aprender também exige presença nos dias comuns. Pede que um piloto restrito não vire solução permanente sem avaliação.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "efeito",
        kind: "choice",
        prompt: "Qual previsão é compatível com o levantamento?",
        options: [
          {
            id: "garantia",
            label: "O passe eliminará exatamente 20 faltas.",
            feedback: "Causas podem ser combinadas; oferecer transporte não garante presença.",
          },
          {
            id: "potencial",
            label:
              "O apoio pode reduzir uma barreira relatada; é preciso observar a presença depois.",
            feedback: "A inferência identifica potencial sem prometer um efeito causal já medido.",
          },
          {
            id: "zero",
            label: "O transporte não importa porque há outras causas.",
            feedback: "Causas combinadas não tornam uma barreira irrelevante.",
          },
        ],
        answer: "potencial",
        hint: "Diferencie motivo relatado de efeito medido de uma intervenção.",
        explanation: "Os dados orientam uma hipótese; a avaliação posterior testa seus efeitos.",
      },
      {
        id: "avaliacao",
        kind: "order",
        prompt: "Organize uma avaliação do piloto.",
        options: [
          {
            id: "criterio",
            label: "Definir público, calendário e indicador de presença.",
            feedback: "O critério precisa existir antes de julgar o resultado.",
          },
          {
            id: "registro",
            label: "Registrar uso do apoio e barreiras que permaneceram.",
            feedback: "Observar só quem usou o passe oculta outros problemas.",
          },
          {
            id: "revisao",
            label: "Comparar resultados e ouvir estudantes para decidir continuação.",
            feedback: "A revisão integra dados e experiências.",
          },
        ],
        answer: ["criterio", "registro", "revisao"],
        hint: "Planeje como saber se a medida ajudou antes de executá-la.",
        explanation: "Uma política avaliável explicita objetivo e limites.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Que posição responde ao orçamento e à objeção estudantil?",
      options: [
        {
          id: "piloto",
          label:
            "Piloto de R$ 12.000 em avaliações, com revisão, escuta e estudo de ampliação para dias comuns.",
          feedback: "Cabe na verba e reconhece a limitação do recorte.",
        },
        {
          id: "amplo",
          label: "Prometer apoio mensal imediato de R$ 30.000 sem financiamento.",
          feedback:
            "O objetivo pode ser defendido, mas a execução não cabe no orçamento apresentado.",
        },
        {
          id: "final",
          label: "Declarar que apoio em prova resolveu definitivamente a evasão.",
          feedback: "O dossiê não mede evasão nem garante efeito permanente.",
        },
      ],
      answer: "piloto",
      hint: "Responda à conta sem apagar a importância da aprendizagem diária.",
      explanation:
        "A tese incorpora uma etapa viável e não transforma restrição inicial em ideal universal.",
    },
    conclusion: "A proposta assumiu seu alcance e criou um caminho de revisão.",
    reflection:
      "Que evidência poderia justificar ampliar o apoio, mesmo se a primeira avaliação não mostrar redução clara?",
    transfer:
      "Ao defender uma intervenção, explique recurso, público, hipótese de efeito e forma de avaliação.",
  },
];
