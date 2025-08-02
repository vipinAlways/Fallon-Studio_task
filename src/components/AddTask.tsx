"use client";


import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListStartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/app/action/task";
import { toast } from "sonner";

const AddTask = () => {

  const [till, setTill] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");

  const query = useQueryClient()

  const mutate = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Task added. Ready to achieve! 🚀");
      setTitle("");
      setTill(new Date());
     
      query.invalidateQueries({queryKey: ["get-tasks"],})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (till && title.trim()) {
      mutate.mutate({ till, title });
    } else {
      toast.error("Both title and date are required");
    }
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <Dialog  onOpenChange={() => setTitle("")} >
        <DialogTrigger className="w-full flex items-center justify-center">
          <div className="flex sm:text-5xl bg-white/40 backdrop-blur-3xl p-5 gap-4  w-3/5 rounded-4xl">
            <ListStartIcon className="sm:size-12" />
            Enter Your Task
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add A Task</DialogTitle>
            <DialogDescription>
              Enter your task title and due date.
            </DialogDescription>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-5 pt-4"
            >
              <textarea
                className="min-h-12 w-full focus:outline-amber-950 rounded-lg  outline-1 outline-black px-3 text-wrap"
                name="title"
                placeholder="Enter your task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="h-12 w-full focus:outline-amber-950 rounded-lg  outline-1 outline-black px-3"
                type="date"
                name="till"
                value={till.toISOString().split("T")[0]} // format for <input type="date" />
                onChange={(e) => setTill(new Date(e.target.value))}
              />

              <Button type="submit" className="text-xl sm:text-2xl">
                Submit
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
