"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchStocks } from "@/app/services/topstock";
import { Loader2, PieChart as PieIcon, BarChart3 } from "lucide-react";

import { DashboardHeader } from "./DashboardHeader";
import { GoalProgressWidget } from "./GoalProgressWidget";
import { NewsFlashWidget } from "./NewsFlashWidget";
import { MarketMovers } from "./MarketMovers";

interface Transaction {
  id: string;
  ticker: string;
  quantidade: number | string;
  preco: number | string;
  tipo: "COMPRA" | "VENDA";
  data: string;
}
interface StockQuote {
  symbol: string;
  regularMarketPrice: number;
}
interface Position {
  ticker: string;
  quantidade: number;
  totalInvestido: number;
}

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
}

const PIE_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#6366f1",
  "#64748b",
];
const barChartConfig = {
  investido: { label: "Investido", color: "#cbd5e1" },
  atual: { label: "Atual", color: "#1e293b" },
} satisfies ChartConfig;

export function DashboardOverview() {
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => (await axios.get("/api/transactions")).data,
  });

  const { data: quotes } = useQuery<StockQuote[]>({
    queryKey: ["quotes-dashboard"],
    queryFn: () => fetchStocks(["PETR4", "VALE3", "ITUB4", "MGLU3"]),
    refetchInterval: 60000,
  });

  const { data: goals, isLoading: isLoadingGoals } = useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: async () => (await axios.get("/api/goals")).data,
  });

  const dashboardData = useMemo(() => {
    if (!transactions || !quotes) return null;
    const positionMap: Record<string, Position> = {};

    transactions.forEach((tx) => {
      const qtd = Number(tx.quantidade);
      const preco = Number(tx.preco);
      if (!positionMap[tx.ticker])
        positionMap[tx.ticker] = {
          ticker: tx.ticker,
          quantidade: 0,
          totalInvestido: 0,
        };
      const item = positionMap[tx.ticker];
      if (tx.tipo === "COMPRA") {
        item.quantidade += qtd;
        item.totalInvestido += qtd * preco;
      } else if (tx.tipo === "VENDA") {
        const pm =
          item.quantidade > 0 ? item.totalInvestido / item.quantidade : 0;
        item.quantidade -= qtd;
        item.totalInvestido = item.quantidade * pm;
      }
    });

    const activePositions = Object.values(positionMap).filter(
      (p) => p.quantidade > 0
    );
    const pieData = activePositions
      .map((p, index) => {
        const quote = quotes.find((q) => q.symbol === p.ticker);
        const currentPrice = quote?.regularMarketPrice || 0;
        return {
          ticker: p.ticker,
          value: p.quantidade * currentPrice,
          fill: PIE_COLORS[index % PIE_COLORS.length],
        };
      })
      .sort((a, b) => b.value - a.value);

    const barData = activePositions.map((p) => {
      const quote = quotes.find((q) => q.symbol === p.ticker);
      return {
        ticker: p.ticker,
        investido: p.totalInvestido,
        atual: p.quantidade * (quote?.regularMarketPrice || 0),
      };
    });

    const totalPatrimony = pieData.reduce((acc, curr) => acc + curr.value, 0);
    const totalInvested = activePositions.reduce(
      (acc, curr) => acc + curr.totalInvestido,
      0
    );

    const pieConfig: ChartConfig = {};
    pieData.forEach((item) => {
      pieConfig[item.ticker] = { label: item.ticker, color: item.fill };
    });

    return { pieData, barData, totalPatrimony, totalInvested, pieConfig };
  }, [transactions, quotes]);

  if (!dashboardData)
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-300" />
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 lg:col-span-8">
          <GoalProgressWidget goals={goals} isLoading={isLoadingGoals} />
        </div>
        <div className="md:col-span-5 lg:col-span-4">
          <NewsFlashWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          className="lg:col-span-5 h-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="flex flex-col border-none shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <PieIcon className="w-5 h-5 text-blue-600" /> Alocação da
                Carteira
              </CardTitle>
              <CardDescription>
                Onde seu dinheiro está investido
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/2 aspect-square max-h-[220px]">
                <ChartContainer
                  config={dashboardData.pieConfig}
                  className="mx-auto w-full h-full"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={dashboardData.pieData}
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
                                  R$
                                  {(
                                    dashboardData.totalPatrimony / 1000
                                  ).toFixed(1)}
                                  k
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
                {dashboardData.pieData.map((item) => (
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
                        {(
                          (item.value / dashboardData.totalPatrimony) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="block text-xs text-gray-400">
                        R$ {(item.value / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-7 h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-none shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <BarChart3 className="w-5 h-5 text-blue-600" /> Resultado por
                Ativo
              </CardTitle>
              <CardDescription>
                Comparativo: Valor Investido vs. Valor de Mercado
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ChartContainer
                config={barChartConfig}
                className="h-[300px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={dashboardData.barData}
                  barGap={4}
                >
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
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MarketMovers />
      </motion.div>
    </div>
  );
}
