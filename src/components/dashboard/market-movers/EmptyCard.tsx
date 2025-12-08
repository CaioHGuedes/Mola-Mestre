"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MoverType } from "@/types/market-movers";

interface EmptyCardProps {
  type: MoverType;
}

export function EmptyCard({ type }: EmptyCardProps) {
  const isHighSlot = type === "high";

  return (
    <Card className="border-none shadow-sm bg-gray-50 flex flex-col justify-center h-full relative overflow-hidden border border-gray-100">
      <div className="absolute top-0 left-0 bg-gray-200 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-wide z-10">
        {isHighSlot ? "Sem Destaque de Alta" : "Sem Destaque de Baixa"}
      </div>

      <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-2 pt-8">
        <div className="p-2 bg-gray-200/50 rounded-full">
          {isHighSlot ? (
            <TrendingDown className="w-6 h-6 text-gray-400" />
          ) : (
            <TrendingUp className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-700">
            {isHighSlot ? "Mercado em Baixa" : "Mercado em Alta"}
          </h4>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
            {isHighSlot
              ? "Nenhuma das ações monitoradas apresenta valorização no momento."
              : "Todas as ações monitoradas estão operando com valorização."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
