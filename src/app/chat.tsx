import { clearMessages, getMessages } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useChat } from "ai/react";
import { useEffect } from "react";

export const Chat = () => {
  const {
    messages,
    setMessages,
    handleInputChange,
    handleSubmit,
    input,
    error,
    isLoading,
  } = useChat({
    api: "/api/chat-stream",
  });

  const { data: initialMessages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return await getMessages();
    },
  });

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const messagesWithLoading = [
    ...messages,
    ...(isLoading && messages.at(-1)?.role !== "assistant"
      ? [
          {
            role: "bot",
            content: "...",
          },
        ]
      : []),
  ];

  return (
    <div className="bg-amber-50 rounded-md border border-yellow-950/20 py-5 px-2">
      <div className="flex flex-col gap-2 max-h-[calc(100vh-380px)] min-h-[300px] overflow-scroll">
        {messagesWithLoading.length === 0 && (
          <div className="text-center text-yellow-950/40 mt-6">
            Chat with the wikipedia assistant
          </div>
        )}
        {messagesWithLoading.map((message, i) => (
          <div
            className={cn(
              "flex",
              message.role === "user" ? "justify-end pl-5" : "justify pr-10"
            )}
          >
            <div
              className={cn(
                "px-3 py-2 rounded-md",
                message.role === "user" ? "bg-amber-300/30" : "bg-amber-500/30"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-5">
        <input
          type="text"
          value={input}
          disabled={isLoading || isMessagesLoading}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="border border-yellow-950/20 rounded-md px-2 h-10 w-full"
        />
        <button
          type="submit"
          className="px-4 h-10 bg-yellow-950 text-white rounded-lg"
        >
          {"->"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">Error: {error.message}</div>}
      <button
        onClick={() => {
          void clearMessages();
          setMessages([]);
        }}
      >
        clear messages
      </button>
    </div>
  );
};
