"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  Edit2Icon } from "lucide-react";
import {  UpdateTask } from "@/app/action/task";
import { FormEvent, useState } from "react";

export const EditTask = ({
  taskId,
  title,
  till,
}: {
  taskId: string;
  till: Date;
  title: string;
}) => {
  const queryClient = useQueryClient();
  const [tillnew, setTillnew] = useState<Date>(till);
  const [titlenew, setTitlenew] = useState<string>(title);
  const { mutate } = useMutation({
    mutationKey: ["mark-task-achieved", taskId],
    mutationFn: UpdateTask,
    onSuccess: () => {
      toast.success("Task updated 🎉");
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (till && title) {
      mutate({ till:tillnew,title: titlenew,taskId });
    } else {
      toast.error("Both title and date are required");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit2Icon className="size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 pt-4"
        >
          <textarea
            className="min-h-12 w-full focus:outline-amber-950 rounded-lg  outline-1 outline-black px-3 text-wrap"
            name="title"
            placeholder="Enter your task..."
            value={titlenew}
            onChange={(e) => setTitlenew(e.target.value)}
          />

          <input
            className="h-12 w-full focus:outline-amber-950 rounded-lg  outline-1 outline-black px-3"
            type="date"
            name="till"
            value={tillnew.toISOString().split("T")[0]} // format for <input type="date" />
            onChange={(e) => setTillnew(new Date(e.target.value))}
          />

          <Button type="submit" className="text-xl sm:text-2xl">
            update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
