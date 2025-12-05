"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Goal {
  _id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  priority: boolean;
  deadline?: string;
  createdAt: string;
}

export function useGoals() {
  const queryClient = useQueryClient();

  const { data: goals, isLoading } = useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: async () => (await axios.get("/api/goals")).data,
  });

  const createGoal = useMutation({
    mutationFn: async (newGoal: unknown) =>
      await axios.post("/api/goals", newGoal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  const addValue = useMutation({
    mutationFn: async (data: { id: string; addAmount: number }) =>
      await axios.put("/api/goals", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  const deleteGoal = useMutation({
    mutationFn: async (id: string) => await axios.delete(`/api/goals?id=${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  return {
    goals,
    isLoading,
    createGoal,
    addValue,
    deleteGoal,
  };
}
