"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StockCard } from "./StockCard";
import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "@/app/services/topstock";

const TEST_STOCKS = ["PETR4", "MGLU3", "VALE3", "ITUB4"];

export function TopStocksTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => fetchStocks(TEST_STOCKS),
    refetchInterval: 30000,
  });

  if (error)
    return <div className="text-red-600 p-4">Erro ao carregar dados</div>;

  const stocks = (data || [])
    .filter((s) => s.regularMarketPrice > 0)
    .sort(
      (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
    );

  const topGainers = stocks
    .filter((s) => s.regularMarketChangePercent > 0)
    .slice(0, 3);
  const topLosers = stocks
    .filter((s) => s.regularMarketChangePercent < 0)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>IBOVESPA {isLoading && "(Atualizando...)"}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-green-600 font-bold mb-2">📈 Ações em alta</h3>
          {topGainers.length ? (
            topGainers.map((s) => <StockCard key={s.symbol} stock={s} />)
          ) : (
            <p>Nenhuma alta</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-red-600 font-bold mb-2">📉 Ações em queda</h3>
          {topLosers.length ? (
            topLosers.map((s) => <StockCard key={s.symbol} stock={s} />)
          ) : (
            <p>Nenhuma baixa</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
