"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import axios from "axios";
import { fetchStocks } from "@/app/services/topstock";
import { Plus } from "lucide-react";
import { TransactionPayload } from "@/types/actives";

const STOCKS = ["PETR4", "MGLU3", "VALE3", "ITUB4"];

export function AddTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tipo, setTipo] = useState("COMPRA");
  const [ticker, setTicker] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [preco, setPreco] = useState<number>(0);
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (ticker) {
      fetchStocks([ticker]).then((res) => {
        if (res && res.length > 0) {
          setPreco(res[0].regularMarketPrice);
        }
      });
    }
  }, [ticker]);

  const mutation = useMutation({
    mutationFn: async (newTx: TransactionPayload) =>
      axios.post("/api/transactions", newTx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setIsOpen(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setTicker("");
    setQuantidade(0);
    setPreco(0);
    setTipo("COMPRA");
  };

  const handleSave = () => {
    if (!ticker || quantidade <= 0 || preco <= 0) return;

    mutation.mutate({
      ticker,
      tipo: tipo as "COMPRA" | "VENDA",
      quantidade,
      preco,
      data: new Date(data),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-800 cursor-pointer flex items-center gap-2 px-6">
          Adicionar Lançamento <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Lançamento</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex gap-2">
            <Button
              variant={tipo === "COMPRA" ? "default" : "outline"}
              className={tipo === "COMPRA" ? "bg-blue-600 w-full" : "w-full"}
              onClick={() => setTipo("COMPRA")}
            >
              Compra
            </Button>
            <Button
              variant={tipo === "VENDA" ? "default" : "outline"}
              className={tipo === "VENDA" ? "bg-red-600 w-full" : "w-full"}
              onClick={() => setTipo("VENDA")}
            >
              Venda
            </Button>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Data</label>
              <Input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Quantidade</label>
              <Input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Preço Unitário (R$)</label>
              <Input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Valor Total</label>
              <Input disabled value={`R$ ${(quantidade * preco).toFixed(2)}`} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? "Salvando..." : "Adicionar Lançamento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
