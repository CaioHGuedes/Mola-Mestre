import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StockData {
  symbol: string;
  shortName: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  currency: string;
}

export default function SearchActives() {
  const [inputSymbol, setInputSymbol] = useState<string>("PETR4");
  const [selectedSymbol, setSelectedSymbol] = useState<string>("PETR4");

  const API_KEY = process.env.NEXT_PUBLIC_BRAPI_API_KEY;

  const stockQuery = useQuery({
    queryKey: ["stock-data", selectedSymbol],
    queryFn: async () => {
      const url = API_KEY
        ? `https://brapi.dev/api/quote/${selectedSymbol}?token=${API_KEY}`
        : `https://brapi.dev/api/quote/${selectedSymbol}`;

      const response = await axios.get(url);

      if (!response.data?.results || response.data.results.length === 0) {
        throw new Error("Ativo não encontrado");
      }
      return response.data;
    },
    retry: false,
    enabled: !!selectedSymbol,
  });

  const stockData = stockQuery.data?.results?.[0] as StockData | undefined;
  const isPositiveChange = stockData && stockData.regularMarketChange > 0;

  function handleSearch() {
    setSelectedSymbol(inputSymbol.trim().toUpperCase());
  }

  return (
    <div className="w-full max-w-7xl p-8 bg-white rounded-xl shadow-lg text-center mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Pesquisar ativos</h1>

      <div className="mt-4 p-4  rounded-lg">
        {stockQuery.isLoading && (
          <p className="text-blue-600 font-medium">🔄 Carregando...</p>
        )}
        {stockQuery.isError && (
          <p className="text-red-600 font-medium">
            ❌ {(stockQuery.error as Error).message || "Erro ao carregar dados"}
          </p>
        )}
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Insira o código da ação
        </h3>
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value.toUpperCase())}
            placeholder="Digite o código (ex: PETR4)"
            className="px-4 py-2 border rounded-lg text-center w-64 focus:ring-2 focus:ring-green-500"
          />
          <Button
            onClick={handleSearch}
            disabled={stockQuery.isLoading}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            Buscar
          </Button>
        </div>
      </div>

      {stockData && (
        <Card className="mt-6 border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-bold text-gray-800">
                  {stockData.symbol}
                </div>
                <div className="text-sm text-gray-600">
                  {stockData.shortName}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isPositiveChange
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isPositiveChange ? "📈" : "📉"}{" "}
                {stockData.regularMarketChangePercent.toFixed(2)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Preço Atual</p>
                <p className="text-2xl font-bold text-gray-800">
                  R$ {stockData.regularMarketPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Variação</p>
                <p
                  className={`text-lg font-semibold ${
                    isPositiveChange ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositiveChange ? "+" : ""}R${" "}
                  {stockData.regularMarketChange.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Máxima</p>
                <p className="text-lg font-semibold text-gray-700">
                  R$ {stockData.regularMarketDayHigh.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mínima</p>
                <p className="text-lg font-semibold text-gray-700">
                  R$ {stockData.regularMarketDayLow.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Volume Negociado</p>
              <p className="text-lg font-semibold text-gray-800">
                {stockData.regularMarketVolume.toLocaleString("pt-BR")} ações
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
