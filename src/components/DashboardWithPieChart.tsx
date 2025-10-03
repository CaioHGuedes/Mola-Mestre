"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InfiniteStockTicker } from "./InfiniteStockTicker";
import { TopStocksTable } from "./TopStocksTable";

const compositionData = [
  { name: "AÇÕES", value: 60 },
  { name: "FIIS", value: 25 },
  { name: "FI-INFRA", value: 15 },
];

const COLORS = ["#EF4444", "#3B82F6", "#06B6D4"];

const performanceData = [
  { mes: "Jan", Carteira: 0, Ibovespa: 0, CDI: 0 },
  { mes: "Fev", Carteira: 2, Ibovespa: 1, CDI: 0.5 },
  { mes: "Mar", Carteira: 3, Ibovespa: 1.5, CDI: 1 },
  { mes: "Abr", Carteira: 5, Ibovespa: 3, CDI: 1.5 },
  { mes: "Mai", Carteira: 4, Ibovespa: 2, CDI: 2 },
  { mes: "Jun", Carteira: 6, Ibovespa: 4, CDI: 2.5 },
  { mes: "Jul", Carteira: 7.5, Ibovespa: 5, CDI: 3 },
  { mes: "Ago", Carteira: 8, Ibovespa: 4.5, CDI: 3.5 },
  { mes: "Set", Carteira: 9, Ibovespa: 6, CDI: 4 },
  { mes: "Out", Carteira: 10, Ibovespa: 6.5, CDI: 4.5 },
  { mes: "Nov", Carteira: 11, Ibovespa: 7, CDI: 5 },
  { mes: "Dez", Carteira: 12, Ibovespa: 8, CDI: 5.5 },
];

export function DashboardWithPieChart() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
        <InfiniteStockTicker />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">
              RENTABILIDADE (1 ANO)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Carteira"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Ibovespa"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="CDI"
                    stroke="#06B6D4"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">
              COMPOSIÇÃO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {compositionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <TopStocksTable />
        </div>
      </div>
    </div>
  );
}
