"use client";

import { BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartEmptyState } from "./ChartEmptyState";

interface ResultsChartProps {
  data: {
    ticker: string;
    investido: number;
    atual: number;
  }[];
}

const barChartConfig = {
  investido: { label: "Investido", color: "#cbd5e1" },
  atual: { label: "Atual", color: "#1e293b" },
} satisfies ChartConfig;

export function ResultsChart({ data }: ResultsChartProps) {
  const hasData = data && data.length > 0;

  return (
    <Card className="border-none shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <BarChart3 className="w-5 h-5 text-blue-600" /> Resultado por Ativo
        </CardTitle>
        <CardDescription>
          Comparativo: Valor Investido vs. Valor de Mercado
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {!hasData ? (
          <ChartEmptyState
            icon={BarChart3}
            title="Sem Dados de Performance"
            description="Adicione ativos à sua carteira para ver a comparação entre valor investido e valor atual."
          />
        ) : (
          <ChartContainer config={barChartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={data} barGap={4}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="ticker"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$${value / 1000}k`}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={{ fill: "#f8fafc" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="investido"
                fill="var(--color-investido)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="atual"
                fill="var(--color-atual)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
