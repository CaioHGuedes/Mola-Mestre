"use client";

import React, { useState } from "react";
import { ALL_QUESTIONS } from "@/data/quiz-questions";
import { QuizMenu } from "@/components/quiz/QuizMenu";
import { QuizGame } from "@/components/quiz/QuizGame";
import { QuizResult } from "@/components/quiz/QuizResult";
import { Dificuldade, QuizQuestion } from "@/types/quiz";

export default function QuizFinanceiroPage() {
  const [dificuldade, setDificuldade] = useState<Dificuldade | null>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "result">(
    "menu"
  );
  const [perguntasDaRodada, setPerguntasDaRodada] = useState<QuizQuestion[]>(
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);

  const iniciarQuiz = (nivel: Dificuldade) => {
    const filtradas = ALL_QUESTIONS.filter((q) => q.dificuldade === nivel);
    const embaralhadas = [...filtradas].sort(() => 0.5 - Math.random());
    setPerguntasDaRodada(embaralhadas.slice(0, 10));

    setDificuldade(nivel);
    setGameState("playing");
    setAcertos(0);
    setCurrentIndex(0);
  };

  const handleAcerto = () => {
    setAcertos((prev) => prev + 1);
  };

  const proximaPergunta = () => {
    if (currentIndex + 1 < perguntasDaRodada.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameState("result");
    }
  };

  const reiniciar = () => {
    setDificuldade(null);
    setGameState("menu");
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-hidden">
      {gameState === "menu" && <QuizMenu onStart={iniciarQuiz} />}

      {gameState === "playing" && (
        <QuizGame
          pergunta={perguntasDaRodada[currentIndex]}
          indiceAtual={currentIndex}
          totalPerguntas={perguntasDaRodada.length}
          dificuldade={dificuldade}
          onAcerto={handleAcerto}
          onProxima={proximaPergunta}
        />
      )}

      {gameState === "result" && (
        <QuizResult
          acertos={acertos}
          totalPerguntas={perguntasDaRodada.length}
          dificuldade={dificuldade}
          onReiniciar={reiniciar}
        />
      )}
    </div>
  );
}
