"use client";

import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MoverType, StockQuote } from "@/types/market-movers";

interface StockCardProps {
  stock: StockQuote;
  type: MoverType;
}

export function StockCard({ stock, type }: StockCardProps) {
  const isHigh = type === "high";
  const percent = stock.regularMarketChangePercent;
  const isPositive = percent >= 0;

  const formattedPercent = `${isPositive ? "+" : ""}${percent.toFixed(2)}%`;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(stock.regularMarketPrice);

  return (
    <Card
      className={`border-none shadow-sm relative overflow-hidden flex flex-col justify-center h-full
        ${
          isHigh
            ? "bg-gradient-to-br from-emerald-50/80 to-white hover:border-emerald-200"
            : "bg-gradient-to-br from-red-50/80 to-white hover:border-red-200"
        } transition-colors border border-transparent group`}
    >
      <div
        className={`absolute top-0 left-0 text-[10px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-wide z-10 shadow-sm
        ${isHigh ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}
      >
        {isHigh ? "Melhor do Dia" : "Pior do Dia"}
      </div>

      <CardContent className="p-5 flex items-center justify-between pt-8">
        <div className="flex items-center gap-3">
          {stock.logourl ? (
            <div className="relative">
              <Image
                src={stock.logourl}
                alt={stock.symbol}
                width={48}
                height={48}
                className="rounded-full shadow-sm bg-white p-1 object-contain"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center
                 ${isPositive ? "bg-emerald-500" : "bg-red-500"}
              `}
              >
                {isPositive ? (
                  <TrendingUp className="w-2 h-2 text-white" />
                ) : (
                  <TrendingDown className="w-2 h-2 text-white" />
                )}
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-xs font-bold text-gray-400">
              IMG
            </div>
          )}

          <div>
            <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-opacity-80 transition-opacity">
              {stock.symbol}
            </h4>
            <p className="text-sm text-gray-500 font-medium">
              {formattedPrice}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`flex items-center justify-end gap-1 font-bold text-lg
            ${isPositive ? "text-emerald-600" : "text-red-600"}
          `}
          >
            {formattedPercent}
          </div>
          <p className="text-xs text-gray-400 mt-1 font-medium">Variação</p>
        </div>
      </CardContent>
    </Card>
  );
}
