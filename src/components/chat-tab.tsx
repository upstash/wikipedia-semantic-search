import { serverClearMessages, serverGetMessages } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { Message, useChat } from "ai/react";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import LocaleSelect from "./locale-select";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatMessage from "./message";

const LOADING_MSG_ID = "loading-msg";

export const ChatTab = () => {
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
    <>
      <div
        className="h-[calc(100vh-200px)] min-h-[300px]
      sm:h-[calc(100vh-260px)] sm:min-h-[300px] flex flex-col gap-6"
      >
        <div className="h-full overflow-scroll relative border border-yellow-500/30 p-6 rounded-lg">
          {messagesWithLoading.length === 0 && (
            <div className="text-center text-yellow-950/40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Chat with the wikipedia assistant
            </div>
          )}

          <div className="flex flex-col gap-4">
            {messagesWithLoading.map((message) => {
              // @ts-ignore
              const meta = message.metadata;

              return (
                <ChatMessage meta={meta} role={message.role} key={message.id}>
                  {message.content}
                </ChatMessage>
              );
            })}
          </div>

          {/* Scroll buffer */}
          <div className="h-[100px]" />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            disabled={isLoading || isServerMessages}
            onChange={handleInputChange}
            placeholder="Ask a question..."
            className="border border-yellow-950/20 rounded-md px-4 h-10 w-full"
          />
          <LocaleSelect />

          <button
            type="submit"
            className="px-4 h-10 bg-yellow-950 text-white rounded-lg"
          >
            <PaperPlaneIcon />
          </button>
        </form>

        {error && (
          <div className="text-red-600 mt-2">Error: {error.message}</div>
        )}
      </div>

      <div className="mt-6">
        <button
          className="opacity-50 underline"
          onClick={() => {
            void serverClearMessages();
            setMessages([]);
          }}
        >
          Clear messages
        </button>
      </div>
    </>
  );
};
