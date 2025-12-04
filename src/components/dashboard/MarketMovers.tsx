"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchStocks } from "@/app/services/topstock";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";

const STOCKS = ["PETR4", "MGLU3", "VALE3", "ITUB4"];

export function MarketMovers() {
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["market-movers"],
    queryFn: () => fetchStocks(STOCKS),
    refetchInterval: 30000,
  });

  if (isLoading)
    return <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />;

  const sortedStocks = (stocks || []).sort(
    (a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent
  );

  const best = sortedStocks[0];
  const worst = sortedStocks[sortedStocks.length - 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
            <ArrowUp className="w-4 h-4" /> Destaque de Alta
          </CardTitle>
        </CardHeader>
        <CardContent>
          {best && (
            <div className="flex items-center gap-4">
              {best.logourl && (
                <Image
                  src={best.logourl}
                  alt={best.symbol}
                  width={40}
                  height={40}
                  className="rounded-full shadow-sm"
                />
              )}
              <div>
                <h4 className="text-2xl font-bold text-gray-800">
                  {best.symbol}
                </h4>
                <p className="text-green-600 font-bold text-lg">
                  +{best.regularMarketChangePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-white border-red-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
            <ArrowDown className="w-4 h-4" /> Destaque de Baixa
          </CardTitle>
        </CardHeader>
        <CardContent>
          {worst && (
            <div className="flex items-center gap-4">
              {worst.logourl && (
                <Image
                  src={worst.logourl}
                  alt={worst.symbol}
                  width={40}
                  height={40}
                  className="rounded-full shadow-sm"
                />
              )}
              <div>
                <h4 className="text-2xl font-bold text-gray-800">
                  {worst.symbol}
                </h4>
                <p
                  className={`font-bold text-lg ${
                    worst.regularMarketChangePercent >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {worst.regularMarketChangePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
