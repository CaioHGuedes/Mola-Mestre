"use client";

import React from "react";
import { DashboardWithPieChart } from "@/components/DashboardWithPieChart";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import SearchActives from "@/components/SearchActives";

export default function DashboardPage() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => axios.post("/api/auth/logout"),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Erro ao fazer logout:", error);
    },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }
  return (
    <div className="flex flex-col gap-4">
      <DashboardWithPieChart />
      <SearchActives />
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg text-center mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-4 text-gray-600">
          Bem-vindo! Você está autenticado. Esta página é protegida pelo
          middleware e renderizada dentro de um layout com um sidebar
          persistente.
        </p>

        <div className="mt-8">
          <Button
            onClick={handleLogout}
            variant="destructive"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Saindo..." : "Sair (Logout)"}
          </Button>
        </div>
      </div>
    </div>
  );
}
