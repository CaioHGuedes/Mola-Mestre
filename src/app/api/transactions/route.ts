import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/lib/models/transaction";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const user = await verifyAuth(request);

    const transactions = await Transaction.find({ userId: user.id }).sort({
      data: -1,
    });

    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json(
      { erro: "Erro ao buscar transações" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const user = await verifyAuth(request);
    const body = await request.json();

    const { ticker, tipo, quantidade, preco, data } = body;

    if (!ticker || !tipo || !quantidade || !preco) {
      return NextResponse.json({ erro: "Dados incompletos" }, { status: 400 });
    }

    const newTransaction = await Transaction.create({
      userId: user.id,
      ticker,
      tipo,
      quantidade: Number(quantidade),
      preco: Number(preco),
      data: data || new Date(),
    });

    return NextResponse.json(
      { msg: "Lançamento adicionado!", transaction: newTransaction },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { erro: "Erro ao criar transação" },
      { status: 500 }
    );
  }
}
