import { PortfolioItem } from "@/types/dashboard";
import Image from "next/image";

interface AssetListProps {
  items: PortfolioItem[];
}

export function AssetList({ items }: AssetListProps) {
  if (items.length === 0) {
    return <div className="text-gray-500 py-4">Nenhum ativo na carteira.</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.ticker}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-4 lg:col-span-4">
            {item.logoUrl ? (
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={item.logoUrl}
                  width={48}
                  height={48}
                  alt={item.ticker}
                  className="rounded-full object-cover shadow-sm"
                />
              </div>
            ) : (
              <div className="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-lg">
                {item.ticker.substring(0, 2)}
              </div>
            )}
            <div>
              <p className="font-bold text-lg text-gray-800">{item.ticker}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Ações
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:col-span-8 w-full">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase">Qtd</p>
              <p className="font-semibold text-gray-700">{item.quantidade}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase">
                Preço Médio
              </p>
              <p className="font-semibold text-gray-700">
                R${" "}
                {item.precoMedio.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase">
                Preço Atual
              </p>
              <p className="font-semibold text-gray-700">
                R${" "}
                {(item.precoAtual || 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase">
                Saldo
              </p>
              <p className="font-bold text-gray-900 text-lg">
                R${" "}
                {(item.saldoAtual || 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium uppercase">
                Rentabilidade
              </p>
              <div
                className={`font-bold ${
                  (item.rentabilidadeVal || 0) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <p>
                  {(item.rentabilidadeVal || 0) >= 0 ? "+" : ""}R${" "}
                  {(item.rentabilidadeVal || 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs">
                  ({(item.rentabilidadePerc || 0).toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
