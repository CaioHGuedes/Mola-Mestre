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

    const qtdNumber = Number(quantidade);

    if (tipo === "VENDA") {
      const historicoAtivo = await Transaction.find({
        userId: user.id,
        ticker: ticker,
      });

      const saldoAtual = historicoAtivo.reduce((acc, tx) => {
        if (tx.tipo === "COMPRA") return acc + tx.quantidade;
        if (tx.tipo === "VENDA") return acc - tx.quantidade;
        return acc;
      }, 0);

      if (qtdNumber > saldoAtual) {
        return NextResponse.json(
          {
            erro: `Saldo insuficiente. Você possui ${saldoAtual} ações de ${ticker}, mas tentou vender ${qtdNumber}.`,
          },
          { status: 400 }
        );
      }
    }

    const newTransaction = await Transaction.create({
      userId: user.id,
      ticker,
      tipo,
      quantidade: qtdNumber,
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
