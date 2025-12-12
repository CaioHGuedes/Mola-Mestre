"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout"; // Importe o layout criado

interface LoginFormData {
  email: string;
  senha: string;
}

interface ApiError {
  erro: string;
}

interface LoginResponse {
  msg: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    LoginFormData
  >({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await axios.post<LoginResponse>(
        "/api/auth/login",
        credentials
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ email, senha: password });
  }

  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      subtitle="Insira suas credenciais para acessar sua conta."
      linkText="Não tem uma conta?"
      linkLabel="Cadastre-se gratuitamente"
      linkHref="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#014635] focus:ring-[#014635]/20 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#014635] focus:ring-[#014635]/20 rounded-xl"
              />
            </div>
          </div>
        </div>

        {mutation.error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 flex items-center animate-in fade-in slide-in-from-top-2">
            <span>
              {mutation.error.response?.data?.erro ||
                "Ocorreu um erro. Tente novamente."}
            </span>
          </div>
        )}

        <Button
          className="w-full h-12 text-base bg-[#014635] hover:bg-[#01332a] text-white rounded-xl shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:scale-[1.01]"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar na Plataforma <LogIn className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
