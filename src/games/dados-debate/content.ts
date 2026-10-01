import type { InvestigationCase } from "../_shared/investigation-game";

export const CASES: InvestigationCase[] = [
  {
    id: "media-leitura",
    title: "Os minutos de leitura",
    mission: "Calcular a média e reconhecer o que ela não conta.",
    context:
      "Cinco estudantes registraram seus minutos de leitura em um dia. O mural da turma precisa apresentar a média sem afirmar que todos leram pelo mesmo tempo.",
    table: {
      caption: "Minutos de leitura (dados fictícios)",
      columns: ["Estudante", "Minutos"],
      rows: [
        ["A", "10"],
        ["B", "15"],
        ["C", "20"],
        ["D", "25"],
        ["E", "30"],
      ],
    },
    evidence: [
      {
        category: "O total",
        hook: "Quanto tempo foi registrado?",
        icon: "lista",
        evidence: "Somando 10, 15, 20, 25 e 30, encontramos 100 minutos.",
      },
      {
        category: "O grupo",
        hook: "Quantas pessoas participaram?",
        icon: "usuarios",
        evidence:
          "São cinco estudantes. Para obter a média, o total é dividido pelo número de participantes.",
      },
      {
        category: "As diferenças",
        hook: "Todos leram igual?",
        icon: "grafico",
        evidence:
          "Os tempos variam de 10 a 30 minutos. Uma média não torna todos os registros iguais.",
      },
    ],
    test: {
      prompt: "Qual é a média dos minutos de leitura?",
      hint: "Divida o total de 100 minutos pelos cinco estudantes.",
      correctId: "vinte",
      options: [
        {
          id: "cem",
          title: "100 minutos",
          explanation: "Esse é o total do grupo. A média exige dividir pelo número de estudantes.",
        },
        {
          id: "vinte",
          title: "20 minutos",
          explanation: "Isso. 100 dividido por 5 é igual a 20 minutos.",
        },
        {
          id: "trinta",
          title: "30 minutos",
          explanation:
            "Esse é o maior tempo observado. A média considera todos os cinco registros.",
        },
      ],
    },
    decision: {
      prompt: "Que frase descreve corretamente os dados?",
      hint: "A média resume o grupo, mas os tempos individuais continuam diferentes.",
      correctId: "resumo",
      options: [
        {
          id: "iguais",
          title: "Todos os estudantes leram exatamente 20 minutos.",
          explanation:
            "A tabela mostra cinco tempos diferentes. A média não é o tempo de cada pessoa.",
        },
        {
          id: "resumo",
          title: "A média foi 20 minutos, com tempos entre 10 e 30.",
          explanation: "A frase reúne a média e a variação observada.",
        },
        {
          id: "escola",
          title: "Todos os estudantes da escola leem 20 minutos por dia.",
          explanation:
            "Só cinco estudantes foram observados em um dia. Não há dados de toda a escola.",
        },
      ],
    },
    verdict: {
      title: "Média com contexto",
      text: "A média foi de 20 minutos. Esse número resume os cinco registros, mas não substitui os valores individuais nem representa automaticamente toda a escola.",
    },
  },
  {
    id: "mediana-trajeto",
    title: "O tempo do trajeto",
    mission: "Comparar média e mediana quando existe um valor muito alto.",
    context:
      "Cinco trajetos até a escola levaram 10, 12, 14, 16 e 48 minutos. O último trajeto teve um desvio excepcional. A turma quer encontrar o valor central da lista ordenada.",
    table: {
      caption: "Duração dos trajetos (dados fictícios)",
      columns: ["Trajeto", "Minutos"],
      rows: [
        ["A", "10"],
        ["B", "12"],
        ["C", "14"],
        ["D", "16"],
        ["E, com desvio", "48"],
      ],
    },
    evidence: [
      {
        category: "A ordem",
        hook: "Qual valor fica no meio?",
        icon: "lista",
        evidence:
          "A lista já está ordenada: 10, 12, 14, 16, 48. Há dois valores antes de 14 e dois depois dele.",
      },
      {
        category: "A média",
        hook: "Como o desvio entra no cálculo?",
        icon: "grafico",
        evidence:
          "A soma é 100 minutos. A média é 100 dividido por 5, ou 20 minutos. O trajeto de 48 minutos influencia essa média.",
      },
      {
        category: "A mediana",
        hook: "O que significa valor central?",
        icon: "alvo",
        evidence:
          "Para cinco valores ordenados, a mediana é o terceiro. Ela não elimina o registro de 48 minutos; apenas resume a posição central.",
      },
    ],
    test: {
      prompt: "Qual é a mediana desses trajetos?",
      hint: "Localize o terceiro número da lista ordenada.",
      correctId: "quatorze",
      options: [
        {
          id: "vinte",
          title: "20 minutos",
          explanation: "Esse é o valor da média. A mediana é o número no meio da lista ordenada.",
        },
        {
          id: "quarenta",
          title: "48 minutos",
          explanation:
            "Esse é o maior tempo. Há quatro números antes dele, portanto não é o valor central.",
        },
        {
          id: "quatorze",
          title: "14 minutos",
          explanation: "Isso. Há dois valores de cada lado de 14 na lista ordenada.",
        },
      ],
    },
    decision: {
      prompt: "Como apresentar os resultados sem esconder o desvio?",
      hint: "Média e mediana podem ser informadas juntas, explicando a observação excepcional.",
      correctId: "comparar",
      options: [
        {
          id: "apagar",
          title: "Apagar o trajeto de 48 minutos sem explicar.",
          explanation:
            "O registro é real no contexto. Apagá-lo silenciosamente distorce a investigação.",
        },
        {
          id: "comparar",
          title: "Informar média de 20, mediana de 14 e o desvio.",
          explanation: "A comparação explica a diferença entre os resumos sem esconder o trajeto.",
        },
        {
          id: "maior",
          title: "Dizer que todos os trajetos levam 48 minutos.",
          explanation:
            "Quatro trajetos foram mais curtos. O maior valor não representa cada trajeto.",
        },
      ],
    },
    verdict: {
      title: "Dois resumos, uma investigação",
      text: "A média é 20 minutos e a mediana é 14. A diferença ajuda a perceber o efeito do trajeto de 48 minutos. Nenhuma medida deve substituir a leitura do contexto e dos dados.",
    },
  },
  {
    id: "amostra-merenda",
    title: "A pesquisa da merenda",
    mission: "Identificar quem uma pesquisa realmente representa.",
    context:
      "A escola tem 200 estudantes em dois turnos. Uma enquete entrevistou apenas 20 integrantes do clube de esportes da manhã. Desses, 16 preferiram suco à água como bebida da merenda. A comissão precisa avaliar o alcance dessa conclusão.",
    table: {
      caption: "Participantes da enquete (dados fictícios)",
      columns: ["Grupo", "Quantidade"],
      rows: [
        ["Estudantes da escola", "200"],
        ["Entrevistados do clube", "20"],
        ["Preferiram suco", "16"],
      ],
    },
    evidence: [
      {
        category: "O resultado",
        hook: "Qual proporção respondeu?",
        icon: "grafico",
        evidence:
          "16 de 20 entrevistados preferiram suco. Isso corresponde a 80% dos participantes da enquete.",
      },
      {
        category: "A seleção",
        hook: "Quem foi ouvido?",
        icon: "usuarios",
        evidence:
          "Todos os entrevistados pertencem ao mesmo clube e ao turno da manhã. Outros grupos não foram ouvidos.",
      },
      {
        category: "O alcance",
        hook: "Quem ficou de fora?",
        icon: "busca",
        evidence:
          "A escola tem 200 estudantes em dois turnos. A amostra escolhida não permite afirmar a preferência de toda a escola.",
      },
    ],
    test: {
      prompt: "Quem é descrito diretamente pelo resultado de 80%?",
      hint: "Veja quais pessoas efetivamente responderam à enquete.",
      correctId: "entrevistados",
      options: [
        {
          id: "escola",
          title: "Todos os 200 estudantes da escola.",
          explanation:
            "A maioria dos estudantes não foi ouvida. A seleção de um só clube limita a conclusão.",
        },
        {
          id: "entrevistados",
          title: "Os 20 integrantes do clube entrevistados.",
          explanation: "Isso. O percentual resume as respostas dessas 20 pessoas.",
        },
        {
          id: "tarde",
          title: "Todos os estudantes do turno da tarde.",
          explanation: "Nenhum grupo da tarde participou da enquete descrita.",
        },
      ],
    },
    decision: {
      prompt: "Qual deve ser o próximo passo da comissão?",
      hint: "Uma pesquisa mais ampla precisa incluir os grupos que não participaram, com um critério de seleção claro.",
      correctId: "ampliar",
      options: [
        {
          id: "ampliar",
          title: "Planejar uma pesquisa incluindo turmas dos dois turnos.",
          explanation: "Ouvir grupos diversos com seleção planejada melhora a investigação.",
        },
        {
          id: "decretar",
          title: "Declarar que 80% de toda a escola preferem suco.",
          explanation:
            "O percentual é dos entrevistados. Não há base para generalizar a toda a escola.",
        },
        {
          id: "repetir",
          title: "Entrevistar apenas o mesmo clube novamente.",
          explanation: "Uma nova rodada só com o clube mantém os outros grupos sem representação.",
        },
      ],
    },
    verdict: {
      title: "Amostra com responsabilidade",
      text: "O cálculo de 80% está correto para os entrevistados. A limitação está na seleção do grupo. Uma boa pesquisa explica quem respondeu e planeja ouvir a diversidade da comunidade.",
    },
  },
];
