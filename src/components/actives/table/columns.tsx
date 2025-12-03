"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types/actives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "ticker",
    header: "Ativo",
    cell: ({ row }) => {
      const ticker = row.getValue("ticker") as string;
      return (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700 border border-gray-200">
            {ticker.substring(0, 2)}
          </div>
          <span className="font-bold text-gray-700">{ticker}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;
      return (
        <Badge
          variant="outline"
          className={`${
            tipo === "COMPRA"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-red-50 text-red-700 border-red-200"
          } font-semibold`}
        >
          {tipo}
        </Badge>
      );
    },
  },
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent px-0 font-bold text-gray-600"
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("data"));
      return (
        <div className="text-gray-600 font-medium">
          {date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "quantidade",
    header: () => <div className="text-right font-bold text-gray-600">Qtd</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium text-gray-600">
        {row.getValue("quantidade")}
      </div>
    ),
  },
  {
    accessorKey: "preco",
    header: () => (
      <div className="text-right font-bold text-gray-600">Preço</div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("preco"));
      return (
        <div className="text-right font-medium text-gray-600">
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    id: "total",
    header: () => (
      <div className="text-right font-bold text-gray-600">Total</div>
    ),
    cell: ({ row }) => {
      const qtd = row.getValue("quantidade") as number;
      const preco = row.getValue("preco") as number;
      const total = qtd * preco;

      return (
        <div className="text-right font-bold text-gray-900">
          {formatCurrency(total)}
        </div>
      );
    },
  },
];
