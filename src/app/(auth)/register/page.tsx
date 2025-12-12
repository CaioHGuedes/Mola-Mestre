"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Loader2, User, Mail, Lock, ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

interface RegisterFormData {
  nome: string;
  email: string;
  senha: string;
}

interface SuccessResponse {
  msg: string;
}

interface ApiError {
  erro: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation<
    SuccessResponse,
    AxiosError<ApiError>,
    RegisterFormData
  >({
    mutationFn: async (userData) => {
      const response = await axios.post<SuccessResponse>(
        "/api/auth/register",
        userData
      );
      return response.data;
    },
    onSuccess: (data) => {
      setSuccessMessage(data.msg);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
    onError: () => {
      setSuccessMessage(null);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMessage(null);
    mutation.mutate({ nome, email, senha: password });
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece sua jornada financeira hoje mesmo."
      linkText="Já tem uma conta?"
      linkLabel="Faça login"
      linkHref="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#014635] focus:ring-[#014635]/20 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#014635] focus:ring-[#014635]/20 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-[#014635] focus:ring-[#014635]/20 rounded-xl"
              />
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700 flex flex-col items-center animate-in fade-in">
            <span className="font-semibold mb-1">Sucesso!</span>
            <span>{successMessage}</span>
            <span className="text-xs text-green-600 mt-1">
              Redirecionando...
            </span>
          </div>
        )}

        {mutation.error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 animate-in fade-in">
            {mutation.error.response?.data?.erro ||
              "Ocorreu um erro desconhecido."}
          </div>
        )}

        <Button
          className="w-full h-12 text-base bg-[#014635] hover:bg-[#01332a] text-white rounded-xl shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:scale-[1.01]"
          type="submit"
          disabled={mutation.isPending || !!successMessage}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Criando conta...
            </>
          ) : (
            <>
              Registrar Agora <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
