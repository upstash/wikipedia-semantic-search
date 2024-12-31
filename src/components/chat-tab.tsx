import { serverClearMessages, serverGetMessages } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { Message, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatMessage from "./message";
import { cn } from "@/lib/utils";
import { Info } from "@/components/info";
import { MarkdownRenderer } from "./markdown-renderer";
import { BorderBox } from "./border-box";
import { IconArrowUp, IconSelector } from "@tabler/icons-react";
import * as Select from "@radix-ui/react-select";
import { QueryMode } from "@upstash/vector";
import { MODEL_OPTIONS, ModelOption } from "@/lib/types";

const LOADING_MSG_ID = "loading-msg";

const SELECT_COMPONENTS: Record<
  ModelOption,
  { kind: Lowercase<QueryMode>; model: string }
> = {
  "BGE-M3 (Dense)": { kind: "dense", model: "BGE-M3" },
  "MXBAI (Dense)": { kind: "dense", model: "MXBAI" },
  "BGE-M3 (Sparse)": { kind: "sparse", model: "BGE-M3" },
  "BM25 (Sparse)": { kind: "sparse", model: "BM25" },
  "BGE-M3 / BGE-M3 (Hybrid)": { kind: "hybrid", model: "BGE-M3" },
  "MXBAI / BM25 (Hybrid)": { kind: "hybrid", model: "MXBAI / BM25" },
};

function ModelText({ modelOption }: { modelOption: ModelOption }) {
  return (
    <div>
      <span className="text-zinc-950 font-medium capitalize mr-1 text-base">
        {SELECT_COMPONENTS[modelOption].kind}
      </span>
      <span className="text-zinc-950 opacity-50 font-normal">
        {SELECT_COMPONENTS[modelOption].model}
      </span>
    </div>
  );
}

export const ChatTab = () => {
  const locale = "en";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [modelOption, setModelOption] = useState<ModelOption>(
    "MXBAI / BM25 (Hybrid)",
  );

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
      modelOption,
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
      <BorderBox
        className="h-[calc(100vh-320px)] min-h-[300px]
  sm:h-[calc(100vh-400px)] sm:min-h-[300px] flex flex-col gap-6 border"
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
          <div className="w-full relative flex items-center border rounded-xl px-4 h-[76px] bg-emerald-50 border-emerald-500">
            <input
              type="text"
              value={input}
              disabled={isLoading || isServerMessages}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="flex-grow outline-none ring-0 h-full bg-transparent"
            />
            <Select.Root
              value={modelOption}
              onValueChange={(value: ModelOption) => setModelOption(value)}
            >
              <div className="flex items-center justify-between pl-4 pr-2 py-2 border rounded-xl mx-3 bg-white border-zinc-200 w-56">
                {/* Select Trigger */}
                <Select.Trigger className="w-full" aria-label="Query Mode">
                  {/* Label and Custom Icon */}
                  <Select.Value>
                    <div className="flex justify-between w-full">
                      <ModelText modelOption={modelOption} />
                      <IconSelector
                        className="ml-auto inline-flex items-center"
                        opacity={0.6}
                      />
                    </div>
                  </Select.Value>
                </Select.Trigger>
              </div>

              <Select.Content
                className="z-10 text-white bg-white border border-zinc-200 rounded-lg shadow-lg w-full"
                position="item-aligned"
              >
                <Select.Viewport>
                  {MODEL_OPTIONS.map((option) => (
                    <Select.Item
                      key={option}
                      value={option}
                      className="px-4 py-2 text-sm text-white hover:bg-emerald-500 hover:text-white cursor-pointer rounded-lg"
                    >
                      <Select.ItemText>
                        <span className="font-semibold text-white text-base">
                          <ModelText modelOption={option} />
                        </span>
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
            <button
              type="submit"
              disabled={!input}
              className={cn(
                "w-[44px] h-[44px] flex justify-center items-center rounded-xl text-white bg-emerald-600",
                !input && " cursor-not-allowed",
              )}
            >
              <IconArrowUp />
            </button>
          </div>

          {hasMessages && (
            <button
              className="absolute text-xs bottom-full mb-1 left-2 text-zinc-500 underline underline-offset-2"
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
      </BorderBox>

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
