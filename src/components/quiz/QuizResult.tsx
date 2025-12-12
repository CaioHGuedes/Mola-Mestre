"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  BrainCircuit,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dificuldade } from "@/types/quiz";

interface QuizResultProps {
  acertos: number;
  totalPerguntas: number;
  dificuldade: Dificuldade | null;
  onReiniciar: () => void;
}

type FeedbackContent = {
  message: string;
  links: { title: string; url: string }[];
};

const feedbackMap: Record<
  string,
  Record<"ruim" | "medio" | "bom", FeedbackContent>
> = {
  Fácil: {
    ruim: {
      message:
        "Você está no início. Recomendamos estudar: O que é inflação, Juros Compostos e o Tripé Macroeconômico.",
      links: [
        {
          title: "Calculadora de Juros Compostos (Mobills)",
          url: "https://www.mobills.com.br/calculadoras/calculadora-juros-compostos/",
        },
        {
          title: "Entenda o Tripé Macroeconômico (Politize!)",
          url: "https://www.politize.com.br/tripe-macroeconomico/",
        },
      ],
    },
    medio: {
      message:
        "Bom começo! Aprofunde-se em: Renda Fixa (CDB, Tesouro Direto) e Reserva de Emergência.",
      links: [
        {
          title: "Simulador do Tesouro Direto",
          url: "https://www.tesourodireto.com.br/simulador/",
        },
        {
          title: "Guia da Reserva de Emergência (Nubank)",
          url: "https://blog.nubank.com.br/reserva-de-emergencia/",
        },
      ],
    },
    bom: {
      message:
        "Excelente base! Você já domina os conceitos iniciais. Hora de avançar para o nível Médio.",
      links: [
        {
          title: "Diferença: Renda Fixa x Variável (B3)",
          url: "https://edu.b3.com.br/",
        },
        {
          title: "Introdução aos Fundos Imobiliários",
          url: "https://statusinvest.com.br/fundos-imobiliarios",
        },
      ],
    },
  },

  Médio: {
    ruim: {
      message:
        "O nível subiu! Recomendamos revisar: Indicadores fundamentalistas (P/L, ROE) e a diferença entre Renda Fixa e Variável.",
      links: [
        {
          title: "Indicadores: O que é P/L e ROE?",
          url: "https://investnews.com.br/guias/analise-fundamentalista/",
        },
        {
          title: "Comparador de Fundos de Investimento",
          url: "https://maisretorno.com/comparacao-fundos",
        },
      ],
    },
    medio: {
      message:
        "Você está no caminho. Estude mais sobre: Fundos Imobiliários (FIIs) e Diversificação de Carteira.",
      links: [
        {
          title: "Ranking de FIIs (Clube FII)",
          url: "https://www.clubefii.com.br/",
        },
        {
          title: "A importância da Diversificação (Suno)",
          url: "https://www.suno.com.br/artigos/diversificacao/",
        },
      ],
    },
    bom: {
      message:
        "Ótimo desempenho! Você entende bem a dinâmica do mercado. Tente o nível Difícil.",
      links: [
        {
          title: "Introdução a Derivativos e Opções",
          url: "https://www.infomoney.com.br/guias/opcoes/",
        },
        {
          title: "Análise Técnica vs Fundamentalista",
          url: "https://corretora.rico.com.vc/blog/analise-tecnica-e-fundamentalista",
        },
      ],
    },
  },

  Difícil: {
    ruim: {
      message:
        "Este nível é para especialistas! Estude: Derivativos (Opções e Futuros) e Análise Técnica avançada.",
      links: [
        {
          title: "Mercado de Futuros na B3",
          url: "https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/derivativos/",
        },
        {
          title: "Curso de Análise Técnica (TradingView)",
          url: "https://br.tradingview.com/edu/",
        },
      ],
    },
    medio: {
      message:
        "Muito bom. Para gabaritar, foque em: Tributação avançada de investimentos e Cenário Macro Global.",
      links: [
        {
          title: "Guia Completo de Imposto de Renda (IR)",
          url: "https://www.gov.br/receitafederal/pt-br",
        },
        {
          title: "Notícias Econômicas Globais (Investing)",
          url: "https://br.investing.com/news/economy",
        },
      ],
    },
    bom: {
      message:
        "Parabéns, Mestre! Você tem um conhecimento avançado sobre o mercado financeiro.",
      links: [
        {
          title: "Certificações Financeiras (Anbima)",
          url: "https://www.anbima.com.br/pt_br/educar/certificacoes.htm",
        },
        {
          title: "Relatórios de Mercado (BTG Pactual)",
          url: "https://content.btgpactual.com/research",
        },
      ],
    },
  },
};

export function QuizResult({
  acertos,
  totalPerguntas,
  dificuldade,
  onReiniciar,
}: QuizResultProps) {
  const porcentagem = (acertos / totalPerguntas) * 100;
  let nivelFeedback: "ruim" | "medio" | "bom" = "ruim";

  if (porcentagem >= 80) nivelFeedback = "bom";
  else if (porcentagem >= 50) nivelFeedback = "medio";

  const feedback = dificuldade
    ? feedbackMap[dificuldade][nivelFeedback]
    : { message: "", links: [] };

  return (
    <div className="w-full flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px]"
      >
        <div className="w-full md:w-5/12 bg-[#014635] text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-sm"
          >
            {nivelFeedback === "bom" ? (
              <Trophy className="w-16 h-16 text-yellow-300" />
            ) : (
              <BrainCircuit className="w-16 h-16 text-emerald-200" />
            )}
          </motion.div>

          <h2 className="text-4xl font-bold mb-2">
            {nivelFeedback === "bom"
              ? "Excelente!"
              : nivelFeedback === "medio"
              ? "Bom Trabalho!"
              : "Vamos Melhorar!"}
          </h2>

          <p className="text-emerald-100/80 text-sm font-medium uppercase tracking-widest mb-8">
            Nível {dificuldade}
          </p>

          <div className="flex flex-col items-center">
            <span className="text-6xl font-extrabold tracking-tighter">
              {acertos}
              <span className="text-2xl text-emerald-300/50">
                /{totalPerguntas}
              </span>
            </span>
            <span className="text-sm text-emerald-200 mt-2 font-medium">
              Questões Corretas
            </span>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col bg-white">
          <div className="space-y-6 flex-1">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Análise de Desempenho
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feedback.message}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium uppercase tracking-wide">
                <span className="text-gray-400">Precisão</span>
                <span className="text-[#014635]">
                  {porcentagem.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${porcentagem}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full ${
                    porcentagem >= 80
                      ? "bg-emerald-500"
                      : porcentagem >= 50
                      ? "bg-yellow-500"
                      : "bg-red-400"
                  }`}
                />
              </div>
            </div>

            {feedback.links.length > 0 && (
              <div className="pt-2">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  <BookOpenCheck className="w-4 h-4 text-[#014635]" />
                  Aprofunde seus conhecimentos
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {feedback.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#F0F7F5] hover:border-[#014635]/30 transition-all duration-300"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#014635]">
                        {link.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#014635]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Button
              onClick={onReiniciar}
              className="group w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-between px-6"
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Tentar Novamente
              </span>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
