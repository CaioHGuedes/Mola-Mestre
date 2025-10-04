import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

// Evitar múltiplas conexões em dev
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGO_URI, { dbName: "mola_mestre" })
      .then((mongoose) => mongoose);
  }
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

const QuestionSchema = new mongoose.Schema({
  pergunta: String,
  alternativas: [String],
  respostaCorreta: Number,
  categoria: String,
  dificuldade: String,
});

// Forçar nome exato da coleção
const QuizQuestion =
  mongoose.models.QuizQuestion ||
  mongoose.model("QuizQuestion", QuestionSchema, "quiz_questions");

export async function GET() {
  await dbConnect();

  // Buscar todas as perguntas
  const questions = await QuizQuestion.find().lean();

  // Garantir que respostaCorreta seja number
  const perguntas = questions.map(q => ({
    ...q,
    respostaCorreta: Number(q.respostaCorreta),
  }));

  return NextResponse.json(perguntas);
}
