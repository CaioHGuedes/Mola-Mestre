"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { triggerConfetti } from "@/lib/confetti";
import { TransactionForm } from "@/components/actives/TransactionForm";
import { TransactionSuccess } from "@/components/actives/TransactionSuccess";

type ModalStep = "FORM" | "SUCCESS";

export function AddTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>("FORM");
  const [lastTransactionType, setLastTransactionType] = useState<
    "COMPRA" | "VENDA"
  >("COMPRA");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setStep("FORM");
    } else {
      setTimeout(() => {
        setStep("FORM");
      }, 300);
    }
  };

  const handleSuccess = (tipo: "COMPRA" | "VENDA") => {
    setLastTransactionType(tipo);
    setStep("SUCCESS");
    triggerConfetti();
  };

  const handleAddNew = () => {
    setStep("FORM");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-800 cursor-pointer flex items-center gap-2 px-6">
          Adicionar Lançamento <Plus size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`sm:max-w-[425px] transition-colors duration-500 ${
          step === "SUCCESS" ? "bg-[#e3fcf8] border-[#e3fcf8]" : "bg-white"
        }`}
      >
        <DialogHeader>
          {step === "FORM" ? (
            <DialogTitle>Novo Lançamento</DialogTitle>
          ) : (
            <DialogTitle className="sr-only">Lançamento Realizado</DialogTitle>
          )}
        </DialogHeader>

        {step === "FORM" ? (
          <TransactionForm
            onSuccess={handleSuccess}
            onCancel={() => setIsOpen(false)}
          />
        ) : (
          <TransactionSuccess
            tipo={lastTransactionType}
            onAddNew={handleAddNew}
            onClose={() => setIsOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
