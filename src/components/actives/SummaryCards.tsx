import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, HandCoins, ArrowUpDown } from "lucide-react";

interface SummaryProps {
  summary: {
    patrimonioTotal: number;
    valorInvestidoTotal: number;
    lucroTotal: number;
    variacao: number;
  };
}

export function SummaryCards({ summary }: SummaryProps) {
  const lucroPerc =
    summary.valorInvestidoTotal > 0
      ? (summary.lucroTotal / summary.valorInvestidoTotal) * 100
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-700">
              <DollarSign size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              Patrimônio Total
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              R${" "}
              {summary.patrimonioTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Investido: R${" "}
              {summary.valorInvestidoTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className={`p-2 rounded-lg ${
                summary.lucroTotal >= 0
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <TrendingUp size={24} />
            </div>
            <span
              className={`text-sm font-bold ${
                summary.lucroTotal >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              {summary.lucroTotal >= 0 ? "+" : ""}
              {lucroPerc.toFixed(2)}%
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              Lucro/Prejuízo
            </p>
            <h3
              className={`text-2xl font-bold mt-1 ${
                summary.lucroTotal >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              R${" "}
              {summary.lucroTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h3>
            <p className="text-xs text-gray-400 mt-1">Rentabilidade geral</p>
          </div>
        </CardContent>
      </Card>

      {/* Proventos (Mockado por enquanto) */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700">
              <HandCoins size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              Proventos
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">R$ 0,00</h3>
            <p className="text-xs text-gray-400 mt-1">Recebidos</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className={`p-2 rounded-lg ${
                summary.variacao >= 0
                  ? "bg-purple-100 text-purple-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              <ArrowUpDown size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              Variação do Dia
            </p>
            <h3
              className={`text-2xl font-bold mt-1 ${
                summary.variacao >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {summary.variacao >= 0 ? "+" : ""}R${" "}
              {summary.variacao.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Sobre sua carteira hoje
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
