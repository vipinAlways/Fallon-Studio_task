"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { GetTasks } from "@/app/action/task";
import {  Loader2Icon } from "lucide-react";
import { ConfirmAchieveDialog } from "./Confirm";
import { AskAi } from "./AskAi";
import { EditTask } from "./EditTask";

const TaskTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: GetTasks,
  });

  if (isLoading)
    return (
      <div className={`flex items-center justify-center }`}>
        <Loader2Icon
          className={`animate-spin text-muted-foreground`}
          size={12}
        />
      </div>
    );

  if (!data || data.length === 0)
    return <div className="text-center p-4">No tasks found.</div>;

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl">
        <Table className="w-full text-base">
          <TableCaption className="text-sm text-muted-foreground">
            List of your last 10 tasks.
          </TableCaption>
          <TableHeader className="h-12">
            <TableRow>
              <TableHead className="w-96">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Ask AI</TableHead>
              <TableHead>Have Done</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.slice(0, 10).map((task) => (
              <TableRow key={task.id} className="min-h-12">
                <TableCell className="font-medium max-w-96 whitespace-pre-wrap break-words">
                  {task.title}
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {new Date(task.till).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <EditTask
                    till={task.till}
                    title={task.title}
                    taskId={task.id}
                  />
                </TableCell>
                <TableCell className="">
                  <AskAi taskTitle={task.title} />
                </TableCell>
                <TableCell>
                  <ConfirmAchieveDialog taskId={task.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTable;
