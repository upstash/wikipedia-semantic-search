import { serverClearMessages, serverGetMessages } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { Message, useChat } from "ai/react";
import { useLocale } from "next-intl";
import { useEffect, useRef } from "react";
import LocaleSelect from "./locale-select";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatMessage from "./message";
import { cn } from "@/lib/utils";
import { Info } from "@/components/info";
import { MarkdownRenderer } from "./markdown-renderer";

const LOADING_MSG_ID = "loading-msg";

export const ChatTab = () => {
  const locale = useLocale();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const hasMessages = messages.length > 0;

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messagesWithLoading]);

  return (
    <>
      <div
        className="h-[calc(100vh-320px)] min-h-[300px]
  sm:h-[calc(100vh-400px)] sm:min-h-[300px] flex flex-col gap-6 border border-yellow-700/20 p-4 sm:p-6 rounded-lg"
      >
        <div className="h-full overflow-hidden relative">
          <div className="h-full overflow-y-scroll scrollbar-hide">
            {!hasMessages && (
              <div className="text-center opacity-50 text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                Chat with the Wikipedia assistant
              </div>
            )}

            <div className="flex flex-col gap-4">
              {messagesWithLoading.map((message) => {
                // @ts-ignore
                const meta = message.metadata;

                return (
                  <ChatMessage meta={meta} role={message.role} key={message.id}>
                    <MarkdownRenderer>{message.content}</MarkdownRenderer>
                  </ChatMessage>
                );
              })}
              {/* Scroll buffer */}
              <div ref={messagesEndRef} className="h-[100px]" />{" "}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative flex gap-2 items-center"
        >
          <input
            type="text"
            value={input}
            disabled={isLoading || isServerMessages}
            onChange={handleInputChange}
            placeholder="Ask a question..."
            className="border placeholder:text-yellow-950/50 border-yellow-700/20 rounded-md px-4 h-10 w-full focus:border-yellow-950 outline-none ring-0"
          />
          <LocaleSelect />

          <button
            type="submit"
            className={cn(
              "px-4 h-10 bg-yellow-950 text-white rounded-lg",
              isLoading && "opacity-30",
            )}
          >
            <PaperPlaneIcon />
          </button>

          {hasMessages && (
            <button
              className="absolute text-xs bottom-full mb-1 left-0 opacity-50 underline"
              onClick={() => {
                void serverClearMessages();
                setMessages([]);
              }}
            >
              Clear messages
            </button>
          )}
        </form>

        {error && (
          <div className="text-red-600 mt-2">Error: {error.message}</div>
        )}
      </div>

      <Info className="mt-4 sm:mt-6">
        <p>Chat support is implemented with RAG-Chat SDK.</p>

        <p>
          <b>
            👉 Check out{" "}
            <a
              className="underline"
              href="https://github.com/upstash/rag-chat"
              target="_blank"
            >
              the repo for more.
            </a>
          </b>
        </p>
      </Info>
    </>
  );
};
