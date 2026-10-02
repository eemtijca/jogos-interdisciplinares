/**
 * Catálogo de jogos: fonte única de verdade sobre a coleção.
 * Cada entrada alimenta o hub, o shell do jogo, o painel de progresso
 * e o modo professor (códigos BNCC e habilidades).
 */

export type AreaId = "linguagens" | "matematica" | "natureza" | "humanas";

export type Level = 1 | 2 | 3 | 4 | 5;

export interface AreaMeta {
  id: AreaId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  colorDark: string;
  colorSoft: string;
  description: string;
}

export interface GameMeta {
  id: string;
  title: string;
  tagline: string;
  description: string;
  area: AreaId;
  level: Level;
  bncc: string[];
  tags: string[];
  icon: string;
  minutes: number;
  skills: string[];
  objective: string;
}

export const AREAS: Record<AreaId, AreaMeta> = {
  linguagens: {
    id: "linguagens",
    name: "Linguagens e suas Tecnologias",
    shortName: "Linguagens",
    icon: "BookOpenText",
    color: "var(--linguagens)",
    colorDark: "var(--linguagens-dark)",
    colorSoft: "var(--linguagens-soft)",
    description: "Língua portuguesa, mídia, argumentação e os textos que circulam na escola.",
  },
  matematica: {
    id: "matematica",
    name: "Matemática e suas Tecnologias",
    shortName: "Matemática",
    icon: "Calculator",
    color: "var(--matematica)",
    colorDark: "var(--matematica-dark)",
    colorSoft: "var(--matematica-soft)",
    description: "Funções, probabilidade e finanças do dia a dia, com simuladores interativos.",
  },
  natureza: {
    id: "natureza",
    name: "Ciências da Natureza e suas Tecnologias",
    shortName: "Natureza",
    icon: "FlaskConical",
    color: "var(--natureza)",
    colorDark: "var(--natureza-dark)",
    colorSoft: "var(--natureza-soft)",
    description: "Física, química e biologia em bancadas de experimento seguras e visíveis.",
  },
  humanas: {
    id: "humanas",
    name: "Ciências Humanas e Sociais Aplicadas",
    shortName: "Humanas",
    icon: "Globe2",
    color: "var(--humanas)",
    colorDark: "var(--humanas-dark)",
    colorSoft: "var(--humanas-soft)",
    description: "História, geografia, filosofia e as decisões que moldam a vida em comunidade.",
  },
};

export const AREA_ORDER: AreaId[] = ["linguagens", "matematica", "natureza", "humanas"];

export const LEVEL_LABEL: Record<Level, string> = {
  1: "Nível 1 · Evidências",
  2: "Nível 2 · Relações",
  3: "Nível 3 · Modelagem",
  4: "Nível 4 · Crítica",
  5: "Nível 5 · Síntese",
};

export const LEVEL_DESCRIPTION: Record<Level, string> = {
  1: "Distinguir observação, afirmação e evidência, explicitando limites.",
  2: "Relacionar variáveis, comparar representações e testar explicações.",
  3: "Construir e confrontar modelos ou argumentos sob condições diferentes.",
  4: "Criticar pressupostos, vieses e incertezas em dados e propostas.",
  5: "Sintetizar evidências e justificar decisões com critérios e revisão.",
};

