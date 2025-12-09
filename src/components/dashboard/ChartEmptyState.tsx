import { LucideIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ChartEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ChartEmptyState({
  icon: Icon,
  title,
  description,
}: ChartEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6 space-y-4 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
      <div className="p-4 bg-gray-100 rounded-full">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">{description}</p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/actives">
          <PlusCircle className="w-4 h-4 mr-2" />
          Cadastrar Ativo
        </Link>
      </Button>
    </div>
  );
}
