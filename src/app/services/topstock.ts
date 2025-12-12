import axios from "axios";
import { Stock } from "@/types/actives";

export async function fetchStocks(symbols: string[]): Promise<Stock[]> {
  const token = process.env.NEXT_PUBLIC_BRAPI_TOKEN;

  if (!symbols || symbols.length === 0) return [];

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
