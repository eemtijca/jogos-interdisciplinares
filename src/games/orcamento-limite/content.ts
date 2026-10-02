import type { InvestigationCase } from "../_shared/investigation-types";
import {
  choiceTask,
  evidence,
  multiTask,
  numberTask,
  parameter,
  round,
} from "../_shared/math-science-authoring";

export function compoundAmount(capital: number, ratePct: number, months: number): number {
  return capital * (1 + ratePct / 100) ** months;
}
/** Depósitos ao fim de cada mês, taxa fixa, sem custos ou tributos. */
export function savingsTotal(monthly: number, yieldPct: number, months: number): number {
  const i = yieldPct / 100;
  return i === 0 ? monthly * months : (monthly * ((1 + i) ** months - 1)) / i;
}

export const CASES: InvestigationCase[] = [
  {
    id: "mesada",
    title: "A prestação e o mês",
    focus: "Porcentagem e orçamento disponível",
    context:
      "O celular serve para estudar, mas uma prestação pequena pode esconder um custo alto. Você precisa avaliar a proposta escrita além do anúncio.",
    mission: "Comparar custo total e margem mensal.",
    evidence: [
      evidence(
        "renda",
        "Registro mensal",
        "Renda R$ 1.200; despesas essenciais R$ 750; reserva planejada R$ 150. Saldo para novas despesas R$ 300.",
      ),
      evidence(
        "oferta",
        "Proposta escrita",
        "Preço à vista R$ 1.200. Oferta: 12 prestações fixas de R$ 125, já incluindo os encargos, sem entrada.",
      ),
      evidence(
        "criterio",
        "Critério da família",
        "Preservar a reserva mensal. Um percentual da renda isoladamente não garante que uma compra caiba no orçamento.",
      ),
    ],
    model: {
      title: "Teste: caber no percentual basta?",
      expression: "Total = prestação × meses; margem = renda − essenciais − reserva − prestação",
      note: "Prestações já informadas; mudar o prazo cria outra proposta hipotética, sem recalcular juros de um banco. As tarefas usam a oferta de referência.",
      parameters: [
        parameter("prestacao", "Prestação", 50, 400, 25, 125, "R$"),
        parameter("meses", "Prestações", 1, 24, 1, 12, "meses"),
      ],
      evaluate: ({ prestacao, meses }) => [
        { label: "Total contratado", value: prestacao * meses, unit: "R$" },
        { label: "Margem mensal", value: 300 - prestacao, unit: "R$" },
        { label: "Participação na renda", value: round((prestacao / 1200) * 100), unit: "%" },
      ],
    },
    tasks: [
      numberTask(
        "total",
        "Qual total das 12 prestações de R$ 125?",
        1500,
        "R$",
        "Multiplique quantidade pelo valor de cada prestação.",
        "12 × 125 = R$ 1.500. O acréscimo é R$ 300, ou 25% do preço à vista, sem inferir taxa mensal.",
      ),
      multiTask(
        "criterios",
        "Quais dois dados avaliam se a prestação cabe no mês?",
        [
          [
            "saldo",
            "Saldo depois das despesas essenciais",
            "A renda bruta não está toda disponível.",
          ],
          ["reserva", "Reserva planejada", "O critério exige preservá-la."],
          [
            "slogan",
            "O anúncio diz que a prestação é pequena",
            "Um adjetivo não substitui o orçamento.",
          ],
        ],
        ["saldo", "reserva"],
        "Considere o saldo e o compromisso de reserva.",
        "Restam R$ 300 antes da prestação e R$ 175 depois dela.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual conclusão os registros sustentam?",
      [
        [
          "avaliar",
          "Preserva a reserva, mas custa R$ 300 a mais; comparar necessidade e pagamento à vista.",
          "Custo e margem foram considerados juntos.",
        ],
        [
          "percentual",
          "Abaixo de 30% da renda qualquer compra é segura.",
          "Não há limite percentual que garanta segurança para qualquer orçamento.",
        ],
        [
          "igual",
          "O custo é igual ao preço à vista porque a prestação cabe.",
          "Caber no mês não elimina o acréscimo.",
        ],
      ],
      "avaliar",
      "Separe capacidade mensal e custo total.",
      "A oferta tem margem neste cenário; isso não a torna a melhor compra para qualquer família.",
    ),
    conclusion: "Total de R$ 1.500 e margem mensal de R$ 175, preservando a reserva informada.",
    reflection: "Que despesa não prevista mudaria a conclusão?",
    transfer: "Compare entrada, prestações, encargos e orçamento antes de decidir outra compra.",
  },
  {
    id: "loja",
    title: "Juros de dois modos",
    focus: "Crescimento simples e composto",
    context:
      "Duas propostas devolvem R$ 1.000 emprestados apenas ao fim de quatro meses. A taxa anunciada é a mesma, mas os regimes diferem.",
    mission: "Comparar os regimes sem confundir montante e prestação.",
    evidence: [
      evidence(
        "capital",
        "Contrato didático",
        "R$ 1.000, taxa de 2% ao mês e prazo de 4 meses. Nenhum pagamento intermediário, tarifa ou tributo.",
      ),
      evidence(
        "simples",
        "Regime A",
        "Simples: cada mês acrescenta 2% do capital inicial. M = C(1 + in), com i decimal.",
      ),
      evidence(
        "compostos",
        "Regime B",
        "Compostos: cada saldo mensal é multiplicado por 1,02. M = C(1 + i)^n. Todo o montante vence no final.",
      ),
    ],
    model: {
      title: "Compare taxa e prazo iguais",
      expression: "M simples = 1000(1 + in); M composto = 1000(1 + i)^n",
      note: "Pagamento único: dividir M por n não calcula prestações com amortização mensal. Compare n = 1 e n = 4 mantendo a taxa. Tarefas usam 2% e 4 meses.",
      parameters: [
        parameter("taxa", "Taxa mensal", 0, 5, 0.5, 2, "%"),
        parameter("meses", "Prazo", 1, 12, 1, 4, "meses"),
      ],
      evaluate: ({ taxa, meses }) => [
        { label: "Montante simples", value: round(1000 * (1 + (taxa / 100) * meses)), unit: "R$" },
        { label: "Montante composto", value: round(compoundAmount(1000, taxa, meses)), unit: "R$" },
        {
          label: "Diferença",
          value: round(compoundAmount(1000, taxa, meses) - 1000 * (1 + (taxa / 100) * meses)),
          unit: "R$",
        },
      ],
    },
    tasks: [
      numberTask(
        "simples",
        "Qual montante simples vence no mês 4?",
        1080,
        "R$",
        "Cada mês soma R$ 20.",
        "1000(1 + 0,02 × 4) = R$ 1.080.",
      ),
      numberTask(
        "composto",
        "Qual montante composto vence no mês 4? Arredonde aos centavos.",
        1082.43,
        "R$",
        "Use 1000 × 1,02^4.",
        "1000 × 1,02^4 = 1.082,43216, ou R$ 1.082,43. Juros incidem sobre o saldo acumulado.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Como comunicar a comparação?",
      [
        [
          "correta",
          "B custa R$ 2,43 a mais no prazo; são pagamentos únicos.",
          "A conclusão respeita o calendário.",
        ],
        [
          "prestacao",
          "R$ 1.082,43 dividido por 4 é a prestação de todo financiamento a 2%.",
          "Amortização muda o saldo a cada pagamento; exige outro modelo.",
        ],
        [
          "iguais",
          "Taxas iguais sempre produzem montantes iguais.",
          "As bases de cálculo diferem após o primeiro mês.",
        ],
      ],
      "correta",
      "Identifique quando a dívida será paga.",
      "Taxa positiva e prazo maior que um período fazem os compostos superarem os simples neste contrato.",
    ),
    conclusion: "Comparar juros exige capital, taxa, prazo, regime e calendário de pagamentos.",
    reflection: "Por que os montantes coincidem no primeiro mês?",
    transfer:
      "Confira unidade da taxa e amortização antes de aplicar uma fórmula a outra proposta.",
  },
  {
    id: "reserva",
    title: "Meta sem promessa de rendimento",
    focus: "Acumulação e sensibilidade",
    context:
      "A certificação será em 12 meses. O notebook custa R$ 2.500 hoje. Você precisa testar se os depósitos bastam sem depender dos juros.",
    mission: "Examinar a robustez da meta e as condições do modelo.",
    evidence: [
      evidence(
        "depositos",
        "Plano mensal",
        "R$ 220 no fim de cada mês por 12 meses; saldo inicial zero; nenhum depósito faltando.",
      ),
      evidence(
        "taxa",
        "Hipótese didática",
        "Rendimento fixo de 0,5% ao mês, líquido de custos. Parâmetro matemático, não oferta ou previsão de investimento.",
      ),
      evidence(
        "meta",
        "Preço e risco",
        "Meta atual R$ 2.500. Sem rendimento, os depósitos somam R$ 2.640. O preço futuro pode mudar.",
      ),
    ],
    model: {
      title: "Teste rendimento zero",
      expression: "S = d((1 + i)^n − 1)/i; se i = 0, S = dn",
      note: "Depósitos ao fim do mês; sem inflação ou retiradas. Reduza a taxa a zero e confira a meta. Tarefas usam 12 depósitos de R$ 220.",
      parameters: [
        parameter("deposito", "Depósito mensal", 100, 300, 10, 220, "R$"),
        parameter("taxa", "Rendimento hipotético", 0, 1, 0.1, 0.5, "%"),
      ],
      evaluate: ({ deposito, taxa }) => [
        {
          label: "Saldo após 12 meses",
          value: round(savingsTotal(deposito, taxa, 12)),
          unit: "R$",
        },
        { label: "Saldo sem rendimento", value: deposito * 12, unit: "R$" },
        {
          label: "Margem sobre preço atual",
          value: round(savingsTotal(deposito, taxa, 12) - 2500),
          unit: "R$",
        },
      ],
    },
    tasks: [
      numberTask(
        "margem",
        "Sem rendimento, quanto o plano excede o preço atual?",
        140,
        "R$",
        "Subtraia a meta de 12 × 220.",
        "R$ 2.640 − R$ 2.500 = R$ 140: a meta atual não depende dos 0,5% mensais.",
      ),
      multiTask(
        "limites",
        "Quais duas mudanças podem impedir a compra?",
        [
          ["preco", "O notebook subir de preço", "A meta atual não é garantida."],
          ["falha", "Faltar um depósito", "A fórmula supõe regularidade."],
          [
            "zero",
            "Rendimento zero, mantendo preço e depósitos",
            "R$ 2.640 sem juros já cobrem a meta atual.",
          ],
        ],
        ["preco", "falha"],
        "Revise as hipóteses sobre depósitos e preço.",
        "Uma fórmula correta responde a condições definidas. Alterá-las exige atualizar a análise.",
      ),
    ],
    decision: choiceTask(
      "decisao",
      "Qual plano as evidências apoiam?",
      [
        [
          "rever",
          "Guardar R$ 220 e revisar mensalmente preço e depósitos; a meta atual fecha até sem rendimento.",
          "A conclusão considera margem e limites.",
        ],
        [
          "garantir",
          "Garantir a compra real porque o rendimento ficará fixo.",
          "O simulador não prevê rendimento ou preço futuros.",
        ],
        [
          "impossivel",
          "Desistir, pois capitalização só serve para dívida.",
          "Capitalização também descreve acumulação sob hipóteses.",
        ],
      ],
      "rever",
      "Use taxa zero como teste de sensibilidade.",
      "Um plano com margem é mais robusto, mas acompanhar preço e condições faz parte da decisão.",
    ),
    conclusion: "A meta atual fecha sem juros, com margem de R$ 140 e depósitos regulares.",
    reflection: "E se o preço subisse 10%?",
    transfer:
      "Teste a meta de R$ 2.750 e ajuste o depósito se necessário, sem depender de uma taxa prometida.",
  },
];
