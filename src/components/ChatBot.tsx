"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ChatBot({ taskTitle }: { taskTitle: string }) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: input };
    const updatedHistory = [...chatHistory, newUserMessage];

    setChatHistory(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskTitle,
          userMessage: input,
          chatHistory: updatedHistory,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error fetching AI response");

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
      };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">AI Task Assistant</h2>
      <div className="h-64 overflow-y-auto border p-2 rounded bg-white text-black">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-3 py-2 rounded ${msg.role === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
              <span>{msg.content}</span>
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 mt-2">Thinking...</div>}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
