"use client";

import React, { useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Goal } from "@/hooks/useGoals";

interface AddValueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSubmit: (id: string, amount: number) => void;
  isLoading: boolean;
}

export function AddValueDialog({
  open,
  onOpenChange,
  goal,
  onSubmit,
  isLoading,
}: AddValueDialogProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal && amount) {
      onSubmit(goal._id, Number(amount));
      setAmount("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-[#014635]/10 rounded-full">
              <Wallet className="w-5 h-5 text-[#014635]" />
            </div>
            Adicionar Economia
          </DialogTitle>
          <DialogDescription>
            Quanto você quer depositar na meta <b>{goal?.title}</b>?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Valor a adicionar (R$)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                R$
              </span>
              <Input
                type="number"
                placeholder="0,00"
                className="pl-9 text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#014635] hover:bg-[#014635]/90"
              disabled={isLoading || !amount}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                "Confirmar Depósito"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
