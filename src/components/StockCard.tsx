import { Stock } from "@/app/services/topstock";
import Image from "next/image";

const format = {
  volume: (v: number) =>
    v >= 1e9
      ? `${(v / 1e9).toFixed(1)}B`
      : v >= 1e6
      ? `${(v / 1e6).toFixed(1)}M`
      : v >= 1e3
      ? `${(v / 1e3).toFixed(1)}K`
      : v.toString(),
  cap: (v?: number) =>
    !v
      ? "N/A"
      : v >= 1e12
      ? `R$ ${(v / 1e12).toFixed(1)}T`
      : v >= 1e9
      ? `R$ ${(v / 1e9).toFixed(1)}B`
      : `R$ ${v.toFixed(0)}`,
  name: (n: string) => (n.length > 18 ? n.slice(0, 18) + "..." : n),
  color: (c: number) =>
    c > 0 ? "text-green-600" : c < 0 ? "text-red-600" : "text-gray-600",
  bg: (c: number) =>
    c > 0
      ? "bg-green-50 border-green-200"
      : c < 0
      ? "bg-red-50 border-red-200"
      : "bg-gray-50 border-gray-200",
};

export function StockCard({ stock }: { stock: Stock }) {
  const change = stock.regularMarketChangePercent;
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border-2 ${format.bg(
        change
      )}`}
    >
      <div className="flex items-center gap-3">
        {stock.logourl ? (
          <Image
            width={30}
            height={30}
            src={stock.logourl}
            alt={stock.symbol}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-green-400 text-white font-bold">
            {stock.symbol.slice(0, 2)}
          </div>
        )}
        <div>
          <div className="font-bold">{stock.symbol}</div>
          <div className="text-xs text-gray-600">
            {format.name(stock.shortName || stock.longName || stock.symbol)}
          </div>
          <div className="text-xs text-gray-400">
            {format.cap(stock.marketCap)}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">
          R$ {stock.regularMarketPrice.toFixed(2)}
        </div>
        <div className={`text-sm font-semibold ${format.color(change)}`}>
          {change.toFixed(2)}%
        </div>
        <div className="text-xs text-gray-500">
          Vol: {format.volume(stock.regularMarketVolume)}
        </div>
      </div>
    </div>
  );
}
