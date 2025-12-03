import axios from "axios";

export interface DividendItem {
  assetIssued: string;
  paymentDate: string;
  rate: number;
  relatedTo: string;
  approvedOn: string;
  label: string;
}
export interface DividendsData {
  cashDividends?: DividendItem[];
}

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
  dividendsData?: DividendsData;
}

export async function fetchStocks(symbols: string[]): Promise<Stock[]> {
  const token = process.env.NEXT_PUBLIC_BRAPI_TOKEN;

  const url = `https://brapi.dev/api/quote/${symbols.join(
    ","
  )}?fundamental=true&dividends=true&token=${token}`;

  try {
    const { data } = await axios.get(url);

    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar ações na brApi:", error);
    return [];
  }
}
