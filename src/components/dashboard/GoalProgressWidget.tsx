"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";
import { motion } from "framer-motion";

export function GoalProgressWidget() {
  const goal = {
    title: "Viagem Europa",
    target: 15000,
    current: 9750,
    icon: Plane,
  };

  const percentage = Math.min((goal.current / goal.target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="cursor-pointer group h-full"
    >
      <Card className="h-full border-none shadow-md bg-gradient-to-r from-[#014635] to-[#026e57] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-white/10" />

        <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                <goal.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-emerald-100/80 text-xs font-medium uppercase tracking-wider">
                  Meta Principal
                </p>
                <h3 className="text-lg font-bold">{goal.title}</h3>
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
              <span>R$ {goal.current.toLocaleString("pt-BR")}</span>
              <span className="opacity-70">
                Meta: R$ {goal.target.toLocaleString("pt-BR")}
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
