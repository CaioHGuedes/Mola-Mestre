"use client";

import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Trophy, BrainCircuit } from "lucide-react";
import { QuizLevelCard } from "./QuizLevelCard";
import { Dificuldade } from "@/types/quiz";

interface QuizMenuProps {
  onStart: (nivel: Dificuldade) => void;
}

export function QuizMenu({ onStart }: QuizMenuProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full space-y-8 text-center"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#014635] mb-3 flex justify-center items-center gap-3">
            <BrainCircuit className="w-12 h-12" /> Desafio Financeiro
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Teste os seus conhecimentos. Selecione a dificuldade:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <QuizLevelCard
            title="Fácil"
            icon={<BookOpen className="w-8 h-8 text-green-600" />}
            desc="Conceitos básicos e definições."
            color="border-green-100 hover:border-green-500 hover:bg-green-50/50"
            onClick={() => onStart("Fácil")}
          />
          <QuizLevelCard
            title="Médio"
            icon={<TrendingUp className="w-8 h-8 text-amber-500" />}
            desc="Análise de ativos e indicadores."
            color="border-amber-100 hover:border-amber-500 hover:bg-amber-50/50"
            onClick={() => onStart("Médio")}
          />
          <QuizLevelCard
            title="Difícil"
            icon={<Trophy className="w-8 h-8 text-red-500" />}
            desc="Derivativos e Macroeconomia."
            color="border-red-100 hover:border-red-500 hover:bg-red-50/50"
            onClick={() => onStart("Difícil")}
          />
        </div>
      </motion.div>
    </div>
  );
}
