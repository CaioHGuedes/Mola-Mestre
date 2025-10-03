import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres."),
  email: z.email("Formato de e-mail inválido."),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});
