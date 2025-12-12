"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Target, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Goal } from "@/types/goals";

interface GoalProgressWidgetProps {
  goals?: Goal[];
  isLoading?: boolean;
}

export function GoalProgressWidget({
  goals = [],
  isLoading,
}: GoalProgressWidgetProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/goals");
  };

  if (isLoading) {
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />
    );
  }

  const hasGoals = goals && goals.length > 0;

  if (!hasGoals) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleNavigate}
        className="h-full cursor-pointer group"
      >
        <div className="h-full w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-400 transition-all p-6">
          <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-800">Definir Nova Meta</p>
            <p className="text-xs text-gray-500 mt-1">
              Você ainda não tem objetivos cadastrados.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const mainGoal = goals[0];
  const percentage = Math.min(
    (mainGoal.currentAmount / mainGoal.targetAmount) * 100,
    100
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="cursor-pointer group h-full"
      onClick={handleNavigate}
    >
      <Card className="h-full border-none shadow-md bg-gradient-to-r from-[#014635] to-[#026e57] text-white overflow-hidden relative transition-transform hover:scale-[1.01]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-white/10" />

        <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-emerald-100/80 text-xs font-medium uppercase tracking-wider">
                  Meta Principal
                </p>
                <h3 className="text-lg font-bold truncate max-w-[200px]">
                  {mainGoal.title}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">
                {percentage.toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm text-emerald-50 font-medium">
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(mainGoal.currentAmount)}
              </span>
              <span className="opacity-70">
                Meta:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(mainGoal.targetAmount)}
              </span>
            </div>

            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
