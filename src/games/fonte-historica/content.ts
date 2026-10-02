import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "seca-ceara",
    title: "Uma fotografia com história",
    focus: "Autoria, proveniência e datação",
    context:
      "Uma exposição sobre memória das secas quer usar uma fotografia sem legenda como registro do presente.",
    mission: "Construa uma legenda que distinga descrição, datação e incerteza.",
    evidence: [
      {
        id: "foto",
        title: "Descrição da fotografia",
        text: "Três pessoas e duas malas junto a uma estrada de terra. A imagem não permite identificar motivo da viagem ou local.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "catalogo",
        title: "Ficha do acervo fictício",
        text: 'Entrada: "Deslocamento de famílias, interior do Ceará, entre 1911 e 1915". Autor desconhecido; data estimada a partir do conjunto recebido de uma família.',
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "carta",
        title: "Carta do conjunto",
        text: "Uma carta de 1913 relata saída de uma família por falta de trabalho e água. Não identifica as pessoas da fotografia.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "data",
        kind: "choice",
        prompt: "Qual legenda respeita a proveniência?",
        options: [
          {
            id: "exata",
            label: "Retirantes de uma seca específica em 1911, fotógrafo identificado.",
            feedback:
              "A ficha indica intervalo, autor desconhecido e não identifica o evento exato.",
          },
          {
            id: "estimada",
            label:
              "Deslocamento de famílias no interior do Ceará, entre 1911 e 1915, segundo a ficha do acervo; autor desconhecido.",
            feedback: "O texto mantém a datação como estimativa atribuída.",
          },
          {
            id: "atual",
            label: "Famílias saem hoje por causa da seca, como mostra a foto.",
            feedback: "A proveniência histórica contradiz o uso como registro atual.",
          },
        ],
        answer: "estimada",
        hint: "Diferencie o que a imagem mostra do que a ficha atribui.",
        explanation: "A legenda é uma interpretação documentada e pode registrar incerteza.",
      },
      {
        id: "inferencias",
        kind: "multi",
        prompt: "Selecione duas afirmações sustentadas.",
        options: [
          {
            id: "conjunto",
            label: "A carta ajuda a investigar condições de deslocamento nesse conjunto.",
            feedback:
              "A relação de proveniência aproxima as fontes, mas não identifica automaticamente os retratados.",
          },
          {
            id: "pessoas",
            label: "A carta prova quem são todas as pessoas da foto.",
            feedback: "Não há essa identificação no documento.",
          },
          {
            id: "limite",
            label: "É necessária outra fonte para ligar a foto a um evento específico.",
            feedback: "A hipótese precisa de informação adicional.",
          },
          {
            id: "falta",
            label: "Sem autor conhecido, a foto não serve a nenhum estudo histórico.",
            feedback: "A ausência de autoria limita algumas perguntas, mas não elimina o vestígio.",
          },
        ],
        answer: ["conjunto", "limite"],
        hint: "Qual relação entre as peças está documentada e qual foi presumida?",
        explanation:
          "Uma fonte com lacunas continua investigável quando essas lacunas são explicitadas.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Como montar a exposição?",
      options: [
        {
          id: "contexto",
          label:
            "Exibir a foto com a ficha atribuída, a carta em separado e uma pergunta sobre os deslocamentos.",
          feedback: "As peças entram em diálogo sem virar uma identidade artificial.",
        },
        {
          id: "falsa",
          label: "Usar a carta como fala de uma das pessoas da foto.",
          feedback: "Isso inventa uma ligação biográfica.",
        },
        {
          id: "descartar",
          label: "Excluir a imagem porque não há certeza total.",
          feedback:
            "A investigação histórica costuma trabalhar com evidência incompleta e limites explícitos.",
        },
      ],
      answer: "contexto",
      hint: "A exposição pode explicar o caminho da interpretação.",
      explanation:
        "O critério é mostrar vestígios, hipóteses e incertezas, sem converter uma associação em fato.",
    },
    conclusion:
      "A fotografia entrou na exposição com proveniência e limites, não como prova de uma narrativa pronta.",
    reflection: "Que informação do verso ou do conjunto poderia estreitar a datação?",
    transfer:
      "Para uma fotografia familiar, registre origem, inscrição, data estimada e base dessa estimativa.",
  },
  {
    id: "fabrica-1930",
    title: "A fábrica nas duas versões",
    focus: "Confrontar intenção e condições de produção",
    context:
      "Uma mostra sobre o trabalho em uma cidade fictícia recebeu duas descrições de uma fábrica em 1930.",
    mission:
      "Explique por que fontes divergentes podem iluminar dimensões distintas do mesmo processo.",
    evidence: [
      {
        id: "relatorio",
        title: "Relatório empresarial de 1930",
        text: "Redigido para investidores: registra aumento de produção e apresenta o alojamento como melhoria. Não informa acidentes nem jornadas.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "carta",
        title: "Carta de trabalhadora de 1930",
        text: "Escrita à irmã: descreve cansaço, saudade e dificuldades no alojamento. Não apresenta números de toda a fábrica.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "memoria",
        title: "Entrevista de 1980",
        text: "Um antigo funcionário lembra a fábrica como primeiro emprego remunerado. A entrevista foi feita cinquenta anos depois e seleciona lembranças.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "critica",
        kind: "multi",
        prompt: "Quais duas comparações respeitam as fontes?",
        options: [
          {
            id: "interesse",
            label: "O público investidor ajuda a explicar o foco produtivo do relatório.",
            feedback: "Finalidade e público condicionam seleção dos fatos.",
          },
          {
            id: "oficial",
            label: "O relatório empresarial é neutro porque usa números.",
            feedback: "Números podem ser precisos e ainda omitir dimensões relevantes.",
          },
          {
            id: "tempo",
            label: "A entrevista posterior permite estudar também a memória da experiência.",
            feedback:
              "A distância temporal afeta lembranças e cria uma pergunta histórica própria.",
          },
          {
            id: "unica",
            label: "A carta representa necessariamente todos os trabalhadores.",
            feedback: "Uma experiência pessoal não é uma amostra de toda a fábrica.",
          },
        ],
        answer: ["interesse", "tempo"],
        hint: "A crítica pergunta quem escreve, para quem, quando e com qual finalidade.",
        explanation: "Fonte contemporânea e memória posterior respondem a perguntas diferentes.",
      },
      {
        id: "hipotese",
        kind: "choice",
        prompt: "Que hipótese usa as três peças sem apagar conflito?",
        options: [
          {
            id: "plural",
            label:
              "A expansão criou emprego e produção, enquanto algumas experiências registram desgaste; as fontes não medem sua extensão.",
            feedback: "A hipótese integra dimensões e explicita uma lacuna.",
          },
          {
            id: "feliz",
            label: "Todos ficaram felizes porque surgiu emprego.",
            feedback: "Um benefício não elimina relatos de sofrimento.",
          },
          {
            id: "farsa",
            label: "Nada do relatório pode ser usado por ser empresarial.",
            feedback: "Seu interesse exige crítica, não descarte automático de todos os dados.",
          },
        ],
        answer: "plural",
        hint: "Não é preciso escolher uma fonte como verdade total.",
        explanation:
          "Corroborar pode confirmar fatos específicos e manter divergência de avaliação.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual painel final é metodologicamente adequado?",
      options: [
        {
          id: "comparar",
          label:
            "Apresentar público e data de cada fonte, comparar emprego e desgaste e pedir registros adicionais sobre jornada.",
          feedback:
            "O painel transforma divergência em investigação e identifica a próxima pergunta.",
        },
        {
          id: "somar",
          label: "Tratar todas as frases como se descrevessem 100% da fábrica.",
          feedback: "Os alcances e os momentos não são iguais.",
        },
        {
          id: "votar",
          label: "Fazer votação para escolher qual documento é verdadeiro.",
          feedback: "Preferência do público não testa a sustentação de uma afirmação histórica.",
        },
      ],
      answer: "comparar",
      hint: "Procure o que cada documento permite afirmar e o que não permite.",
      explanation:
        "Um painel histórico pode sustentar uma interpretação parcial sem declarar um testemunho vencedor.",
    },
    conclusion: "As versões mostraram produção, experiência e memória como dimensões relacionadas.",
    reflection: "Que registro de salários ou jornada poderia mudar a hipótese?",
    transfer:
      "Ao comparar relatos, construa uma tabela com autoria, público, momento, afirmação e silêncio.",
  },
  {
    id: "memoria-usina",
    title: "Memória de um território transformado",
    focus: "Fontes, escala e silenciamentos",
    context:
      "A comunidade fictícia de Seringal produz um memorial sobre uma barragem construída décadas atrás.",
    mission: "Faça uma síntese que não confunda área no mapa com experiência de todas as famílias.",
    evidence: [
      {
        id: "mapa",
        title: "Mapa técnico da obra",
        text: "O mapa de planejamento marca 80 moradias dentro da área prevista de inundação. Trata de previsão, não de execução final.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "depoimento",
        title: "Depoimento de 2010",
        text: "Uma moradora relata mudança de casa e perda de acesso a um lugar de pesca. Sua entrevista foi autorizada para o memorial.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "registro",
        title: "Registro de compensações",
        text: "A empresa lista 65 acordos assinados. Não explica o destino das 15 moradias restantes nem pessoas que usavam o rio sem morar na área marcada.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "divergencia",
        kind: "choice",
        prompt:
          "A diferença entre 80 moradias e 65 acordos prova que 15 famílias não receberam nada?",
        options: [
          {
            id: "sim",
            label: "Sim, a subtração já comprova a violação.",
            feedback:
              "Moradia e acordo são unidades distintas; plano e execução também podem ter mudado.",
          },
          {
            id: "nao",
            label:
              "Não. A diferença indica uma lacuna a investigar sobre unidades, execução e cobertura.",
            feedback:
              "A comparação produz uma pergunta, sem resolver sozinha a trajetória de cada família.",
          },
          {
            id: "zero",
            label: "Não há lacuna porque todo documento empresarial está completo.",
            feedback: "A lista não explica ausências nem outros usuários do território.",
          },
        ],
        answer: "nao",
        hint: "Compare unidade contada, data e critério de inclusão.",
        explanation: "Um dado quantitativo pode revelar lacuna sem identificar sua causa.",
      },
      {
        id: "investigar",
        kind: "order",
        prompt: "Organize a continuação da investigação.",
        options: [
          {
            id: "unidades",
            label: "Conferir unidades, datas e área efetivamente atingida.",
            feedback: "Evita comparar previsão e resultado como equivalentes.",
          },
          {
            id: "vozes",
            label: "Buscar outros relatos e registros, incluindo usuários do rio fora da área.",
            feedback: "O espaço vivido pode ultrapassar o limite do mapa.",
          },
          {
            id: "sintese",
            label: "Reescrever a síntese com convergências, conflitos e lacunas.",
            feedback: "A nova conclusão precisa registrar o que mudou.",
          },
        ],
        answer: ["unidades", "vozes", "sintese"],
        hint: "Antes de concluir sobre quem ficou de fora, descubra de que fora se trata.",
        explanation:
          "Escala espacial e critérios de arquivo influenciam quais impactos ficam visíveis.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual frase deve abrir o memorial?",
      options: [
        {
          id: "parcial",
          label:
            "As fontes documentam transformações e experiências de deslocamento, mas não descrevem todos os atingidos; a investigação segue.",
          feedback: "A síntese assume evidência existente e limite de cobertura.",
        },
        {
          id: "nada",
          label: "Só moradores com acordo assinado foram afetados.",
          feedback: "Assinatura não define todo o alcance de um impacto territorial.",
        },
        {
          id: "todos",
          label: "Todas as 80 famílias tiveram a mesma experiência da entrevistada.",
          feedback: "Um depoimento não representa experiências idênticas de todos.",
        },
      ],
      answer: "parcial",
      hint: "O memorial não precisa encerrar perguntas que as fontes deixaram abertas.",
      explanation:
        "Uma narrativa responsável preserva a voz individual sem usá-la como experiência universal.",
    },
    conclusion:
      "O memorial distinguiu previsão técnica, registro empresarial e experiência vivida.",
    reflection:
      "Quem pode ficar invisível quando o arquivo registra somente proprietários ou assinantes?",
    transfer:
      "Em histórias locais, procure documentos e testemunhos que usem unidades e critérios distintos.",
  },
];
