"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchStocks } from "@/app/services/topstock";
import { Loader2 } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";

import { DashboardHeader } from "./DashboardHeader";
import { GoalProgressWidget } from "./GoalProgressWidget";
import { NewsFlashWidget } from "./NewsFlashWidget";
import { MarketMovers } from "./market-movers/MarketMovers";

import { AllocationChart } from "@/components/dashboard/AllocationChart";
import { ResultsChart } from "@/components/dashboard/ResultsChart";

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
          <AllocationChart
            data={dashboardData.pieData}
            totalPatrimony={dashboardData.totalPatrimony}
            config={dashboardData.pieConfig}
          />
        </motion.div>

        <motion.div
          className="lg:col-span-7 h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ResultsChart data={dashboardData.barData} />
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
