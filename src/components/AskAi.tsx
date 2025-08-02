"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FileQuestionIcon } from "lucide-react";

import ChatBot from "./ChatBot";

export const AskAi = ({ taskTitle }: { taskTitle: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <FileQuestionIcon className="size-4" />
          Ask
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Achieve</DialogTitle>
        </DialogHeader>

        <ChatBot taskTitle={taskTitle} />
      </DialogContent>
    </Dialog>
  );
};