export const GAMES: GameMeta[] = [
  {
    id: "fonte-suspeita",
    title: "Fonte Suspeita",
    tagline: "Uma pista muda a história. Ela prova tudo?",
    description:
      "Cheque boatos com leitura lateral, diferencie dúvida de refutação e reconstrua cadeias de fontes antes de publicar.",
    area: "linguagens",
    level: 1,
    bncc: ["EM13LP39"],
    tags: ["Mídia", "Checagem", "Fontes"],
    icon: "Newspaper",
    minutes: 12,
    skills: [
      "Distinguir ausência de prova e prova de falsidade",
      "Verificar contexto e independência das fontes",
      "Redigir correções com alcance e limites",
    ],
    objective:
      "Aplicar procedimentos de checagem em decisões editoriais sustentadas por evidência.",
  },
  {
    id: "revisor-critico",
    title: "Revisor Crítico",
    tagline: "A edição precisa preservar o que o texto pode afirmar.",
    description:
      "Revise relações lógicas, referentes, registro e conclusões em rascunhos reais do dossiê, preservando dados e sentido.",
    area: "linguagens",
    level: 2,
    bncc: ["EM13LP15"],
    tags: ["Revisão", "Coesão", "Gêneros"],
    icon: "PenLine",
    minutes: 14,
    skills: [
      "Reescrever mantendo o alcance das fontes",
      "Adequar gênero e registro ao público",
      "Organizar método, resultado e limite",
    ],
    objective:
      "Editar textos claros e adequados sem inventar relações causais ou estigmatizar variedades linguísticas.",
  },
  {
    id: "tese-antitese",
    title: "Tese e Antítese",
    tagline: "A objeção pode melhorar a proposta.",
    description:
      "Negocie teses com demanda, custos e objeções; construa uma síntese condicionada a critérios e avaliação.",
    area: "linguagens",
    level: 3,
    bncc: ["EM13LGG303"],
    tags: ["Debate", "Argumentação", "Deliberação"],
    icon: "Scale",
    minutes: 16,
    skills: [
      "Sustentar tese com dado pertinente e limite",
      "Responder a objeções revisando meios",
      "Explicitar condição e critério de avaliação",
    ],
    objective:
      "Formular e negociar posições diante de perspectivas distintas e restrições documentadas.",
  },
  {
    id: "discurso-em-rede",
    title: "Discurso em Rede",
    tagline: "Título, corte e trilha também argumentam.",
    description:
      "Reedite um vídeo, examine escalas de gráfico e reveja a curadoria de um feed para preservar sentido e diversidade.",
    area: "linguagens",
    level: 4,
    bncc: ["EM13LP14", "EM13LP41", "EM13LGG704"],
    tags: ["Multimodalidade", "Curadoria", "Cultura digital"],
    icon: "Network",
    minutes: 17,
    skills: [
      "Analisar efeitos de montagem e modalização",
      "Confrontar gráfico e afirmação causal",
      "Declarar critérios e limites de curadoria",
    ],
    objective:
      "Avaliar como modos e seleção de conteúdo constroem sentidos e orientar uma reedição responsável.",
  },
  {
    id: "autoria-em-debate",
    title: "Autoria em Debate",
    tagline: "Interpretar, adaptar e publicar têm responsáveis.",
    description:
      "Argumente uma leitura poética, avalie um remix e organize créditos e fontes de um podcast coletivo.",
    area: "linguagens",
    level: 5,
    bncc: ["EM13LP46", "EM13LP49", "EM13LGG703"],
    tags: ["Literatura", "Autoria", "Produção coletiva"],
    icon: "Palette",
    minutes: 18,
    skills: [
      "Apoiar interpretação em escolhas textuais",
      "Distinguir autoria, performance e adaptação",
      "Rastrear contribuição, fonte e revisão editorial",
    ],
    objective:
      "Justificar decisões de interpretação e produção coletiva com crédito, contexto e responsabilidade.",
  },
  {
    id: "orcamento-limite",
    title: "Orçamento no Limite",
    tagline: "A prestação cabe. O plano se sustenta?",
    description:
      "Investigue três propostas: orçamento mensal, juros simples e compostos com pagamento único e meta de depósitos. Teste hipóteses sem tratar uma taxa ou percentual como garantia.",
    area: "matematica",
    level: 1,
    bncc: ["EM13MAT303", "EM13MAT304", "EM13MAT203"],
    tags: ["Educação financeira", "Juros", "Porcentagem"],
    icon: "Wallet",
    minutes: 25,
    skills: [
      "Comparar custo total e margem mensal",
      "Distinguir juros simples e compostos",
      "Testar uma meta com rendimento zero",
    ],
    objective:
      "Decidir sobre cenários financeiros declarando orçamento, calendário de pagamentos e limites do modelo.",
  },
  {
    id: "funcao-viva",
    title: "Função Viva",
    tagline: "A regra precisa encontrar o dado.",
    description:
      "Construa uma tarifa afim, investigue um lucro quadrático com restrição e confronte uma reta com nova medição. Expresse unidades, domínio, erro e condições de validade.",
    area: "matematica",
    level: 2,
    bncc: ["EM13MAT302", "EM13MAT401", "EM13MAT503"],
    tags: ["Funções", "Modelagem", "Validação"],
    icon: "TrendingUp",
    minutes: 30,
    skills: [
      "Relacionar tabela e expressão afim",
      "Comparar vértice e melhor ponto viável",
      "Interpretar resíduo e extrapolação",
    ],
    objective:
      "Construir e validar modelos afins e quadráticos considerando unidades, domínio e restrições.",
  },
  {
    id: "risco-provavel",
    title: "Risco Provável",
    tagline: "O acaso não paga dívidas de uma sequência.",
    description:
      "Compare retiradas com e sem reposição, frequências de séries e valor esperado de uma rifa didática. Distingua chances, resultados possíveis e critérios de justiça.",
    area: "matematica",
    level: 3,
    bncc: ["EM13MAT312", "EM13MAT311", "EM13MAT511"],
    tags: ["Probabilidade", "Estatística", "Risco"],
    icon: "Dices",
    minutes: 30,
    skills: [
      "Calcular eventos sucessivos condicionais",
      "Distinguir frequência e probabilidade",
      "Interpretar valor esperado e equiprobabilidade",
    ],
    objective:
      "Avaliar mecanismos aleatórios e decisões de risco explicitando eventos, hipóteses e critérios.",
  },
  {
    id: "dados-sob-lupa",
    title: "Dados sob Lupa",
    tagline: "O número está certo. A conclusão também?",
    description:
      "Investigue medida de tempo típico, pesquisa com pesos por turno e alegação de efeito de uma ferramenta. Compare dispersão, representatividade e inferência causal.",
    area: "matematica",
    level: 4,
    bncc: ["EM13MAT102", "EM13MAT202", "EM13MAT316"],
    tags: ["Estatística", "Amostragem", "Causalidade"],
    icon: "ChartColumn",
    minutes: 35,
    skills: [
      "Comunicar centro e dispersão",
      "Analisar desenho amostral e ponderação",
      "Criticar alegações causais e propor investigação",
    ],
    objective:
      "Produzir conclusões estatísticas proporcionais ao desenho, à distribuição e às limitações dos dados.",
  },
  {
    id: "modelos-em-disputa",
    title: "Modelos em Disputa",
    tagline: "Valide, compare, recomende com margem.",
    description:
      "Confronte crescimento linear e exponencial com dado reservado, otimize produção com duas restrições e planeje água sob chuva incerta. Reavalie conclusões em cenários desfavoráveis.",
    area: "matematica",
    level: 5,
    bncc: ["EM13MAT302", "EM13MAT304", "EM13MAT301", "EM13MAT103"],
    tags: ["Modelagem", "Otimização", "Incerteza"],
    icon: "GitCompareArrows",
    minutes: 40,
    skills: [
      "Validar modelos com dados independentes",
      "Otimizar sob restrições simultâneas",
      "Testar sensibilidade e robustez da decisão",
    ],
    objective:
      "Integrar modelos, restrições, unidades e cenários para formular uma recomendação com condições de revisão.",
  },
  {
    id: "circuito-falhou",
    title: "O Circuito Falhou",
    tagline: "Meça o caminho e os limites da fonte.",
    description:
      "Diagnostique abertura de circuito, compare ramos em série e paralelo e introduza resistência interna. Bancadas virtuais mostram corrente, potência e limites das analogias com equipamentos reais.",
    area: "natureza",
    level: 1,
    bncc: ["EM13CNT107", "EM13CNT101"],
    tags: ["Física", "Circuitos", "Energia"],
    icon: "Zap",
    minutes: 25,
    skills: [
      "Relacionar tensão, resistência e corrente",
      "Interpretar associações e falhas de ramos",
      "Comparar fontes ideais e não ideais",
    ],
    objective:
      "Explicar funcionamento de circuitos por medições e modelos de transformação de energia com limites de segurança.",
  },
  {
    id: "reacao-equilibrada",
    title: "Reação Equilibrada",
    tagline: "A equação fecha. O estoque basta?",
    description:
      "Balanceie a síntese da água, teste o oxigênio na combustão de metano e feche massas e rendimento na reação do etano. Separe conservação, disponibilidade e produto teórico.",
    area: "natureza",
    level: 2,
    bncc: ["EM13CNT101", "EM13CNT301"],
    tags: ["Química", "Estequiometria", "Conservação"],
    icon: "FlaskConical",
    minutes: 30,
    skills: [
      "Conservar átomos alterando coeficientes",
      "Identificar reagente limitante",
      "Relacionar mol, massa e rendimento",
    ],
    objective:
      "Justificar previsões químicas por conservação, estoque e fronteira do sistema, reconhecendo limites da rota modelada.",
  },
  {
    id: "gene-dilema",
    title: "Dilema do Gene",
    tagline: "Variação primeiro, seleção depois.",
    description:
      "Investigue herança em espécie fictícia, sobrevivência diferencial e pressão neutra à cor. Compare probabilidade, contagens e frequência sem atribuir intenção ao ambiente.",
    area: "natureza",
    level: 3,
    bncc: ["EM13CNT205", "EM13CNT301"],
    tags: ["Biologia", "Genética", "Evolução"],
    icon: "Dna",
    minutes: 30,
    skills: [
      "Distinguir dominância, expressão e frequência",
      "Explicar seleção de variantes herdáveis",
      "Reconhecer limites de contagens e evidências reprodutivas",
    ],
    objective:
      "Interpretar modelos de herança e seleção em nível populacional, explicitando probabilidade, incerteza e limites.",
  },
  {
    id: "ecossistema-em-alerta",
    title: "Ecossistema em Alerta",
    tagline: "Conecte o mecanismo à evidência ambiental.",
    description:
      "Diferencie fluxo de energia e ciclos de matéria, avalie nutrientes e oxigênio em ensaio controlado e revise um inventário com detecção desigual. Proponha cuidado e monitoramento.",
    area: "natureza",
    level: 4,
    bncc: ["EM13CNT105", "EM13CNT203", "EM13CNT206"],
    tags: ["Ecologia", "Biodiversidade", "Investigação"],
    icon: "Leaf",
    minutes: 35,
    skills: [
      "Distinguir fluxo energético e ciclos materiais",
      "Relacionar intervenção, mecanismo e controle",
      "Comparar inventários considerando detecção",
    ],
    objective:
      "Avaliar intervenções ambientais integrando processos ecológicos, desenho de investigação e limites de generalização.",
  },
  {
    id: "energia-em-transicao",
    title: "Energia em Transição",
    tagline: "A conta orienta. Os critérios decidem.",
    description:
      "Compare iluminação equivalente, geração com bateria e mistura de fontes com fatores didáticos de emissão. Avalie variabilidade, perdas e impactos além de um único indicador.",
    area: "natureza",
    level: 5,
    bncc: ["EM13CNT106", "EM13CNT107", "EM13CNT101"],
    tags: ["Energia", "Tecnologia", "Sustentabilidade"],
    icon: "BatteryCharging",
    minutes: 40,
    skills: [
      "Relacionar potência, tempo e energia",
      "Avaliar geração variável e armazenamento",
      "Integrar indicadores e critérios socioambientais",
    ],
    objective:
      "Formular recomendações tecnológicas condicionais com balanços de energia, cenários e avaliação participativa de impactos.",
  },
  {
    id: "fonte-historica",
    title: "Fonte Histórica",
    tagline: "O arquivo guarda vestígios e também lacunas.",
    description:
      "Compare fotografias, cartas, relatórios e memórias; investigue proveniência, intenção e silenciamentos.",
    area: "humanas",
    level: 1,
    bncc: ["EM13CHS101"],
    tags: ["História", "Memória", "Fontes"],
    icon: "ScrollText",
    minutes: 13,
    skills: [
      "Identificar proveniência e incerteza de datação",
      "Confrontar fontes com públicos e tempos distintos",
      "Construir hipótese e registrar lacunas",
    ],
    objective:
      "Comparar fontes históricas com crítica de contexto, sem tomar um documento como verdade total.",
  },
  {
    id: "territorio-disputa",
    title: "Território em Disputa",
    tagline: "O mapa mostra posições. O plano precisa mostrar prioridades.",
    description:
      "Aloque projetos num mapa textual, compare acesso e simule chuva e permeabilidade; combine obras com orçamento e avaliação.",
    area: "humanas",
    level: 2,
    bncc: ["EM13CHS206", "EM13CHS606"],
    tags: ["Geografia", "Território", "Planejamento"],
    icon: "Map",
    minutes: 16,
    skills: [
      "Relacionar localização, conexão e função",
      "Combinar suscetibilidade e acesso de usuários",
      "Justificar prioridades e custo de oportunidade",
    ],
    objective:
      "Propor uso do território e investimentos a partir de camadas físicas, sociais e orçamentárias.",
  },
  {
    id: "dilema-etico",
    title: "Dilema Ético",
    tagline: "O resultado importa. Quem suporta o custo também.",
    description:
      "Pondere equidade no apoio escolar, renda e tempo de uma adulta e dignidade em uma campanha solidária.",
    area: "humanas",
    level: 3,
    bncc: ["EM13CHS501", "EM13CHS502"],
    tags: ["Filosofia", "Ética", "Equidade"],
    icon: "Scale",
    minutes: 16,
    skills: [
      "Distinguir igualdade de oferta e acesso concreto",
      "Ponderar consequências e responsabilidades",
      "Justificar uma alternativa com revisão e dignidade",
    ],
    objective:
      "Deliberar sobre conflitos de valores e condições de participação sem reduzir pessoas a um placar.",
  },
  {
    id: "trabalho-em-transformacao",
    title: "Trabalho em Transformação",
    tagline: "Produção, renda e cuidado contam histórias diferentes.",
    description:
      "Investigue automação, renda por tempo total em plataformas e cuidado sem remuneração; proponha condições de acesso e diálogo.",
    area: "humanas",
    level: 4,
    bncc: ["EM13CHS401", "EM13CHS402", "EM13CHS403"],
    tags: ["Sociologia", "Trabalho", "Tecnologia"],
    icon: "BriefcaseBusiness",
    minutes: 18,
    skills: [
      "Separar produtividade e distribuição dos ganhos",
      "Comparar renda com custos e tempo dedicado",
      "Investigar divisão do cuidado e barreiras de formação",
    ],
    objective:
      "Analisar relações e desigualdades do trabalho diante de mudanças técnicas e propor alternativas fundamentadas.",
  },
  {
    id: "pacto-democratico",
    title: "Pacto Democrático",
    tagline: "Uma regra precisa responder a quem ficou de fora.",
    description:
      "Examine consultas, distribua recursos por critérios públicos e revise instituições com dados, escuta e controle social.",
    area: "humanas",
    level: 5,
    bncc: ["EM13CHS501", "EM13CHS606"],
    tags: ["Cidadania", "Democracia", "Políticas públicas"],
    icon: "Landmark",
    minutes: 18,
    skills: [
      "Examinar acesso e legitimidade de consultas",
      "Combinar critérios, orçamento e participação",
      "Revisar regras com efeitos distribuídos e justificativa",
    ],
    objective:
      "Deliberar sobre políticas e procedimentos coletivos com inclusão, transparência e possibilidade de revisão.",
  },
];

export const GAME_BY_ID: Record<string, GameMeta> = Object.fromEntries(GAMES.map((g) => [g.id, g]));

export function gamesByArea(area: AreaId): GameMeta[] {
  return GAMES.filter((g) => g.area === area);
}

export const LEVEL_ORDER: Level[] = [1, 2, 3, 4, 5];
