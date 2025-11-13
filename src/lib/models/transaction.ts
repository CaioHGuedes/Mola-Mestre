import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  ticker: string;
  tipo: "COMPRA" | "VENDA";
  quantidade: number;
  preco: number;
  data: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    ticker: {
      type: String,
      required: true,
      enum: ["PETR4", "MGLU3", "VALE3", "ITUB4"],
    },
    tipo: {
      type: String,
      enum: ["COMPRA", "VENDA"],
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    data: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
