import { client } from "@/OpenAi";
import { NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/chat";

export async function POST(req: Request) {
  try {
    const { taskTitle, userMessage, chatHistory = [] } = await req.json();

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You're a smart productivity coach. Keep your answers practical.`,
      },
      {
        role: "user",
        content: `How do I complete the task: "${taskTitle}"?`,
      },
      ...chatHistory.map((msg:{role:string,content:string}) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      })),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const chatCompletion = await client.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const answer = chatCompletion.choices[0].message.content;

    return NextResponse.json({ response: answer });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Server error" },
      { status: 500 }
    );
  }
}
