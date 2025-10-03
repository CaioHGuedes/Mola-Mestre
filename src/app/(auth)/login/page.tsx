"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Entrar
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
        </div>

        {mutation.error && (
          <p className="text-sm mt-4 text-red-600 bg-red-100 p-2 rounded-md">
            {mutation.error.response?.data?.erro ||
              "Ocorreu um erro. Tente novamente."}
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
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/register"
            className="text-sm text-blue-600 hover:underline"
          >
            Não tem uma conta? Crie agora!
          </Link>
        </div>
      </form>
    </div>
  );
}
