"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { fetchStocks } from "@/app/services/topstock";
import { Loader2, AlertCircle } from "lucide-react";
import { Transaction, TransactionPayload } from "@/types/actives";
import { formatCurrency } from "@/lib/utils";

const STOCKS = ["PETR4", "MGLU3", "VALE3", "ITUB4"];

interface TransactionFormProps {
  onSuccess: (tipo: "COMPRA" | "VENDA") => void;
  onCancel: () => void;
}

interface ApiErrorResponse {
  erro: string;
}

interface ApiSuccessResponse {
  msg: string;
  transaction: Transaction;
}

export function TransactionForm({ onSuccess, onCancel }: TransactionFormProps) {
  const [tipo, setTipo] = useState<"COMPRA" | "VENDA">("COMPRA");
  const [ticker, setTicker] = useState("");
  const [quantidade, setQuantidade] = useState<number | string>("");
  const [preco, setPreco] = useState<number | string>("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (ticker) {
      setIsLoadingPrice(true);
      fetchStocks([ticker])
        .then((res) => {
          if (res && res.length > 0) {
            setPreco(res[0].regularMarketPrice);
          }
        })
        .finally(() => setIsLoadingPrice(false));
    }
  }, [ticker]);

  const mutation = useMutation<
    ApiSuccessResponse,
    AxiosError<ApiErrorResponse>,
    TransactionPayload
  >({
    mutationFn: async (newTx) => {
      const response = await axios.post<ApiSuccessResponse>(
        "/api/transactions",
        newTx
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onSuccess(tipo);
    },
  });

  const handleSave = () => {
    if (mutation.isError) {
      mutation.reset();
    }

    const qtdNumber = Number(quantidade);
    const precoNumber = Number(preco);

    if (!ticker || qtdNumber <= 0 || precoNumber <= 0) return;

    mutation.mutate({
      ticker,
      tipo,
      quantidade: qtdNumber,
      preco: precoNumber,
      data: new Date(data),
    });
  };

  const valorTotal = (Number(quantidade) || 0) * (Number(preco) || 0);

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="flex gap-3 w-full">
          <Button
            type="button"
            variant={tipo === "COMPRA" ? "default" : "outline"}
            className={`flex-1 ${
              tipo === "COMPRA"
                ? "text-white bg-[#06ae5d] hover:bg-[#047b41]"
                : "text-[#06ae5d] border-[#06ae5d] hover:bg-[#047b41]/10"
            }`}
            onClick={() => setTipo("COMPRA")}
          >
            Compra
          </Button>
          <Button
            type="button"
            variant={tipo === "VENDA" ? "default" : "outline"}
            className={`flex-1 ${
              tipo === "VENDA"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "text-red-600 border-red-200 hover:bg-red-50"
            }`}
            onClick={() => setTipo("VENDA")}
          >
            Venda
          </Button>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Ativo</label>
          <Select onValueChange={setTicker} value={ticker}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a Ação" />
            </SelectTrigger>
            <SelectContent>
              {STOCKS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Data</label>
            <Input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Preço (R$)
              </label>
              {isLoadingPrice && (
                <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
              )}
            </div>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Valor Total
            </label>
            <Input
              disabled
              value={formatCurrency(valorTotal)}
              className="bg-gray-50 font-semibold text-gray-700"
            />
          </div>
        </div>
      </div>

      {mutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-2 text-sm mb-4 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>
            {mutation.error?.response?.data?.erro ||
              "Ocorreu um erro desconhecido ao processar o lançamento."}
          </span>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={mutation.isPending || !ticker || Number(quantidade) <= 0}
          className={
            tipo === "COMPRA"
              ? "bg-[#06ae5d] hover:bg-[#047b41]"
              : "bg-red-600 hover:bg-red-700"
          }
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </div>
    </>
  );
}
