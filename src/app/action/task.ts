"use server";
import { db } from "@/lib/db";
import { auth } from "../api/auth/[...nextauth]/route";
interface taskProp {
  title: string;
  till: Date;
  taskId?: string;
}

export const createTask = async ({ till, title }: taskProp) => {
  await db.$connect();

  try {
    const session = await auth();
    console.log(session);
    if (!session) {
      throw new Error("User is not authenticated");
    }

    const user = await db.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      throw new Error("User is not authenticated");
    }
    await db.tasks.create({
      data: {
        title: title,
        till: till,
        status: "PENDING",
        AiSuggestion: "",
        userId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};
export const UpdateTask = async ({ till, title, taskId }: taskProp) => {
  if (!taskId) {
    throw new Error("Missing taskId");
  }

  await db.$connect();

  try {
    await db.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        till,
      },
    });
  } catch (error) {
    console.error("Failed to update task:", error);
    throw new Error("Server Error");
  }
};

export const setCompelted = async ({ taskId }: { taskId: string }) => {
  await db.$connect();

  try {
    await db.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        status: "ACHIEVE",
      },
    });
  } catch (error) {
    throw new Error(`Server Error ${error}`);
  }
};

export const GetTasks = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User is not authenticated");
    }

    return await db.tasks.findMany({
      where: {
        userId: session.user.id,
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // optional limit
    });
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
};
export const GetTasksHistory = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User is not authenticated");
    }

    return await db.tasks.findMany({
      where: {
        userId: session.user.id,
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
};
