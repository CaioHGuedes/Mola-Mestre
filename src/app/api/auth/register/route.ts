import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { erro: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }
    if (senha.length < 6) {
      return NextResponse.json(
        { erro: "A senha deve ter no mínimo 6 caracteres." },
        { status: 400 }
      );
    }

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
