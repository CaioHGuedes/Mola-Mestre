"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Pergunta = {
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
  categoria: string;
  dificuldade: string;
};

export default function QuizFinanceiroPage() {
  const { data: perguntas = [], isLoading } = useQuery<Pergunta[]>({
    queryKey: ["quiz"],
    queryFn: async () => {
      const res = await axios.get("/api/quiz");
      return res.data;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [mostraCorreta, setMostraCorreta] = useState(false);

  if (isLoading) return <p>Carregando quiz...</p>;
  if (!perguntas || perguntas.length === 0) return <p>Nenhuma pergunta disponível.</p>;

  const perguntaAtual = perguntas[currentIndex];

  const responder = (indexOpcao: number) => {
    if (mostraCorreta) return; // evita clicar de novo após mostrar a resposta

    setSelecionada(indexOpcao);
    setMostraCorreta(true);

    if (indexOpcao === perguntaAtual.respostaCorreta) {
      setAcertos(prev => prev + 1);
    }
  };

  const proximaPergunta = () => {
    setSelecionada(null);
    setMostraCorreta(false);

    if (currentIndex + 1 < perguntas.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinalizado(true);
    }
  };

  if (finalizado) {
    return (
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg text-center mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-black">Resultado 🎉</h1>
        <p className="text-lg font-semibold text-green-600">
          Você acertou {acertos} de {perguntas.length} perguntas!
        </p>
        <Button onClick={() => {
          setCurrentIndex(0);
          setAcertos(0);
          setFinalizado(false);
        }}>
          Refazer Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg text-center mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-black">
        Pergunta {currentIndex + 1} de {perguntas.length}
      </h1>

      <h2 className="font-semibold text-lg text-black">{perguntaAtual.pergunta}</h2>

      <div className="flex flex-col gap-3 mt-4">
        {perguntaAtual.alternativas.map((opcao, i) => {
          let bgClass = "bg-gray-50 hover:bg-gray-200";

          if (mostraCorreta) {
            if (i === perguntaAtual.respostaCorreta) bgClass = "bg-green-300";
            else if (i === selecionada && i !== perguntaAtual.respostaCorreta) bgClass = "bg-red-300";
          }

          return (
            <Button
              key={i}
              onClick={() => responder(i)}
              className={`p-3 rounded-lg border text-left transition ${bgClass} text-black`}
            >
              {opcao}
            </Button>
          );
        })}
      </div>

      {mostraCorreta && (
        <Button onClick={proximaPergunta} className="mt-4">
          Próxima
        </Button>
      )}
    </div>
  );
}
