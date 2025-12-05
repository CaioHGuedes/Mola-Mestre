import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Goal from "@/lib/models/goal";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const user = await verifyAuth(request);
    const goals = await Goal.find({ userId: user.id }).sort({
      priority: -1,
      createdAt: -1,
    });
    return NextResponse.json(goals);
  } catch {
    return NextResponse.json({ erro: "Erro ao buscar metas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const user = await verifyAuth(request);
    const body = await request.json();
    const { title, targetAmount, currentAmount, deadline, priority } = body;

    if (priority) {
      await Goal.updateMany({ userId: user.id }, { $set: { priority: false } });
    }

    const newGoal = await Goal.create({
      userId: user.id,
      title,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      priority,
    });

    return NextResponse.json(newGoal, { status: 201 });
  } catch {
    return NextResponse.json({ erro: "Erro ao criar meta" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const user = await verifyAuth(request);
    const body = await request.json();
    const { id, addAmount } = body;

    const goal = await Goal.findOne({ _id: id, userId: user.id });

    if (!goal) {
      return NextResponse.json(
        { erro: "Meta não encontrada" },
        { status: 404 }
      );
    }

    goal.currentAmount = (goal.currentAmount || 0) + Number(addAmount);
    await goal.save();

    return NextResponse.json(goal);
  } catch {
    return NextResponse.json(
      { erro: "Erro ao atualizar meta" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const user = await verifyAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ erro: "ID necessário" }, { status: 400 });
    }

    await Goal.deleteOne({ _id: id, userId: user.id });

    return NextResponse.json({ msg: "Meta excluída" });
  } catch {
    return NextResponse.json({ erro: "Erro ao excluir meta" }, { status: 500 });
  }
}
