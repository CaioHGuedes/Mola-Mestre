import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  priority: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema<IGoal> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    title: {
      type: String,
      required: [true, "O título da meta é obrigatório."],
    },
    targetAmount: {
      type: Number,
      required: [true, "O valor alvo é obrigatório."],
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    priority: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Goal: Model<IGoal> =
  mongoose.models.Goal || mongoose.model<IGoal>("Goal", GoalSchema);

export default Goal;
