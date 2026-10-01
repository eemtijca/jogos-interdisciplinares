import type { InvestigationCase } from "../_shared/investigation-game";

export const CASES: InvestigationCase[] = [
  {
    id: "praca-fotografia",
    title: "A fotografia da praça",
    mission: "Cruzar fontes para contar uma mudança no bairro.",
    context:
      "Uma exposição reúne uma foto da praça sem árvores, datada de 1980, um registro de plantio de 1995 e uma foto recente com árvores grandes. Um visitante afirma que a praça sempre foi arborizada.",
    evidence: [
      {
        category: "A foto antiga",
        hook: "O que aparece em 1980?",
        icon: "historia",
        evidence:
          "No enquadramento da foto de 1980 não aparecem árvores. A imagem documenta aquele trecho e aquele momento.",
      },
      {
        category: "O registro",
        hook: "Qual ação foi documentada?",
        icon: "documento",
        evidence:
          "O registro de 1995 informa um plantio na praça. Ele indica uma intervenção posterior à foto antiga.",
      },
      {
        category: "A foto recente",
        hook: "O que mudou?",
        icon: "folha",
        evidence:
          "A imagem recente mostra árvores grandes no mesmo trecho. As três fontes permitem comparar momentos diferentes.",
      },
    ],
    test: {
      prompt: "Qual fonte ajuda a situar o plantio no tempo?",
      hint: "Procure o documento que registra a intervenção e sua data.",
      correctId: "registro",
      options: [
        {
          id: "visitante",
          title: "A afirmação de que a praça sempre teve árvores.",
          explanation:
            "Essa afirmação não informa uma data e entra em conflito com as fontes apresentadas.",
        },
        {
          id: "registro",
          title: "O registro de plantio de 1995.",
          explanation: "Isso. O documento situa uma ação de plantio depois da foto de 1980.",
        },
        {
          id: "recente",
          title: "A foto recente, sem comparar outros documentos.",
          explanation:
            "A foto mostra árvores atuais, mas não informa sozinha quando foram plantadas.",
        },
      ],
    },
    decision: {
      prompt: "Qual legenda respeita o conjunto de fontes?",
      hint: "Uma legenda pode apresentar mudança e datas sem usar a palavra 'sempre'.",
      correctId: "mudanca",
      options: [
        {
          id: "sempre",
          title: "A praça sempre teve as mesmas árvores.",
          explanation:
            "O registro de plantio e a foto antiga indicam mudança, não permanência absoluta.",
        },
        {
          id: "mudanca",
          title: "As fontes indicam arborização após a foto de 1980.",
          explanation: "A legenda relaciona as datas e a intervenção documentada.",
        },
        {
          id: "ontem",
          title: "Todas as árvores foram plantadas ontem.",
          explanation: "Há um registro de plantio de 1995. A data de ontem não aparece nas fontes.",
        },
      ],
    },
    verdict: {
      title: "Memória em comparação",
      text: "Cruzar imagens e registros permite perceber mudanças. Uma fotografia mostra um enquadramento e um momento; comparar fontes ajuda a evitar conclusões baseadas somente na paisagem atual.",
    },
  },
  {
    id: "feira-relatos",
    title: "As memórias da feira",
    mission: "Reconhecer perspectivas diferentes sobre um mesmo acontecimento.",
    context:
      "Uma moradora lembra a mudança de endereço da feira como melhoria no acesso de ônibus. Um feirante recorda a perda de clientes na primeira semana. Uma ata registra reclamações e apoio à mudança na reunião do bairro.",
    evidence: [
      {
        category: "A moradora",
        hook: "Qual aspecto ela destaca?",
        icon: "usuario",
        evidence:
          "A moradora avalia a mudança pelo acesso de ônibus. Essa experiência explica o aspecto positivo do relato.",
      },
      {
        category: "O feirante",
        hook: "Qual impacto ele viveu?",
        icon: "maleta",
        evidence:
          "O feirante relata perda de clientes no início. Isso diz respeito ao trabalho e ao período que ele observou.",
      },
      {
        category: "A ata",
        hook: "Havia uma opinião única?",
        icon: "documento",
        evidence:
          "A ata registra tanto apoio quanto reclamações. As fontes apresentam interesses e experiências diferentes.",
      },
    ],
    test: {
      prompt: "O que explica a diferença entre os relatos?",
      hint: "As duas pessoas podem ter vivido a mesma mudança por posições diferentes.",
      correctId: "perspectivas",
      options: [
        {
          id: "mentira",
          title: "Relatos diferentes provam que uma pessoa mentiu.",
          explanation:
            "Diferenças podem refletir experiências e interesses distintos. Não há evidência de mentira aqui.",
        },
        {
          id: "perspectivas",
          title: "As pessoas destacam impactos diferentes da mudança.",
          explanation: "Isso. Acesso e trabalho são aspectos diferentes do mesmo acontecimento.",
        },
        {
          id: "unanimidade",
          title: "Toda a comunidade concordou com a mudança.",
          explanation: "A ata registra reclamações e apoio. Não houve opinião única nas fontes.",
        },
      ],
    },
    decision: {
      prompt: "Como montar o painel de memória da feira?",
      hint: "Identifique quem fala e inclua os impactos relatados, relacionando-os à ata.",
      correctId: "plural",
      options: [
        {
          id: "plural",
          title: "Apresentar os dois relatos com autoria e comparar a ata.",
          explanation: "A escolha permite conhecer perspectivas e confrontá-las com outra fonte.",
        },
        {
          id: "apagar",
          title: "Retirar o relato do feirante porque é negativo.",
          explanation:
            "Excluir um relato só por seu tom elimina uma experiência importante da investigação.",
        },
        {
          id: "inventar",
          title: "Inventar uma frase dizendo que todos ficaram felizes.",
          explanation: "A frase apagaria os conflitos que estão documentados nas fontes.",
        },
      ],
    },
    verdict: {
      title: "Memória com mais de uma voz",
      text: "Uma história pode reunir experiências diferentes. Identificar autoria, contexto e período permite comparar relatos sem exigir que toda a comunidade tenha vivido a mudança da mesma maneira.",
    },
  },
  {
    id: "mapa-riacho",
    title: "O riacho no mapa",
    mission: "Reconhecer o que mapas de épocas diferentes permitem concluir.",
    context:
      "Um mapa de 1970 mostra um riacho a céu aberto na rua atual da escola. Um mapa recente mostra uma via no mesmo trecho, sem desenhar o riacho. Ainda não foram encontrados documentos sobre obras naquele local.",
    evidence: [
      {
        category: "O mapa antigo",
        hook: "O que estava representado?",
        icon: "mapa",
        evidence:
          "Em 1970, o mapa representa um riacho no trecho. A legenda identifica o curso de água.",
      },
      {
        category: "O mapa recente",
        hook: "O que aparece agora?",
        icon: "documento",
        evidence:
          "O mapa recente representa uma rua e não desenha o riacho. Um mapa seleciona elementos de acordo com sua finalidade.",
      },
      {
        category: "A lacuna",
        hook: "Qual informação falta?",
        icon: "busca",
        evidence:
          "Sem registros de obras ou outras fontes, não se sabe se o riacho foi canalizado, desviado ou omitido no mapa recente.",
      },
    ],
    test: {
      prompt: "Qual conclusão os dois mapas sustentam diretamente?",
      hint: "Compare o que está representado, sem escolher uma causa ainda não documentada.",
      correctId: "representacao",
      options: [
        {
          id: "secou",
          title: "O riacho secou naturalmente, com certeza.",
          explanation: "A ausência no mapa não comprova que o riacho secou. Faltam outras fontes.",
        },
        {
          id: "representacao",
          title: "O trecho tem representações diferentes nos dois mapas.",
          explanation:
            "Isso. Podemos comparar os elementos desenhados sem inventar a causa da diferença.",
        },
        {
          id: "nunca",
          title: "Nunca houve um riacho nesse trecho.",
          explanation:
            "O mapa de 1970 representa um riacho. Ignorá-lo elimina uma fonte disponível.",
        },
      ],
    },
    decision: {
      prompt: "Como continuar a investigação?",
      hint: "Busque fontes que possam esclarecer as obras e a história do trecho.",
      correctId: "fontes",
      options: [
        {
          id: "fontes",
          title: "Procurar registros de obras, fotos e relatos identificados.",
          explanation:
            "Fontes diferentes podem esclarecer a transformação ou a escolha de representação.",
        },
        {
          id: "descartar",
          title: "Descartar o mapa antigo por ser mais velho.",
          explanation:
            "A idade da fonte faz parte da investigação. Um mapa antigo pode informar sobre outra época.",
        },
        {
          id: "certeza",
          title: "Anunciar uma canalização sem consultar outros documentos.",
          explanation:
            "Canalização é uma hipótese possível, mas ainda não está documentada no contexto.",
        },
      ],
    },
    verdict: {
      title: "Mapa é fonte, não resposta completa",
      text: "Mapas registram escolhas e épocas. A comparação revelou uma diferença, mas sua causa exige novas fontes. Reconhecer uma lacuna também faz parte de uma investigação histórica responsável.",
    },
  },
];
