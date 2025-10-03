"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const topGainers = [
  {
    symbol: "MGLU3",
    name: "Magazine Luiza",
    price: 2.15,
    change: 3.5,
    volume: "45.2M",
  },
  {
    symbol: "BBDC4",
    name: "Bradesco",
    price: 17.22,
    change: 2.1,
    volume: "38.7M",
  },
  {
    symbol: "RENT3",
    name: "Localiza",
    price: 62.45,
    change: 1.7,
    volume: "22.1M",
  },
  {
    symbol: "PETR4",
    name: "Petrobras",
    price: 36.45,
    change: 1.2,
    volume: "89.3M",
  },
  { symbol: "WEGE3", name: "Weg", price: 41.8, change: 0.9, volume: "15.6M" },
];

const topLosers = [
  {
    symbol: "ABEV3",
    name: "Ambev",
    price: 14.67,
    change: -1.3,
    volume: "67.8M",
  },
  { symbol: "VALE3", name: "Vale", price: 68.9, change: -1.1, volume: "52.4M" },
  {
    symbol: "BBAS3",
    name: "Banco do Brasil",
    price: 55.3,
    change: -0.8,
    volume: "28.9M",
  },
  { symbol: "CSNA3", name: "CSN", price: 15.42, change: -0.6, volume: "19.3M" },
  {
    symbol: "GGBR4",
    name: "Gerdau",
    price: 23.15,
    change: -0.2,
    volume: "31.7M",
  },
];

export function TopStocksTable() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          IBOVESPA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-green-600 font-semibold mb-3 text-sm uppercase tracking-wide">
              🔥 Maiores Altas
            </h3>
            <div className="space-y-2">
              {topGainers.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {stock.symbol}
                      </div>
                      <div className="text-xs text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      R$ {stock.price.toFixed(2)}
                    </div>
                    <div className="text-green-600 font-medium text-sm">
                      +{stock.change}%
                    </div>
                    <div className="text-xs text-gray-400">{stock.volume}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-red-600 font-semibold mb-3 text-sm uppercase tracking-wide">
              📉 Maiores Baixas
            </h3>
            <div className="space-y-2">
              {topLosers.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {stock.symbol}
                      </div>
                      <div className="text-xs text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      R$ {stock.price.toFixed(2)}
                    </div>
                    <div className="text-red-600 font-medium text-sm">
                      {stock.change}%
                    </div>
                    <div className="text-xs text-gray-400">{stock.volume}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
