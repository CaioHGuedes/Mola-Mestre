import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Star,
  Target,
  Calendar as CalendarIcon,
  Trash2,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Goal } from "@/hooks/useGoals";

interface GoalCardProps {
  goal: Goal;
  onAddValue: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

export function GoalCard({ goal, onAddValue, onDelete }: GoalCardProps) {
  const percentage = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100
  );

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 border-gray-200 flex flex-col justify-between ${
        goal.priority ? "border-l-4 border-l-yellow-500" : ""
      }`}
    >
      <div>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  goal.priority
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-[#014635]/10 text-[#014635]"
                }`}
              >
                {goal.priority ? (
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ) : (
                  <Target className="w-5 h-5" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                  {goal.title}
                </CardTitle>
                {goal.deadline && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <CalendarIcon className="w-3 h-3" />
                    {format(new Date(goal.deadline), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onDelete(goal)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="cursor-pointer w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">
                  Atual
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(goal.currentAmount)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">
                  Alvo
                </p>
                <p className="text-base font-semibold text-gray-600">
                  {formatCurrency(goal.targetAmount)}
                </p>
              </div>
            </div>
            <div className="relative pt-2">
              <div className="flex justify-between text-xs font-semibold mb-1.5 text-gray-600">
                <span>Progresso</span>
                <span>{percentage.toFixed(0)}%</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    goal.priority ? "bg-yellow-500" : "bg-[#014635]"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      <div className="px-6 pb-6">
        <Button
          variant="ghost"
          onClick={() => onAddValue(goal)}
          className="w-full text-gray-500 hover:text-[#014635] hover:bg-[#014635]/10 text-xs h-9 transition-colors font-medium border border-transparent hover:border-[#014635]/20"
        >
          <Wallet className="w-3 h-3 mr-2" /> Adicionar valor
        </Button>
      </div>
    </Card>
  );
}
