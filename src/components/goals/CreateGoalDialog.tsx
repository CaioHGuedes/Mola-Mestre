import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateGoalDTO } from "@/types/goals";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateGoalDTO) => void;
  isLoading: boolean;
}

export function CreateGoalDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateGoalDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    priority: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount) || 0,
      deadline: formData.deadline
        ? new Date(formData.deadline + "T12:00:00")
        : null,
    });
    setFormData({
      title: "",
      targetAmount: "",
      currentAmount: "",
      deadline: "",
      priority: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Meta</DialogTitle>
          <DialogDescription>
            Defina o nome, o valor alvo e o prazo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Nome</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="target">Alvo (R$)</Label>
              <Input
                id="target"
                type="number"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({ ...formData, targetAmount: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current">Já tenho (R$)</Label>
              <Input
                id="current"
                type="number"
                value={formData.currentAmount}
                onChange={(e) =>
                  setFormData({ ...formData, currentAmount: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">Prazo (Opcional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="priority"
              checked={formData.priority}
              onCheckedChange={(c) =>
                setFormData({ ...formData, priority: c as boolean })
              }
            />
            <Label htmlFor="priority">Meta principal</Label>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#014635] hover:bg-[#014635]/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Criar Meta"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
