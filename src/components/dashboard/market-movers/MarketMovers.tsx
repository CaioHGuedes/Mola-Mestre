"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "@/app/services/topstock";
import { StockCard } from "./StockCard";
import { EmptyCard } from "./EmptyCard";
import { Stock } from "@/types/actives";

const STOCKS = ["PETR4", "MGLU3", "VALE3", "ITUB4"];

export function MarketMovers() {
  const { data: stocks, isLoading } = useQuery<Stock[]>({
    queryKey: ["market-movers"],
    queryFn: () => fetchStocks(STOCKS),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="h-36 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-36 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  const sortedStocks = (stocks || []).sort(
    (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
  );

  const best = sortedStocks[0];
  const worst = sortedStocks[sortedStocks.length - 1];

  const marketIsAllRed = best && best.regularMarketChangePercent < 0;
  const marketIsAllGreen = worst && worst.regularMarketChangePercent > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {marketIsAllRed ? (
        <EmptyCard type="high" />
      ) : (
        best && <StockCard stock={best} type="high" />
      )}

      {marketIsAllGreen ? (
        <EmptyCard type="low" />
      ) : (
        worst && <StockCard stock={worst} type="low" />
      )}
    </div>
  );
}
