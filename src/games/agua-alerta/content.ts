import type { InvestigationCase } from "../_shared/investigation-game";

export const CASES: InvestigationCase[] = [
  {
    id: "agua-transparente",
    title: "A água transparente",
    mission: "Separar aparência e segurança da água.",
    context:
      "Após uma enchente, a água de uma cisterna parece transparente. A tampa ficou aberta e não há análise recente. Uma família pergunta se a aparência basta para usar essa água como bebida.",
    evidence: [
      {
        category: "A aparência",
        hook: "O que os olhos conseguem ver?",
        icon: "gota",
        evidence:
          "A água está transparente. Isso não permite detectar todos os microrganismos ou contaminantes dissolvidos.",
      },
      {
        category: "A exposição",
        hook: "O que mudou na enchente?",
        icon: "alerta",
        evidence:
          "A cisterna ficou aberta durante a enchente. Água de inundação pode trazer esgoto e outros contaminantes.",
      },
      {
        category: "A verificação",
        hook: "Há confirmação de segurança?",
        icon: "escudo",
        evidence:
          "Não há análise recente nem orientação técnica para esse reservatório. A aparência, sozinha, não confirma potabilidade.",
      },
    ],
    test: {
      prompt: "O que é possível concluir pelas evidências?",
      hint: "Transparência é uma característica visível, não um teste de potabilidade.",
      correctId: "incerta",
      options: [
        {
          id: "segura",
          title: "A água é segura porque está transparente.",
          explanation: "Alguns perigos não podem ser vistos. Transparência não garante segurança.",
        },
        {
          id: "incerta",
          title: "A segurança não está confirmada e houve exposição.",
          explanation: "Isso. Há um risco conhecido e faltam verificações adequadas.",
        },
        {
          id: "cheiro",
          title: "Basta cheirar a água para confirmar a segurança.",
          explanation:
            "O olfato não detecta todos os contaminantes e não substitui avaliação adequada.",
        },
      ],
    },
    decision: {
      prompt: "Qual é a decisão mais cuidadosa nesse contexto?",
      hint: "Evite o consumo de água sem segurança confirmada e procure orientação do serviço responsável.",
      correctId: "orientacao",
      options: [
        {
          id: "provar",
          title: "Provar um copo para testar se faz mal.",
          explanation: "Consumir não é um teste seguro. Os efeitos podem não ser imediatos.",
        },
        {
          id: "pano",
          title: "Passar por um pano e considerar a água potável.",
          explanation:
            "Um pano pode reter partículas maiores, mas não garante a remoção de todos os perigos.",
        },
        {
          id: "orientacao",
          title: "Usar água de fonte segura e buscar orientação sanitária.",
          explanation:
            "A decisão evita o consumo da água incerta e encaminha a avaliação ao serviço responsável.",
        },
      ],
    },
    verdict: {
      title: "Aparência não é laudo",
      text: "Água transparente pode conter perigos invisíveis. A avaliação de segurança depende de controle e orientação adequada. O caso é uma investigação educativa, e não uma autorização para consumir ou tratar a água por conta própria.",
    },
  },
  {
    id: "mistura-copo",
    title: "A mistura no copo",
    mission: "Entender os limites de uma filtração simples.",
    context:
      "Na bancada didática, um copo de água recebeu areia e sal. A mistura não será consumida. Depois de mexer, a areia aparece no fundo e o sal deixa de ser visível. O grupo passa a mistura por um filtro de papel.",
    evidence: [
      {
        category: "A areia",
        hook: "O que ficou no fundo?",
        icon: "busca",
        evidence:
          "A areia não se dissolveu nessa atividade e apresenta partículas que podem ser retidas pelo filtro.",
      },
      {
        category: "O sal",
        hook: "Deixou de existir?",
        icon: "bequer",
        evidence: "O sal se dissolveu na água. Não ser visível não significa que desapareceu.",
      },
      {
        category: "O filtro",
        hook: "O que ele separa?",
        icon: "lista",
        evidence:
          "A filtração simples separa partículas de areia, mas não remove o sal dissolvido.",
      },
    ],
    test: {
      prompt: "O que se espera encontrar na água que atravessou o filtro?",
      hint: "Considere a diferença entre partículas retidas e substâncias dissolvidas.",
      correctId: "sal",
      options: [
        {
          id: "pura",
          title: "Somente água pura, sem sal.",
          explanation:
            "O filtro de papel não remove o sal dissolvido. A mistura não se tornou água pura.",
        },
        {
          id: "sal",
          title: "Água com sal dissolvido.",
          explanation:
            "Isso. A areia pode ficar no filtro, enquanto o sal dissolvido acompanha a água.",
        },
        {
          id: "areia",
          title: "Somente areia seca.",
          explanation:
            "A areia fica retida no filtro. A pergunta é sobre o líquido que o atravessou.",
        },
      ],
    },
    decision: {
      prompt: "Como registrar o resultado da experiência?",
      hint: "Relate o que o filtro separou e reconheça o que permaneceu no líquido.",
      correctId: "limite",
      options: [
        {
          id: "limite",
          title: "O filtro reteve areia; o sal permaneceu dissolvido.",
          explanation: "A conclusão descreve as duas partes da separação.",
        },
        {
          id: "desapareceu",
          title: "O sal deixou de existir quando foi misturado.",
          explanation:
            "O sal permanece na mistura. Dissolução não significa destruição da substância.",
        },
        {
          id: "beber",
          title: "A filtração tornou a mistura própria para beber.",
          explanation: "Esse experimento não testa potabilidade. A mistura não deve ser consumida.",
        },
      ],
    },
    verdict: {
      title: "Filtro com limites",
      text: "A filtração simples separou a areia, mas o sal continuou dissolvido. Cada técnica tem um alcance. Uma demonstração de separação de misturas não comprova que uma água é segura para consumo.",
    },
  },
  {
    id: "riacho-escola",
    title: "O riacho da escola",
    mission: "Investigar uma alteração ambiental sem inventar uma causa.",
    context:
      "Depois de uma chuva forte, estudantes observam espuma em um riacho e um cano desaguando perto da escola. Não sabem de onde vem o cano. Não houve coleta técnica ou análise. A turma quer comunicar a observação.",
    evidence: [
      {
        category: "A observação",
        hook: "O que foi visto?",
        icon: "busca",
        evidence:
          "Foram vistos espuma, chuva recente e um cano. Essas observações são um ponto de partida para investigar.",
      },
      {
        category: "A causa",
        hook: "O que ainda não se sabe?",
        icon: "bequer",
        evidence:
          "A presença de espuma, sozinha, não identifica a substância nem o responsável. Não há análise do material.",
      },
      {
        category: "O encaminhamento",
        hook: "Como agir com cuidado?",
        icon: "escudo",
        evidence:
          "É possível registrar local, data e observações à distância, sem tocar na água, e informar o serviço ambiental responsável.",
      },
    ],
    test: {
      prompt: "Qual afirmação distingue observação e hipótese?",
      hint: "O que foi visto é conhecido; a origem da espuma ainda precisa ser investigada.",
      correctId: "investigar",
      options: [
        {
          id: "culpa",
          title: "A fábrica mais próxima causou a espuma, com certeza.",
          explanation:
            "Não há dados que liguem uma fábrica ao cano ou à espuma. Atribuir culpa agora é extrapolar.",
        },
        {
          id: "seguro",
          title: "A espuma prova que a água é inofensiva.",
          explanation: "A aparência não confirma segurança. Faltam verificações sobre a água.",
        },
        {
          id: "investigar",
          title: "A espuma foi observada; sua origem precisa ser investigada.",
          explanation: "Isso. A frase relata o que se sabe e deixa a causa em aberto.",
        },
      ],
    },
    decision: {
      prompt: "Qual ação é adequada para a turma?",
      hint: "Registre a observação de modo seguro e encaminhe a investigação a quem pode avaliar o local.",
      correctId: "comunicar",
      options: [
        {
          id: "entrar",
          title: "Entrar no riacho para descobrir o cheiro da água.",
          explanation:
            "O contato pode expor a turma a riscos. A observação deve ser feita à distância.",
        },
        {
          id: "comunicar",
          title: "Registrar local e data e comunicar o serviço responsável.",
          explanation: "O registro ajuda a avaliação técnica sem expor a turma à água.",
        },
        {
          id: "acusar",
          title: "Publicar o nome de um responsável sem verificar.",
          explanation:
            "Não há evidência suficiente para identificar um responsável. O relato deve separar fatos e hipóteses.",
        },
      ],
    },
    verdict: {
      title: "Investigação sem exposição",
      text: "A observação pode iniciar uma investigação ambiental. Registrar com cuidado, evitar contato e comunicar o serviço responsável permite buscar respostas sem inventar uma causa ou assumir riscos.",
    },
  },
];
