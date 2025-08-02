"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { GetTasksHistory } from "@/app/action/task";
import { CloudAlertIcon, Edit2Icon, Loader2Icon } from "lucide-react";
import { ConfirmAchieveDialog } from "@/components/Confirm";
import { cn } from "@/lib/utils";
const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-tasks-history"],
    queryFn: GetTasksHistory,
  });

  if (isLoading)
    return (
      <div className={`flex items-center justify-center }`}>
        <Loader2Icon
          className={`animate-spin text-muted-foreground`}
          size={13}
        />
      </div>
    );

  if (!data || data.length === 0)
    return <div className="text-center p-4">No tasks found.</div>;
  return (
    <div className="sm:p-7 p-1 overflow-x-auto">
      <div className=" flex items-center justify-center flex-1">
        <Table className="w-full text-lg">
          <TableHeader className="h-10">
            <TableRow>
              <TableHead className="w-1/2">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="">Edit</TableHead>
              <TableHead className="">Ask Ai</TableHead>
              <TableHead className="">Have Done</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((task) => {
                const taskFailed = new Date(task.till).getTime() < Date.now();

                return (
                  <TableRow key={task.id} className={cn(taskFailed && "text-red-600" , "min-h-12")}>
                    <TableCell className="font-medium max-w-96 whitespace-pre-wrap break-words">
                      {task.title}
                    </TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      {new Date(task.till).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Edit2Icon className="size-5" />
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <CloudAlertIcon className="size-5" /> Ask
                    </TableCell>
                    <TableCell>
                      <ConfirmAchieveDialog taskId={task.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
