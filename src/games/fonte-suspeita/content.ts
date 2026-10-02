import type { InvestigationCase } from "@/games/_shared/investigation-types";

/** Documentos e números dos casos são ficcionais para fins didáticos. */
export const CASES: InvestigationCase[] = [
  {
    id: "bolsa-cortada",
    title: "O boato das bolsas",
    focus: "Distinguir suspeita, refutação e falta de prova",
    context:
      'O canal do grêmio recebeu: "Todas as bolsas foram cortadas. Repasse antes que apaguem!" Ninguém consultou a escola.',
    mission: "Decida o que pode ser afirmado e planeje uma checagem fora da mensagem.",
    evidence: [
      {
        id: "post",
        title: "A mensagem",
        text: "Conta criada há seis dias; não apresenta documento nem link. A imagem tem uma fila de estudantes.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "imagem",
        title: "Rastro da imagem",
        text: "A busca reversa deste dossiê encontra a mesma foto em uma postagem de 2019, sobre outra escola.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "consulta",
        title: "Resposta da secretaria",
        text: "Às 9h, a secretaria informa que ainda está conferindo o pagamento. Não confirmou corte nem manutenção.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "alcance",
        kind: "choice",
        prompt: "Que conclusão as evidências permitem agora?",
        options: [
          {
            id: "falso",
            label: "O corte é falso porque não há decreto.",
            feedback:
              "Ausência de documento no post não prova ausência de corte. Também pode haver informação ainda não localizada.",
          },
          {
            id: "incerto",
            label: "O corte geral não está demonstrado; a foto não documenta o presente.",
            feedback:
              "A foto foi refutada como registro atual, mas a alegação sobre pagamento ainda exige outra apuração.",
          },
          {
            id: "verdade",
            label: "A foto real confirma o corte.",
            feedback:
              "Uma fotografia pode ser autêntica e estar fora de contexto. Não registra a decisão sobre bolsas.",
          },
        ],
        answer: "incerto",
        hint: "Separe a alegação sobre a foto da alegação sobre o programa.",
        explanation: "Uma pista pode refutar uma parte da mensagem sem resolver todas as demais.",
      },
      {
        id: "checar",
        kind: "order",
        prompt: "Organize uma checagem lateral, saindo do post.",
        options: [
          {
            id: "recorte",
            label: "Identificar programa, local e período da alegação.",
            feedback: "Sem recorte, uma resposta pode tratar de outro programa.",
          },
          {
            id: "busca",
            label: "Consultar canal do programa e fontes independentes pertinentes.",
            feedback:
              "Uma fonte reproduzindo o mesmo rumor não conta como confirmação independente.",
          },
          {
            id: "confronto",
            label: "Confrontar respostas e registrar o que permanece incerto.",
            feedback: "A conclusão deve ter o mesmo alcance da evidência.",
          },
        ],
        answer: ["recorte", "busca", "confronto"],
        hint: "Primeiro defina o que está sendo checado; só depois compare respostas.",
        explanation:
          "Checagem lateral é procurar informações sobre a alegação e sobre quem a publica fora de sua página.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "O que publicar no canal enquanto a apuração segue?",
      options: [
        {
          id: "alarme",
          label: 'Repassar o corte com a etiqueta "não confirmado".',
          feedback: "A etiqueta ainda amplia a acusação e pode gerar pânico sem necessidade.",
        },
        {
          id: "aviso",
          label:
            "Avisar que o corte geral não foi comprovado, corrigir a foto e indicar o canal de consulta.",
          feedback: "A correção resolve o que se sabe e deixa transparente o que falta.",
        },
        {
          id: "negacao",
          label: "Garantir que todas as bolsas serão pagas.",
          feedback: "A secretaria ainda não confirmou isso; seria outra afirmação sem sustentação.",
        },
      ],
      answer: "aviso",
      hint: "A mensagem precisa ajudar quem depende do benefício sem inventar certeza.",
      explanation:
        "A melhor decisão editorial neste dossiê reduz o alcance do rumor, corrige a imagem e informa a situação da apuração.",
    },
    conclusion:
      "A foto antiga deixou de sustentar o alarme; o status do pagamento ficou explicitamente em apuração.",
    reflection:
      "O que faria a conclusão mudar: a confirmação de uma suspensão parcial ou de um corte geral?",
    transfer:
      "Ao encontrar um boato, registre a alegação exata, a prova disponível e a informação que falta.",
  },
  {
    id: "agua-da-escola",
    title: "Vídeo antigo, problema atual",
    focus: "Separar autenticidade visual e precaução contextual",
    context: 'Um vídeo de água escura circula com a legenda "a água da escola está contaminada".',
    mission: "Confronte data, lugar e aviso local antes de redigir a orientação.",
    evidence: [
      {
        id: "video",
        title: "Vídeo encaminhado",
        text: "A versão completa identifica outra cidade e data de 2021. O recorte enviado remove essas informações.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "aviso",
        title: "Aviso local",
        text: "A direção fechou uma torneira para manutenção hoje; pede usar os bebedouros liberados até receber avaliação técnica.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "laudo",
        title: "Documento disponível",
        text: "Um laudo de três meses atrás descreve a coleta daquele dia e daquele ponto, sem analisar a ocorrência atual.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "limites",
        kind: "multi",
        prompt: "Selecione as duas inferências sustentadas.",
        options: [
          {
            id: "antigo",
            label: "O vídeo não registra a ocorrência de hoje nesta escola.",
            feedback: "Data e local do original contradizem a legenda atual.",
          },
          {
            id: "segura",
            label: "Toda água da escola está comprovadamente segura hoje.",
            feedback: "O laudo antigo não cobre automaticamente a situação presente.",
          },
          {
            id: "aguardar",
            label: "O ponto em manutenção exige seguir o aviso local enquanto há apuração.",
            feedback:
              "A orientação se refere a uma ocorrência identificada, sem diagnosticar contaminação.",
          },
          {
            id: "total",
            label: "Todos os bebedouros estão contaminados.",
            feedback:
              "Uma torneira interditada e um vídeo de outro lugar não sustentam essa generalização.",
          },
        ],
        answer: ["antigo", "aguardar"],
        hint: "Verifique qual período e qual ponto cada evidência cobre.",
        explanation:
          "Autenticidade do vídeo, diagnóstico técnico e orientação preventiva são questões diferentes.",
      },
      {
        id: "titulo",
        kind: "choice",
        prompt: "Qual título mantém essa diferença?",
        options: [
          {
            id: "calmo",
            label: "Vídeo antigo circula; direção orienta evitar ponto em manutenção.",
            feedback:
              "O título corrige o contexto visual e informa a ação local sem afirmar diagnóstico.",
          },
          {
            id: "perigo",
            label: "Vídeo prova contaminação de toda a escola.",
            feedback: "O material não é da escola e não comprova causa da coloração.",
          },
          {
            id: "livre",
            label: "Laudo antigo garante potabilidade permanente.",
            feedback: "O laudo é uma avaliação delimitada, não garantia para todas as datas.",
          },
        ],
        answer: "calmo",
        hint: "Inclua o que foi confirmado e a orientação que tem origem identificada.",
        explanation: "Texto responsável evita tanto o pânico quanto a falsa tranquilização.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Como fechar a nota do grêmio?",
      options: [
        {
          id: "nota",
          label:
            "Citar o aviso da direção, corrigir o vídeo e atualizar quando houver avaliação técnica.",
          feedback: "A nota informa fonte, limite e compromisso de atualização.",
        },
        {
          id: "silencio",
          label: "Apagar tudo sem comunicar a orientação local.",
          feedback: "A correção do vídeo não elimina a necessidade de avisar sobre a manutenção.",
        },
        {
          id: "certeza",
          label: "Declarar a água contaminada para pressionar a direção.",
          feedback: "Pressão não substitui evidência e pode gerar uma informação incorreta.",
        },
      ],
      answer: "nota",
      hint: "Uma correção útil explica o que estava errado e o que fazer com a informação local.",
      explanation:
        "Neste cenário, a comunicação combina apuração e orientação identificada; não faz diagnóstico de saúde.",
    },
    conclusion: "A nota separou um recorte enganoso de uma ocorrência real ainda investigada.",
    reflection: "Por que um documento técnico precisa trazer data, ponto de coleta e alcance?",
    transfer:
      "Ao comparar um vídeo e um laudo, confira se ambos tratam do mesmo evento, lugar e momento.",
  },
  {
    id: "vaga-relampago",
    title: "A vaga rápida demais",
    focus: "Checar interesses e falsas confirmações independentes",
    context:
      "Um perfil anuncia vagas remuneradas e cobra uma taxa imediata para reservar entrevista.",
    mission: "Reconstrua a cadeia de fontes e decida como alertar a comunidade.",
    evidence: [
      {
        id: "anuncio",
        title: "Anúncio",
        text: "O perfil usa o logotipo de uma empresa e um endereço parecido com o oficial. Pede pagamento antes de identificar o responsável.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "repeticao",
        title: "Três notícias",
        text: "Três páginas citam a mesma postagem, com texto idêntico. Nenhuma entrevistou a empresa nem verificou a seleção.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
      {
        id: "empresa",
        title: "Consulta independente simulada",
        text: "O canal de recrutamento da empresa, localizado fora do anúncio, informa que não oferece a seleção descrita e não cobra a taxa.",
        source: "Dossiê didático fictício, criado para o Ludus",
      },
    ],
    tasks: [
      {
        id: "independencia",
        kind: "choice",
        prompt: "Há quatro fontes que confirmam a vaga?",
        options: [
          {
            id: "quatro",
            label: "Sim, anúncio e três páginas são confirmações separadas.",
            feedback: "Contar páginas repetidas ignora sua dependência do mesmo texto.",
          },
          {
            id: "uma",
            label: "Não. As três páginas dependem do anúncio; a empresa o contradiz.",
            feedback: "A cadeia de reprodução não cria nova evidência.",
          },
          {
            id: "nenhuma",
            label: "Não é preciso consultar a empresa: conta nova é sempre fraude.",
            feedback: "Perfil recente é um sinal para investigar, não um diagnóstico suficiente.",
          },
        ],
        answer: "uma",
        hint: "Pergunte de onde veio a informação de cada página.",
        explanation:
          "Independência depende do processo de apuração, não da quantidade de endereços.",
      },
      {
        id: "procedimento",
        kind: "order",
        prompt: "Ordene um procedimento seguro de verificação.",
        options: [
          {
            id: "pausa",
            label: "Interromper a divulgação e não pagar pela mensagem.",
            feedback: "A urgência é uma técnica para impedir avaliação.",
          },
          {
            id: "canal",
            label: "Localizar o canal real da organização fora do anúncio.",
            feedback:
              "Usar somente o contato fornecido pelo anúncio preservaria sua própria cadeia.",
          },
          {
            id: "registro",
            label: "Registrar a divergência e orientar busca pelo recrutamento confirmado.",
            feedback: "Uma correção precisa explicar a evidência que mudou a conclusão.",
          },
        ],
        answer: ["pausa", "canal", "registro"],
        hint: "A checagem não deve depender do contato que o anúncio oferece.",
        explanation:
          "O rastro externo permite comparar a identidade alegada com a organização mencionada.",
      },
    ],
    decision: {
      id: "decisao",
      kind: "choice",
      prompt: "Qual alerta é proporcional à apuração?",
      options: [
        {
          id: "alertar",
          label:
            "Informar que a empresa negou esta seleção, citar a consulta e orientar não usar a cobrança do anúncio.",
          feedback: "A divergência direta sustenta o alerta sobre esta oferta.",
        },
        {
          id: "acusacao",
          label: "Expor nome e foto de quem compartilhou como autor do golpe.",
          feedback:
            "Compartilhar pode ter sido um engano; não identifica autoria ou intenção criminosa.",
        },
        {
          id: "repassar",
          label: "Repassar para que cada pessoa decida.",
          feedback: "O repasse mantém a exposição a uma oferta contradita pela organização citada.",
        },
      ],
      answer: "alertar",
      hint: "Distinga o responsável pelo anúncio de quem recebeu e encaminhou.",
      explanation: "A conclusão se refere a esta oferta; não acusa pessoas sem investigação.",
    },
    conclusion:
      "O alerta se apoiou em consulta externa e não no número de páginas que repetiram o anúncio.",
    reflection: "Como registrar a verificação sem divulgar dados pessoais de quem encaminhou?",
    transfer:
      "Antes de confiar em uma oferta, procure a organização por um canal independente e compare condições.",
  },
];
