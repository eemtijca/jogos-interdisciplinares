import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Regras e dados dos conselhos são ficcionais e não descrevem legislação. */
export const CASES: InvestigationCase[] = [
  {
    id: "regra-da-maioria",
    title: "O voto e as condições de participar",
    focus: "Maioria, inclusão e legitimidade",
    context:
      "Um conselho fictício escolhe como usar um salão. A proposta mais votada concentra eventos à noite; um grupo não consegue participar.",
    mission: "Compare o resultado da votação e as condições reais de participação.",
    evidence: [
      {
        id: "votos",
        title: "Votação",
        text: "60 votos pelo uso noturno exclusivo; 40 por horários mistos. A consulta ocorreu apenas no aplicativo usado por parte da comunidade.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "barreiras",
        title: "Escuta posterior",
        text: "Pessoas com cuidado familiar ou sem transporte noturno relatam dificuldade. Algumas não conseguiram votar no aplicativo.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "pacto",
        title: "Critérios do exercício",
        text: "Garantir oportunidade de participação, justificar decisões e admitir revisão. Regras do conselho fictício, não descrição de lei ou constituição.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "alcance",
        kind: "choice",
        prompt: "Que limite do resultado precisa ser examinado?",
        options: [
          {
            id: "recorte",
            label:
              "Os votos expressam preferência de participantes; o canal pode ter excluído outras pessoas.",
            feedback: "A contagem não mede quem não teve acesso.",
          },
          {
            id: "invalido",
            label: "Toda votação com divergência deve ser descartada.",
            feedback: "Divergência é parte da deliberação, não invalida a coleta por si só.",
          },
          {
            id: "total",
            label: "Sessenta votos comprovam que toda a comunidade participou.",
            feedback: "Quantidade não demonstra universalidade ou condição de acesso.",
          },
        ],
        answer: "recorte",
        hint: "Conte votos e examine como as pessoas chegaram à votação.",
        explanation:
          "Legitimidade envolve procedimento e oportunidade de participação, além do placar.",
      },
      {
        id: "ajustes",
        kind: "multi",
        prompt: "Quais duas medidas atendem aos critérios do pacto?",
        options: [
          {
            id: "canais",
            label: "Oferecer outro canal e horário de manifestação.",
            feedback: "Enfrenta acesso ao procedimento.",
          },
          {
            id: "razoes",
            label: "Divulgar justificativa e estudar horários para diferentes usos.",
            feedback: "Incorpora razões e consequências.",
          },
          {
            id: "excluir",
            label: "Excluir a opinião de quem perdeu a votação.",
            feedback: "Nega participação futura e revisão.",
          },
          {
            id: "unanimidade",
            label: "Exigir acordo total antes de qualquer uso.",
            feedback: "Pode paralisar sem resolver barreiras; o pacto não exige unanimidade.",
          },
        ],
        answer: ["canais", "razoes"],
        hint: "Enfrente o problema do procedimento e o problema de uso.",
        explanation: "Uma decisão pode manter desacordo e ainda explicar critérios e revisão.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual encaminhamento deve preceder a regra definitiva?",
      options: [
        {
          id: "reabrir",
          label:
            "Ampliar escuta por canais acessíveis e negociar um teste de horários, explicando a revisão aos votantes.",
          feedback: "Responde à exclusão sem esconder o resultado.",
        },
        {
          id: "manter",
          label: "Aplicar uso exclusivo sem ouvir quem não conseguiu votar.",
          feedback: "Mantém a barreira contrária ao critério de participação.",
        },
        {
          id: "trocar",
          label: "Entregar a decisão só ao grupo dos quarenta votos.",
          feedback: "Troca um grupo por outro sem ampliar participação.",
        },
      ],
      answer: "reabrir",
      hint: "Revise a condição que limita a representação da consulta.",
      explanation:
        "A resposta decorre do pacto e da barreira demonstrada, não da rejeição de qualquer maioria.",
    },
    conclusion: "A votação passou a integrar uma deliberação com acesso e revisão.",
    reflection: "Como explicar a reabertura sem esconder o resultado inicial?",
    transfer:
      "Em uma consulta, observe canal, horário, critério, justificativa e como apresentar contestação.",
  },
  {
    id: "verba-e-direitos",
    title: "Popularidade e necessidades no orçamento",
    focus: "Distribuição, critérios e custo de oportunidade",
    context:
      "Há R$ 100 mil no orçamento participativo fictício. O conselho prioriza remover barreiras e enfrentar falta de serviço essencial.",
    mission:
      "Avalie propostas pelos critérios anunciados, sem tratar uma consulta como retrato de toda a população.",
    evidence: [
      {
        id: "propostas",
        title: "Custos e necessidades",
        text: "A: reparar rede de água com interrupções, R$ 60 mil. B: rota acessível ao posto, R$ 40 mil. C: iluminação ornamental do centro, R$ 70 mil.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "consulta",
        title: "Preferências coletadas",
        text: "Aplicativo: 700 votos para C, 200 para A, 100 para B. A e B têm menor acesso ao aplicativo. Não se contou quem deixou de votar.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "ata",
        title: "Critérios do exercício",
        text: "Necessidade identificada, acesso e viabilidade. A popularidade é informação relevante; o conselho deve explicar sua relação com esses critérios.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "pacote",
        kind: "choice",
        prompt: "Qual pacote cabe na verba e atende diretamente às duas prioridades?",
        options: [
          {
            id: "ab",
            label: "A + B, rede de água e rota acessível.",
            feedback: "Soma R$ 100 mil e enfrenta serviço e acesso registrados.",
          },
          {
            id: "c",
            label: "Somente C, seguindo o maior placar.",
            feedback: "É viável financeiramente, mas não atende diretamente às duas prioridades.",
          },
          {
            id: "cb",
            label: "C + B, iluminação e rota.",
            feedback: "Soma R$ 110 mil e ultrapassa a verba.",
          },
        ],
        answer: "ab",
        hint: "Compare custo mínimo e efeito esperado, além do placar.",
        explanation:
          "A resposta esperada está condicionada aos critérios declarados, não a uma preferência universal.",
      },
      {
        id: "critica",
        kind: "choice",
        prompt: "Qual crítica ao pacote A + B exige resposta?",
        options: [
          {
            id: "justificar",
            label: "É preciso explicar a divergência do placar e ampliar a escuta dos bairros.",
            feedback: "Uma decisão por critérios deve prestar contas da relação com a consulta.",
          },
          {
            id: "placar",
            label: "O maior número de votos elimina qualquer necessidade de justificativa.",
            feedback: "O pacto exige justificar também decisões populares.",
          },
          {
            id: "ocultar",
            label: "Ocultar a votação tornará a escolha justa.",
            feedback: "Oculta informação necessária ao controle público.",
          },
        ],
        answer: "justificar",
        hint: "Uma escolha materialmente adequada ainda exige processo transparente.",
        explanation:
          "Critério público não autoriza apagar preferência ou excluir quem defendeu outra proposta.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Como encaminhar o pacote A + B?",
      options: [
        {
          id: "publico",
          label:
            "Apresentar custos e critérios, explicar limites da consulta, ouvir outros canais e registrar o adiamento de C.",
          feedback: "A decisão fica controlável e assume o custo de oportunidade.",
        },
        {
          id: "silencio",
          label: "Executar em silêncio porque a planilha mostra a resposta.",
          feedback: "A planilha não substitui deliberação pública.",
        },
        {
          id: "dividir",
          label: "Dividir R$ 33 mil por projeto para tratar todos igualmente.",
          feedback:
            "Os valores não cobrem os mínimos; igualdade de quantia pode inviabilizar tudo.",
        },
      ],
      answer: "publico",
      hint: "O pacote e o modo de decidir precisam de razões explícitas.",
      explanation: "Fundamentação material e processo acessível são dimensões relacionadas.",
    },
    conclusion: "O conselho assumiu prioridade, alternativa adiada e revisão da consulta.",
    reflection: "Se A puder ser feita em etapas, que outra combinação mereceria debate?",
    transfer:
      "Em orçamento público, compare critérios, custos mínimos, distribuição, participação e registro de decisão.",
  },
  {
    id: "revisao-do-pacto",
    title: "A regra funciona para quem?",
    focus: "Controle social e revisão institucional",
    context:
      "Após o piloto do salão, a comissão informa que todas as reservas foram preenchidas e declara sucesso. Usuários relatam exclusão.",
    mission: "Proponha revisão que examine implementação, efeitos e desacordo.",
    evidence: [
      {
        id: "indicador",
        title: "Relatório da comissão",
        text: "Dez horários disponíveis, dez reservas preenchidas. Não foram registrados solicitantes, recusas nem critérios de cada escolha.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "efeitos",
        title: "Escuta de usuários",
        text: "Um grupo participou; outro diz que o único horário acessível foi usado sempre pela mesma atividade. Falta a lista completa de pedidos.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "revisao",
        title: "Mecanismo do pacto fictício",
        text: "Critérios públicos, registro de pedidos e recusas, escuta e revisão após um mês. É possível contestar a regra sem atacar participantes.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "perguntas",
        kind: "multi",
        prompt: "Quais duas perguntas ajudam a avaliar inclusão?",
        options: [
          {
            id: "distribuicao",
            label: "Como horários e recusas se distribuíram entre usos e grupos?",
            feedback: "O preenchimento pode coexistir com concentração.",
          },
          {
            id: "barreiras",
            label: "Que condições impediram solicitação ou participação?",
            feedback: "Não pedir nem sempre equivale a não querer.",
          },
          {
            id: "total",
            label: "Dez reservas comprovam que houve acesso igual.",
            feedback: "O total mede ocupação, não distribuição.",
          },
          {
            id: "vencer",
            label: "Que grupo venceu mais discussões?",
            feedback: "Vitória retórica não mede o funcionamento da regra.",
          },
        ],
        answer: ["distribuicao", "barreiras"],
        hint: "O indicador de ocupação responde a uma pergunta diferente da inclusão.",
        explanation: "Controle social precisa examinar quem foi atendido e quem ficou fora.",
      },
      {
        id: "procedimento",
        kind: "order",
        prompt: "Organize a revisão institucional.",
        options: [
          {
            id: "dados",
            label: "Publicar critérios e dados sem expor informação pessoal.",
            feedback: "Permite examinar aplicação da regra.",
          },
          {
            id: "escuta",
            label: "Ouvir usos, barreiras e contestação por meios acessíveis.",
            feedback: "Dados devem dialogar com a experiência de participação.",
          },
          {
            id: "mudanca",
            label: "Decidir ajuste, justificar e definir nova avaliação.",
            feedback: "Produz decisão controlável e revisável.",
          },
        ],
        answer: ["dados", "escuta", "mudanca"],
        hint: "A mudança deve responder ao problema demonstrado.",
        explanation:
          "Revisar faz parte da legitimidade de uma regra quando seus efeitos diferem do objetivo.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual resposta da comissão atende ao pacto?",
      options: [
        {
          id: "revisar",
          label:
            "Reconhecer limite do indicador, coletar distribuição e barreiras, discutir rodízio e publicar justificativa.",
          feedback: "Corrige o alcance da conclusão e testa uma mudança ligada ao problema.",
        },
        {
          id: "encerrar",
          label: "Encerrar revisão porque todos os horários foram ocupados.",
          feedback: "Confunde ocupação com participação inclusiva.",
        },
        {
          id: "culpar",
          label: "Excluir o grupo que contestou para simplificar as reservas.",
          feedback: "Contestação fundamentada informa a revisão, não justifica exclusão.",
        },
      ],
      answer: "revisar",
      hint: "Uma revisão pode ajustar ou manter a regra depois de examinar efeitos.",
      explanation:
        "O julgamento esperado trata da coerência entre procedimento, objetivo e evidência.",
    },
    conclusion: "A comissão transformou uma declaração de sucesso em avaliação distribuída.",
    reflection: "Que resultado mostraria que o rodízio também precisa mudar?",
    transfer:
      "No controle social, confronte objetivo, indicador, aplicação, efeitos e possibilidade de revisão.",
  },
];
