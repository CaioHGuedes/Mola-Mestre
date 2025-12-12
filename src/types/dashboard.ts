export interface PortfolioItem {
  ticker: string;
  quantidade: number;
  precoMedio: number;
  totalInvestido: number;
  precoAtual?: number;
  saldoAtual?: number;
  rentabilidadeVal?: number;
  rentabilidadePerc?: number;
  variacaoDia?: number;
  logoUrl?: string;
}

export interface DashboardSummary {
  patrimonioTotal: number;
  valorInvestidoTotal: number;
  lucroTotal: number;
  variacao: number;
  proventos: number;
}

export interface AllocationDataItem {
  ticker: string;
  value: number;
  fill: string;
}

export interface ResultsChartItem {
  ticker: string;
  investido: number;
  atual: number;
}
