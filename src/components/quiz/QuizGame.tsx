"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Dificuldade, QuizQuestion } from "@/types/quiz";

interface QuizGameProps {
  pergunta: QuizQuestion;
  indiceAtual: number;
  totalPerguntas: number;
  dificuldade: Dificuldade | null;
  onAcerto: () => void;
  onProxima: () => void;
}

export function QuizGame({
  pergunta,
  indiceAtual,
  totalPerguntas,
  dificuldade,
  onAcerto,
  onProxima,
}: QuizGameProps) {
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [mostraCorreta, setMostraCorreta] = useState(false);

  const progresso = ((indiceAtual + 1) / totalPerguntas) * 100;

  const responder = (indexOpcao: number) => {
    if (mostraCorreta) return;

    setSelecionada(indexOpcao);
    setMostraCorreta(true);

    if (indexOpcao === pergunta.respostaCorreta) {
      onAcerto();
    }
  };

  const handleProxima = () => {
    setSelecionada(null);
    setMostraCorreta(false);
    onProxima();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  dificuldade === "Fácil"
                    ? "bg-green-500"
                    : dificuldade === "Médio"
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              />
              Nível {dificuldade}
            </span>
            <span>
              {indiceAtual + 1} / {totalPerguntas}
            </span>
          </div>
          <Progress value={progresso} className="h-2 bg-gray-200" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pergunta._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                  {pergunta.pergunta}
                </h2>

                <div className="space-y-3">
                  {pergunta.alternativas.map((opcao, i) => {
                    let styleClass =
                      "border-gray-200 hover:border-[#014635] hover:bg-gray-50";
                    let icon = null;

                    if (mostraCorreta) {
                      if (i === pergunta.respostaCorreta) {
                        styleClass =
                          "bg-green-100 border-green-500 text-green-800 font-medium";
                        icon = (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        );
                      } else if (i === selecionada) {
                        styleClass = "bg-red-100 border-red-500 text-red-800";
                        icon = <XCircle className="w-5 h-5 text-red-600" />;
                      } else {
                        styleClass = "opacity-50 border-gray-100";
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={mostraCorreta}
                        onClick={() => responder(i)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex justify-between items-center cursor-pointer ${styleClass}`}
                      >
                        <span className="text-base">{opcao}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="h-12 flex justify-end">
          {mostraCorreta && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={handleProxima}
                className="bg-[#014635] hover:bg-[#00332a] text-white px-8 py-6 rounded-xl text-lg flex items-center gap-2 cursor-pointer"
              >
                {indiceAtual + 1 === totalPerguntas
                  ? "Ver Resultado"
                  : "Próxima Pergunta"}
                <ChevronRight />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
