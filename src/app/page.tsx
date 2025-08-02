"use client";
import AddTask from "@/components/AddTask";
import TaskTable from "@/components/TaskTable";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  if (!session) {
    return (
      <div className={`flex items-center justify-center }`}>
        <Loader2Icon className={`animate-spin text-muted-foreground`} size={12} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <AddTask />
      <TaskTable />
    </div>
  );
}
