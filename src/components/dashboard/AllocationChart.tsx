"use client";

import { PieChart as PieIcon } from "lucide-react";
import { Pie, PieChart, Label } from "recharts";
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
import { AllocationDataItem } from "@/types/dashboard";

interface AllocationChartProps {
  data: AllocationDataItem[];
  totalPatrimony: number;
  config: ChartConfig;
}

export function AllocationChart({
  data,
  totalPatrimony,
  config,
}: AllocationChartProps) {
  const hasData = data && data.length > 0;

  return (
    <Card className="flex flex-col border-none shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <PieIcon className="w-5 h-5 text-blue-600" /> Alocação da Carteira
        </CardTitle>
        <CardDescription>Onde seu dinheiro está investido</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {!hasData ? (
          <ChartEmptyState
            icon={PieIcon}
            title="Carteira Vazia"
            description="Você ainda não possui ativos alocados. Cadastre suas primeiras compras para visualizar o gráfico."
          />
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4 h-full">
            <div className="w-full md:w-1/2 aspect-square max-h-[220px]">
              <ChartContainer config={config} className="mx-auto w-full h-full">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="ticker"
                    innerRadius={55}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-gray-900 text-xl font-bold"
                              >
                                R$ {(totalPatrimony / 1000).toFixed(1)}k
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 20}
                                className="fill-gray-500 text-xs"
                              >
                                Total
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>

            <div className="w-full md:w-1/2 space-y-3">
              {data.map((item) => (
                <div
                  key={item.ticker}
                  className="flex items-center justify-between text-sm group cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item.ticker}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-gray-900">
                      {((item.value / totalPatrimony) * 100).toFixed(1)}%
                    </span>
                    <span className="block text-xs text-gray-400">
                      R$ {(item.value / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
