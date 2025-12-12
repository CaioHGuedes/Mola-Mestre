"use client";

import React, { useState } from "react";
import { Plus, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGoals } from "@/hooks/useGoals";

import { GoalCard } from "@/components/goals/GoalCard";
import { CreateGoalDialog } from "@/components/goals/CreateGoalDialog";
import { AddValueDialog } from "@/components/goals/AddValueDialog";
import { DeleteGoalDialog } from "@/components/goals/DeleteGoalDialog";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { Goal } from "@/types/goals";

export default function GoalsPage() {
  const { goals, isLoading, createGoal, addValue, deleteGoal } = useGoals();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddValueOpen, setIsAddValueOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleOpenAddValue = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsAddValueOpen(true);
  };

  const handleOpenDelete = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsDeleteOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className="w-full min-h-screen bg-gray-50/50 p-6 md:p-8"
    >
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Minhas Metas
            </h1>
            <p className="text-gray-500">
              Defina objetivos e acompanhe sua evolução financeira.
            </p>
          </div>
          <AnimatedButton onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4" /> Nova Meta
          </AnimatedButton>
        </div>

        {isLoading && (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-gray-300" />
          </div>
        )}

        {!isLoading && (!goals || goals.length === 0) && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50"
          >
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Nenhuma meta criada
            </h3>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(true)}
              className="mt-4"
            >
              Criar primeira meta
            </Button>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {goals?.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onAddValue={handleOpenAddValue}
              onDelete={handleOpenDelete}
            />
          ))}
        </motion.div>

        <CreateGoalDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          isLoading={createGoal.isPending}
          onSubmit={(data) => {
            createGoal.mutate(data);
            setIsCreateOpen(false);
          }}
        />

        <AddValueDialog
          open={isAddValueOpen}
          onOpenChange={setIsAddValueOpen}
          goal={selectedGoal}
          isLoading={addValue.isPending}
          onSubmit={(id, amount) => {
            addValue.mutate({ id, addAmount: amount });
            setIsAddValueOpen(false);
          }}
        />

        <DeleteGoalDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          goal={selectedGoal}
          isLoading={deleteGoal.isPending}
          onConfirm={(id) => {
            deleteGoal.mutate(id);
            setIsDeleteOpen(false);
          }}
        />
      </div>
    </motion.div>
  );
}
