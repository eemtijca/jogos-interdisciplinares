import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "queimadas",
    title: "Uma conclusão grande demais",
    focus: "Revisar relação lógica e atribuição",
    context:
      'O jornal recebeu: "O relatório registrou 30 focos em maio e 45 em junho. Portanto, o calor causou o aumento. Ele exige fiscalização."',
    mission: "Edite sem transformar uma associação em causa comprovada.",
    evidence: [
      {
        id: "dados",
        title: "Tabela original",
        text: "A contagem passou de 30 para 45 focos detectados. O relatório não investigou causas.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "fala",
        title: "Entrevista",
        text: 'A técnica Joana disse: "O levantamento indica mudança na contagem, mas não identifica a causa de cada foco."',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "rascunho",
        title: "Referência ambígua",
        text: 'O pronome "ele" pode retomar calor ou relatório; nenhum deles é apresentado como responsável por solicitar fiscalização.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "reparo",
        kind: "choice",
        prompt: "Qual revisão preserva o dado e seu limite?",
        options: [
          {
            id: "causa",
            label: "O calor provocou um aumento de 50% nas queimadas.",
            feedback: "O percentual compara as contagens, mas a causa não foi investigada.",
          },
          {
            id: "dado",
            label: "Os focos detectados passaram de 30 a 45; o relatório não identifica as causas.",
            feedback: "A revisão mantém informação verificável e evita explicar além do estudo.",
          },
          {
            id: "apagar",
            label: "Não houve mudança porque a causa é desconhecida.",
            feedback: "Não saber a causa não elimina a mudança registrada.",
          },
        ],
        answer: "dado",
        hint: "Revisar envolve verificar a força da afirmação, além de trocar conectivos.",
        explanation: "Um conector conclusivo não transforma dois dados em prova causal.",
      },
      {
        id: "edicoes",
        kind: "multi",
        prompt: "Que intervenções são necessárias na fala atribuída? Selecione duas.",
        options: [
          {
            id: "nome",
            label: "Nomear Joana como fonte da ressalva.",
            feedback:
              "A atribuição ajuda a distinguir dado do jornal e interpretação de entrevistada.",
          },
          {
            id: "certeza",
            label: 'Substituir "não identifica" por "prova que o calor causou".',
            feedback: "Isso inverte o sentido da entrevista.",
          },
          {
            id: "referente",
            label: "Excluir ou esclarecer quem solicita fiscalização.",
            feedback: 'O antecedente de "ele" não resolve a intenção da frase.',
          },
          {
            id: "oral",
            label: "Apagar toda entrevista porque fala oral tem menos valor.",
            feedback: "Entrevistas podem ser fontes adequadas; precisam de contexto e fidelidade.",
          },
        ],
        answer: ["nome", "referente"],
        hint: "Preserve a fala e torne inequívocos seu autor e seu alcance.",
        explanation: "Coesão referencial e precisão factual trabalham juntas.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual versão pode seguir para publicação?",
      options: [
        {
          id: "publicar",
          label:
            "A contagem passou de 30 a 45 focos. Segundo a técnica Joana, o relatório não identifica suas causas.",
          feedback: "O texto é claro, atribuído e compatível com a fonte.",
        },
        {
          id: "impacto",
          label: "Calor provoca explosão das queimadas, confirma técnica.",
          feedback: 'O verbo "confirma" e a causa atribuída contradizem a fala.',
        },
        {
          id: "vazio",
          label: "A contagem mudou. Ele disse isso.",
          feedback: "A informação ficou incompleta e o referente continua ambíguo.",
        },
      ],
      answer: "publicar",
      hint: "Leia o título e a fala como se fossem um compromisso com a fonte.",
      explanation: "A revisão final deve proteger o sentido dos dados e de quem foi entrevistado.",
    },
    conclusion: "O texto revisado informa a mudança sem inventar uma explicação causal.",
    reflection: 'Quando "portanto" conecta fatos, que premissa ainda pode estar faltando?',
    transfer:
      'Em relatórios, confronte verbos como "prova", "sugere" e "registra" com o método utilizado.',
  },
  {
    id: "intercambio",
    title: "O comunicado que precisa funcionar",
    focus: "Adequar gênero, público e registro",
    context:
      'Rascunho: "O intercâmbio tem 18 vagas. Entretanto as inscrições abrem segunda. A viagem vai ser massa e eles precisam entregar ela."',
    mission: "Reorganize o comunicado para que os leitores saibam como se inscrever.",
    evidence: [
      {
        id: "edital",
        title: "Condições",
        text: "Inscrições: 5 a 9 de outubro, na secretaria, com formulário assinado. As 18 vagas serão distribuídas conforme critérios do edital.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "publico",
        title: "Destino do texto",
        text: "Comunicado no mural para estudantes e famílias. Deve informar procedimento e remeter ao edital completo.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "voz",
        title: "Convite do grêmio",
        text: 'Em sua rede, o grêmio usa "vai ser massa" para aproximar o convite das turmas. O comunicado institucional precisa de outro recorte, sem desqualificar essa variedade.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "coerencia",
        kind: "choice",
        prompt: "Qual ligação organiza as duas primeiras informações?",
        options: [
          {
            id: "contraste",
            label: "Há 18 vagas, porém as inscrições começam em 5 de outubro.",
            feedback: '"Porém" mantém oposição sem motivo no contexto dado.',
          },
          {
            id: "soma",
            label: "Há 18 vagas. As inscrições ocorrerão de 5 a 9 de outubro.",
            feedback: "As informações se complementam sem exigir conectivo artificial.",
          },
          {
            id: "causa",
            label: "Como há 18 vagas, as inscrições precisam começar segunda.",
            feedback: "O número de vagas não explica a data.",
          },
        ],
        answer: "soma",
        hint: "Nem toda ligação entre frases exige um conectivo.",
        explanation: "A coerência pode ser obtida com sequência informativa e pontuação.",
      },
      {
        id: "estrutura",
        kind: "order",
        prompt: "Organize o comunicado em uma sequência útil.",
        options: [
          {
            id: "anuncio",
            label: "Identificar programa e número de vagas.",
            feedback: "O leitor precisa reconhecer o assunto.",
          },
          {
            id: "acao",
            label: "Apresentar datas, local e formulário exigido.",
            feedback: "A ação deve vir com os dados necessários.",
          },
          {
            id: "criterios",
            label: "Indicar onde consultar critérios e dúvidas.",
            feedback: "O resumo não substitui o edital.",
          },
        ],
        answer: ["anuncio", "acao", "criterios"],
        hint: "Passe do assunto à ação e, depois, ao detalhamento.",
        explanation: "Organização textual depende da tarefa que o leitor precisa realizar.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual edição atende ao mural?",
      options: [
        {
          id: "adequada",
          label:
            "Intercâmbio: 18 vagas. Inscrições de 5 a 9 de outubro na secretaria, com formulário assinado. Critérios no edital.",
          feedback: "A edição identifica objeto, ação e referência, sem prometer vaga a todos.",
        },
        {
          id: "garantia",
          label: "Todas as pessoas inscritas viajarão; entreguem ela segunda.",
          feedback: 'Há apenas 18 vagas e "ela" não esclarece o documento.',
        },
        {
          id: "preconceito",
          label: "O grêmio escreve errado; só o português formal comunica.",
          feedback: "Adequação a uma situação não torna outras variedades incapazes de comunicar.",
        },
      ],
      answer: "adequada",
      hint: "O texto deve permitir inscrição correta e respeitar a linguagem de outros contextos.",
      explanation:
        "Uma edição institucional privilegia clareza e informações necessárias; não julga a identidade linguística de seus autores.",
    },
    conclusion: "A revisão mudou o registro e a organização porque o gênero e o público mudaram.",
    reflection: "Que elementos poderiam permanecer em um convite informal na rede do grêmio?",
    transfer: "Ao revisar, explicite público, finalidade e veículo antes de decidir o tom.",
  },
  {
    id: "relatorio",
    title: "Um relatório sem resultado inventado",
    focus: "Reescrever método e conclusão",
    context:
      'Rascunho do clube: "A gente testou dois papéis. O prazo foi curto porque queríamos comparar. Concluímos que reciclado é sempre melhor."',
    mission: "Construa um fecho compatível com o experimento.",
    evidence: [
      {
        id: "pergunta",
        title: "Pergunta do grupo",
        text: "Em qual dos dois papéis a gota foi absorvida mais rapidamente, nas condições usadas?",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "metodo",
        title: "Registro de procedimento",
        text: "Uma gota do mesmo volume em cinco amostras de cada papel, na mesma mesa. Tempo médio: A, 8 s; B reciclado, 11 s.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "limite",
        title: "Caderno de campo",
        text: "Não foram avaliados resistência, preço ou impacto ambiental. A sala não teve umidade controlada.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "finalidade",
        kind: "choice",
        prompt: "Qual frase explica a finalidade sem inventar a causa do prazo?",
        options: [
          {
            id: "para",
            label:
              "O grupo comparou os papéis para medir o tempo de absorção nas condições descritas.",
            feedback: '"Para" explicita a finalidade registrada.',
          },
          {
            id: "porque",
            label: "O prazo foi curto porque o papel reciclado é sempre melhor.",
            feedback: "A causa do prazo e a qualidade geral não foram investigadas.",
          },
          {
            id: "oral",
            label: "O relatório só pode ser aceito se nenhuma fala do grupo aparecer.",
            feedback: "O gênero pode registrar falas atribuídas; a questão é clareza e precisão.",
          },
        ],
        answer: "para",
        hint: "Finalidade responde para quê; causa responde por que ocorreu.",
        explanation:
          "Revisar a relação lógica evita transformar um objetivo em explicação de outro evento.",
      },
      {
        id: "fecho",
        kind: "multi",
        prompt: "Quais duas informações devem integrar a conclusão?",
        options: [
          {
            id: "resultado",
            label: "A absorção média foi mais rápida no papel A neste teste.",
            feedback: "É o resultado comparativo disponível.",
          },
          {
            id: "universal",
            label: "Papel A é melhor em qualquer situação.",
            feedback: "Um teste limitado não avalia todas as propriedades e usos.",
          },
          {
            id: "limite",
            label: "Os dados não avaliam custo ou impacto ambiental.",
            feedback: "A ressalva impede transformar uma medida em classificação geral.",
          },
          {
            id: "hipotese",
            label: "Os resultados devem coincidir com a hipótese inicial.",
            feedback: "A hipótese pode ser contrariada pela evidência.",
          },
        ],
        answer: ["resultado", "limite"],
        hint: "Responda à pergunta investigada e delimite o que ficou fora.",
        explanation:
          "A conclusão acompanha a evidência mesmo quando ela contraria a expectativa do grupo.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Escolha o fecho publicável.",
      options: [
        {
          id: "fecho",
          label:
            "Nas condições usadas, A absorveu a gota mais rapidamente (8 s contra 11 s). O teste não compara custo ou impacto ambiental.",
          feedback: "A conclusão usa dado, recorte e limite.",
        },
        {
          id: "propaganda",
          label: "O reciclado é sempre melhor, como previsto.",
          feedback: "Além de contrariar a medição, a frase inventa avaliação de sustentabilidade.",
        },
        {
          id: "silencio",
          label: "Não é possível concluir nada porque a umidade não foi controlada.",
          feedback: "A limitação exige cautela; não apaga a descrição do que foi observado.",
        },
      ],
      answer: "fecho",
      hint: "Um resultado localizado pode ser descrito sem virar lei universal.",
      explanation:
        "O fecho responde ao objetivo com honestidade, incluindo condições que afetam a generalização.",
    },
    conclusion: "O relatório ficou publicável porque explicou procedimento, resultado e limite.",
    reflection: "Que nova investigação seria necessária para comparar impacto ambiental?",
    transfer:
      "Ao escrever um fecho, retome a pergunta, cite o resultado e informe até onde ele responde.",
  },
];
