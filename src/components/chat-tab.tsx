import { serverClearMessages, serverGetMessages } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Message, useChat } from "ai/react";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import LocaleSelect from "./locale-select";
import { DebugDrawer } from "./debug-drawer";

const LOADING_MSG_ID = "loading-msg";

export const ChatTab = ({ active }: { active: boolean }) => {
  const locale = useLocale();

  // These also contain metadata for debugging like the context used
  const { data: messageHistory, isLoading: isServerMessages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return await serverGetMessages();
    },
  });

  const {
    data,
    messages,
    setMessages,
    handleInputChange,
    handleSubmit,
    input,
    error,
    isLoading,
  } = useChat({
    api: "/api/chat-stream",
    body: {
      namespace: locale,
    },
  });

  useEffect(() => {
    // When a new metadata comes from the server
    // update the last message with it
    setMessages((messages) => {
      const meta = data?.at(-1);
      if (!meta) return messages;
      const last = messages.at(-1);
      if (!last) return messages;
      return [
        ...messages.slice(0, -1),
        {
          ...last,
          metadata: meta,
        },
      ];
    });
  }, [data]);

  // Only called once
  useEffect(() => {
    if (messageHistory) {
      setMessages(messageHistory);
    }
  }, [messageHistory]);

  const messagesWithLoading: Message[] = [
    ...messages,
    ...(isLoading && messages.at(-1)?.role !== "assistant"
      ? [
          {
            id: LOADING_MSG_ID,
            role: "assistant",
            content: "...",
          } as const,
        ]
      : []),
  ];

  return (
    <div className={cn("max-w-screen-md flex-shrink-0", !active && "hidden")}>
      <div className="mb-2 flex justify-end gap-2">
        <LocaleSelect />
        <button
          onClick={() => {
            void serverClearMessages();
            setMessages([]);
          }}
          className="border px-2 py-1 bg-white rounded-lg border-zinc-300"
        >
          Clear messages
        </button>
      </div>
      <div className="bg-amber-50 rounded-md border border-yellow-950/20 py-5 px-2">
        <div className="max-h-[calc(100vh-380px)] min-h-[300px] overflow-scroll">
          {messagesWithLoading.length === 0 && (
            <div className="text-center text-yellow-950/40 mt-6">
              Chat with the wikipedia assistant
            </div>
          )}
          <div className="flex flex-col gap-4">
            {messagesWithLoading.map((message) => {
              // @ts-ignore
              const meta = message.metadata;
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user"
                      ? "justify-end pl-5"
                      : "justify pr-10"
                  )}
                >
                  <div>
                    <div
                      className={cn(
                        "px-3 py-2 rounded-md",
                        message.role === "user"
                          ? "bg-amber-300/30"
                          : "bg-amber-500/30"
                      )}
                    >
                      {message.content}
                    </div>
                    {message.role === "assistant" && meta && (
                      <div className="flex justify-end">
                        <DebugDrawer metadata={meta}>
                          <button className="text-amber-950 hover:underline">
                            debug
                          </button>
                        </DebugDrawer>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Scroll buffer */}
          <div className="h-[100px]" />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-5">
          <input
            type="text"
            value={input}
            disabled={isLoading || isServerMessages}
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
        {error && (
          <div className="text-red-600 mt-2">Error: {error.message}</div>
        )}
      </div>
    </div>
  );
};
