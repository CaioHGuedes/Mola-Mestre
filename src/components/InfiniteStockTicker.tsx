"use client";

const stockData = [
  { symbol: "PETR4", price: 36.45, change: 1.2 },
  { symbol: "VALE3", price: 68.9, change: -0.5 },
  { symbol: "ITUB4", price: 34.15, change: 0.8 },
  { symbol: "BBDC4", price: 17.22, change: 2.1 },
  { symbol: "ABEV3", price: 14.67, change: -1.3 },
  { symbol: "WEGE3", price: 41.8, change: 0.9 },
  { symbol: "MGLU3", price: 2.15, change: 3.5 },
  { symbol: "BBAS3", price: 55.3, change: -0.2 },
  { symbol: "RENT3", price: 62.45, change: 1.7 },
  { symbol: "B3SA3", price: 12.88, change: 0.4 },
];

export function InfiniteStockTicker() {
  return (
    <div className="w-full bg-white text-gray-900 py-1 overflow-hidden border-b border-gray-200">
      <div className="flex animate-infinite-scroll whitespace-nowrap">
        {[...stockData, ...stockData].map((stock, index) => (
          <div
            key={index}
            className="inline-flex items-center mx-12 px-5 py-2 border-r border-gray-300 last:border-r-0"
          >
            <span className="font-bold text-base mr-2">{stock.symbol}</span>
            <span className="text-base mr-2">R$ {stock.price.toFixed(2)}</span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                stock.change >= 0
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {stock.change >= 0 ? "+" : ""}
              {stock.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
