export interface Goal {
  _id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  createdAt?: string;
  priority?: boolean;
}

export interface CreateGoalDTO {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  deadline?: Date | string | null;
  priority?: boolean;
}
