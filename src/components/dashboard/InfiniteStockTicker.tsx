"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "@/app/services/topstock";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";

const TICKER_SYMBOLS = ["PETR4", "VALE3", "ITUB4", "MGLU3"];

export function InfiniteStockTicker() {
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["ticker-stocks"],
    queryFn: () => fetchStocks(TICKER_SYMBOLS),
    refetchInterval: 60000,
  });

  if (isLoading || !stocks) {
    return (
      <div className="w-full h-12 bg-white border-b border-gray-200 flex items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
      </div>
    );
  }

  const loopStocks = [...stocks, ...stocks, ...stocks];

  return (
    <div className="w-full bg-white text-gray-900 py-2 overflow-hidden border-b border-gray-200 relative z-10">
      <div className="flex animate-infinite-scroll whitespace-nowrap hover:paused cursor-default">
        {loopStocks.map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="inline-flex items-center mx-8 space-x-2"
          >
            <span className="font-bold text-sm text-gray-800">
              {stock.symbol}
            </span>
            <span className="text-sm font-mono text-gray-600">
              R$ {stock.regularMarketPrice.toFixed(2)}
            </span>
            <span
              className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${
                stock.regularMarketChangePercent >= 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {stock.regularMarketChangePercent >= 0 ? (
                <TrendingUp size={12} className="mr-1" />
              ) : (
                <TrendingDown size={12} className="mr-1" />
              )}
              {stock.regularMarketChangePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
