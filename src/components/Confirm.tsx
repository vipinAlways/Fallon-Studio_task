"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2Icon } from "lucide-react";
import { setCompelted } from "@/app/action/task";


export const ConfirmAchieveDialog = (taskId : { taskId: string }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["mark-task-achieved", taskId],
    mutationFn: setCompelted,
    onSuccess: () => {
      toast.success("Task marked as achieved 🎉");
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CheckCircle2Icon className="size-4" />
          Set Achieved
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Achieve</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to mark this task as achieved?</p>
        <DialogFooter className="pt-4">
          <Button variant="ghost">Cancel</Button>
          <Button
            onClick={(e) => {
                e.preventDefault()
                mutate(taskId!)
            }}
            disabled={isPending}
            variant="default"
          >
            {isPending ? "Updating..." : "Yes, mark as achieved"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
