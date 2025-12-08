"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { User, Sun, Moon, Sunrise } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({
  userName = "Investidor",
}: DashboardHeaderProps) {
  const {
    greeting,
    icon: Icon,
    message,
    color,
  } = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return {
        greeting: "Bom dia",
        icon: Sunrise,
        message: "O mercado está abrindo com oportunidades.",
        color: "text-amber-500",
      };
    } else if (hour >= 12 && hour < 18) {
      return {
        greeting: "Boa tarde",
        icon: Sun,
        message: "Acompanhe o fechamento das suas posições.",
        color: "text-orange-500",
      };
    } else {
      return {
        greeting: "Boa noite",
        icon: Moon,
        message: "Hora de planejar o dia de amanhã.",
        color: "text-indigo-500",
      };
    }
  }, []);

  return (
    <motion.div
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
          <User className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {greeting}, {userName}
            <Icon className={`w-5 h-5 ${color}`} />
          </h1>
          <p className="text-gray-500 text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}
