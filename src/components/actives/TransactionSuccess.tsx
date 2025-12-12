import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus } from "lucide-react";
import { TransactionType } from "@/types/actives";

interface TransactionSuccessProps {
  tipo: TransactionType;
  onAddNew: () => void;
  onClose: () => void;
}

export function TransactionSuccess({
  tipo,
  onAddNew,
  onClose,
}: TransactionSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <CheckCircle2 className="w-16 h-16 text-[#06ae5d] animate-bounce" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Aaaaee!</h2>

      <p className="text-gray-600 mb-6 max-w-[80%]">
        {tipo === "COMPRA" ? "Compra" : "Venda"} de ativo lançada com sucesso!
        <br />
        <span className="text-sm text-gray-400 mt-2 block">
          Seus dados já foram atualizados.
        </span>
      </p>

      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={onAddNew}
          className="bg-black text-white hover:bg-gray-800 cursor-pointer flex items-center justify-center gap-2 w-full py-6 text-lg"
        >
          Adicionar novo lançamento <Plus size={20} />
        </Button>

        <Button
          variant="ghost"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 hover:bg-transparent"
        >
          Voltar para carteira
        </Button>
      </div>
    </div>
  );
}
