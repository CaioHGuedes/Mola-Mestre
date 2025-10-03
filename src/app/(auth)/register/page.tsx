"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
      setSuccessMessage(data.msg + " Você será redirecionado para o login...");
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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Criar Conta
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nome
            </label>
            <Input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <Input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        {successMessage && (
          <p className="text-sm mt-4 text-green-700 bg-green-100 p-2 rounded-md">
            {successMessage}
          </p>
        )}

        {mutation.error && (
          <p className="text-sm mt-4 text-red-600 bg-red-100 p-2 rounded-md">
            {mutation.error.response?.data?.erro ||
              "Ocorreu um erro desconhecido."}
          </p>
        )}

        <div className="mt-6">
          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Registrar"
            )}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Já tenho uma conta
          </Link>
        </div>
      </form>
    </div>
  );
}
