export interface NewsItem {
  id: number;
  tag: "MERCADO" | "FIIS" | "CRIPTO" | "MACRO" | "AÇÕES";
  title: string;
  excerpt: string;
  content: string;
  time: string;
  readTime: string;
  sentiment: "positive" | "negative" | "neutral";
}

export const ALL_NEWS: NewsItem[] = [
  {
    id: 1,
    tag: "MERCADO",
    title: "Ibovespa renova máxima histórica impulsionado por Vale e Petrobras",
    excerpt:
      "O principal índice da bolsa brasileira descolou de Wall Street e garantiu ganhos expressivos no pregão de hoje, superando a barreira dos 130 mil pontos.",
    content: `O Ibovespa encerrou o pregão desta terça-feira em forte alta, impulsionado principalmente pelo desempenho das commodities no mercado internacional. Vale (VALE3) e Petrobras (PETR4) foram os grandes destaques, aproveitando a alta do minério de ferro na China e do petróleo Brent, respectivamente.

O índice fechou com valorização de 1,8%, atingindo sua nova máxima histórica nominal. O otimismo foi reforçado pela entrada de capital estrangeiro, que vê na bolsa brasileira múltiplos descontados em comparação aos pares emergentes.

Analistas do banco BTG Pactual apontam que o cenário externo, com a estabilização dos juros nos EUA, cria um ambiente favorável para ativos de risco em países emergentes, e o Brasil desponta como favorito devido à sua balança comercial robusta.

"O investidor estrangeiro voltou a olhar para o Brasil com bons olhos. Temos empresas sólidas pagando bons dividendos e negociando a preços atrativos", comentou João Silva, analista chefe da InvestCorp.`,
    time: "10:30",
    readTime: "4 min",
    sentiment: "positive",
  },
  {
    id: 2,
    tag: "MACRO",
    title: "Inflação nos EUA (CPI) vem acima do esperado e pressiona FED",
    excerpt:
      "Dados do índice de preços ao consumidor mostram resistência nos preços de serviços, diminuindo as apostas de cortes de juros no curto prazo.",
    content: `O índice de preços ao consumidor (CPI) nos Estados Unidos subiu 0,4% no mês passado, superando as expectativas do mercado que aguardava uma alta de 0,3%. No acumulado de 12 meses, a inflação americana persiste acima da meta de 2% do Federal Reserve.

Este dado cai como um balde de água fria sobre os investidores que precificavam um corte de juros já na próxima reunião do FED. Com a inflação de serviços mostrando resiliência, Jerome Powell deve manter o discurso de "juros altos por mais tempo" (higher for longer).

Como reflexo imediato, os rendimentos dos Treasuries (títulos do tesouro americano) de 10 anos dispararam para 4,30%, drenando liquidez dos mercados de renda variável globais e fortalecendo o Dólar frente ao Real.`,
    time: "09:15",
    readTime: "5 min",
    sentiment: "negative",
  },
  {
    id: 3,
    tag: "CRIPTO",
    title: "Bitcoin rompe resistência dos US$ 70.000 com forte fluxo de ETFs",
    excerpt:
      "A criptomoeda líder de mercado atinge novos patamares de preço impulsionada pela demanda institucional da BlackRock e Fidelity.",
    content: `O Bitcoin (BTC) registrou uma nova máxima histórica nesta manhã, superando a marca psicológica de US$ 70.000. O movimento é atribuído à demanda contínua e massiva pelos ETFs de Bitcoin à vista (spot) aprovados recentemente nos Estados Unidos.

Somente o fundo IBIT, da BlackRock, registrou entradas líquidas de US$ 500 milhões em um único dia, absorvendo muito mais moedas do que a rede é capaz de produzir diariamente.

Além do choque de demanda institucional, o mercado se prepara para o "Halving", evento programado para o próximo mês que cortará a emissão de novos Bitcoins pela metade, criando um potencial choque de oferta.

"Nunca vimos um cenário onde a demanda institucional encontra um choque de oferta programado. O ciclo de alta pode estar apenas começando", afirma relatório da Hashdex.`,
    time: "08:00",
    readTime: "6 min",
    sentiment: "positive",
  },
  {
    id: 4,
    tag: "FIIS",
    title: "MXRF11 anuncia dividendos recordes e novas aquisições",
    excerpt:
      "O fundo imobiliário com maior número de cotistas da B3 surpreendeu o mercado com rendimentos muito acima da média do setor.",
    content: `O Maxi Renda (MXRF11), fundo imobiliário mais popular do Brasil com mais de 1 milhão de cotistas, anunciou ontem à noite o pagamento de dividendos de R$ 0,13 por cota, representando um dividend yield mensal de aproximadamente 1,20% isento de imposto de renda.

O resultado excepcional foi impulsionado pela rotação de portfólio da carteira de CRIs (Certificados de Recebíveis Imobiliários) e pelo ganho de capital em permutas financeiras.

A gestão do fundo também comunicou a aquisição de novos ativos atrelados ao IPCA+9%, buscando proteger o patrimônio dos cotistas contra a inflação no longo prazo. Especialistas recomendam atenção ao valor patrimonial da cota, que atualmente negocia com um ágio relevante no mercado secundário.`,
    time: "Ontem",
    readTime: "3 min",
    sentiment: "positive",
  },
  {
    id: 5,
    tag: "AÇÕES",
    title: "Varejistas sofrem na Bolsa com abertura da curva de juros futura",
    excerpt:
      "Magazine Luiza (MGLU3) e Casas Bahia (BHIA3) lideram as perdas do dia com a piora nas projeções fiscais do governo.",
    content: `O setor de varejo e consumo discricionário enfrenta mais um dia difícil na B3. Com a divulgação de novos dados fiscais que mostram aumento do déficit público, a curva de juros futura (DI) abriu em forte alta, encarecendo o custo de capital.

Empresas como Magazine Luiza (MGLU3) e Grupo Casas Bahia (BHIA3), que possuem dívidas elevadas e operam com margens apertadas, são as mais sensíveis a esse movimento. As ações caem mais de 4% no pregão de hoje.

Analistas gráficos apontam que MGLU3 perdeu um suporte importante nos R$ 2,00 e pode buscar novas mínimas se o cenário macroeconômico não der sinais de alívio nas próximas semanas.`,
    time: "Ontem",
    readTime: "4 min",
    sentiment: "negative",
  },
  {
    id: 6,
    tag: "MACRO",
    title: "Copom sinaliza cautela e reduz ritmo de cortes da Selic para 0,25%",
    excerpt:
      "Ata da última reunião indica preocupação com a desancoragem das expectativas de inflação para 2025 e 2026.",
    content: `Em decisão dividida, o Comitê de Política Monetária (Copom) do Banco Central optou por reduzir o ritmo de cortes da taxa Selic. O corte, que vinha sendo de 0,50 ponto percentual, passou para 0,25 p.p., levando a taxa básica de juros para 10,50% ao ano.

Na ata divulgada hoje, o comitê cita a incerteza fiscal doméstica e o cenário externo adverso como razões para adotar uma postura mais conservadora. O objetivo é garantir a convergência da inflação para a meta.

O mercado reagiu com volatilidade. Por um lado, juros mais altos por mais tempo prejudicam o crescimento econômico; por outro, a postura firme do Banco Central reforça a credibilidade da autoridade monetária, o que pode ajudar a controlar o dólar no médio prazo.`,
    time: "Há 2 dias",
    readTime: "5 min",
    sentiment: "neutral",
  },
  {
    id: 7,
    tag: "AÇÕES",
    title: "WEG (WEGE3) supera estimativas e anuncia programa de recompra",
    excerpt:
      "A gigante de motores elétricos continua entregando crescimento robusto, desta vez impulsionado pelo segmento de transmissão e distribuição.",
    content: `A WEG (WEGE3) reportou lucro líquido de R$ 1,74 bilhão no último trimestre, um crescimento de 13,5% na comparação anual, superando as estimativas mais otimistas de Wall Street e da Faria Lima.

O destaque positivo veio das operações no exterior e do segmento de Transmissão & Distribuição (T&D), que compensaram a demanda mais fraca por motores industriais de ciclo curto no Brasil. A margem EBITDA da companhia atingiu impressionantes 22%.

Junto com o resultado, o conselho de administração aprovou um novo programa de recompra de ações, sinalizando aos investidores que a administração considera que os papéis estão baratos na bolsa. As ações sobem 3% hoje.`,
    time: "Há 2 dias",
    readTime: "3 min",
    sentiment: "positive",
  },
  {
    id: 8,
    tag: "FIIS",
    title: "IFIX opera de lado aguardando definição sobre tributação",
    excerpt:
      "Índice de fundos imobiliários mostra estabilidade enquanto congresso discute reforma tributária que pode afetar o setor.",
    content: `O IFIX, índice que mede o desempenho médio dos fundos imobiliários listados na B3, opera próximo da estabilidade nesta semana, com investidores em modo de espera.

A pauta principal é a regulamentação da Reforma Tributária. Embora o texto base mantenha a isenção de dividendos para pessoas físicas nos FIIs, há receios sobre possíveis emendas que poderiam alterar a tributação sobre o ganho de capital ou sobre os rendimentos dos CRIs e CRAs na carteira dos fundos de papel.

Setorialmente, os fundos de tijolo (Lajes Corporativas e Shoppings) têm performado melhor que os fundos de papel nas últimas semanas, antecipando uma eventual queda de juros no segundo semestre.`,
    time: "Há 3 dias",
    readTime: "4 min",
    sentiment: "neutral",
  },
];
