export type Dificuldade = "Fácil" | "Médio" | "Difícil";

export interface QuizQuestion {
  _id: number;
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
  dificuldade: Dificuldade;
}

export type GameState = "menu" | "playing" | "result";
