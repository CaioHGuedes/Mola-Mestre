import axios from "axios";

export interface Stock {
  symbol: string;
  shortName: string;
  longName?: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketVolume: number;
  marketCap?: number;
  logourl?: string;
}

export async function fetchStocks(symbols: string[]): Promise<Stock[]> {
  const { data } = await axios.get(
    `https://brapi.dev/api/quote/${symbols.join(",")}?fundamental=true`
  );
  return data.results || [];
}
