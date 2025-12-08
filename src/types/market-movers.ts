export interface StockQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  logourl?: string;
}

export type MoverType = "high" | "low";
