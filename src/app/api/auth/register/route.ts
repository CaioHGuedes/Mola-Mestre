import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/schemas/register";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage = validation.error.issues[0].message;

      return NextResponse.json({ erro: errorMessage }, { status: 400 });
    }

    const { nome, email, senha } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { erro: "Este e-mail já está em uso." },
        { status: 409 }
      );
    }

    const senha_hash = await bcrypt.hash(senha, 12);

    await User.create({
      nome,
      email,
      senha_hash,
    });

    return NextResponse.json(
      { msg: "Usuário cadastrado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { erro: "Ocorreu um erro no servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
