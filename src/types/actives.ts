export type TransactionType = "COMPRA" | "VENDA";

export interface Transaction {
  id: string;
  ticker: string;
  quantidade: number;
  preco: number;
  tipo: TransactionType;
  data: string;
}

export interface CreateTransactionDTO {
  ticker: string;
  tipo: TransactionType;
  quantidade: number;
  preco: number;
  data: Date | string;
}

export interface DividendItem {
  assetIssued: string;
  paymentDate: string;
  rate: number;
  label: string;
}

export interface Stock {
  symbol: string;
  shortName: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  logourl?: string;
  dividendsData?: {
    cashDividends?: DividendItem[];
  };
}

export type MoverType = "high" | "low";
