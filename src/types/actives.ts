export interface TransactionPayload {
  ticker: string;
  tipo: "COMPRA" | "VENDA";
  quantidade: number;
  preco: number;
  data: Date;
}

export interface Transaction extends TransactionPayload {
  _id: string;
}

export interface DashboardItem {
  ticker: string;
  quantidade: number;
  precoMedio: number;
  totalInvestido: number;
  precoAtual: number;
  saldoAtual: number;
  rentabilidadeVal: number;
  rentabilidadePerc: number;
  variacaoDia: number;
  logoUrl?: string;
}
