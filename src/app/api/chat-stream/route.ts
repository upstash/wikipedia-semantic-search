import { MessageMetadata } from "@/lib/message-meta";
import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import type { Message } from "ai";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { messages, namespace } = await request.json();

    const question = (messages as Message[]).at(-1)?.content;
    if (!question) throw new Error("No question in the request");

    const sessionId = request.cookies.get("sessionId")?.value;

    if (!sessionId) throw new Error("No sessionId found");

    let meta: undefined | MessageMetadata = undefined;

    const response = await ragChat.chat(question, {
      streaming: true,
      sessionId: sessionId,
      namespace: namespace,
      onChatHistoryFetched(messages) {
        // inject the history to metadata
        this.metadata = {
          ...this.metadata,
          usedHistory: messages.map(({ role, content }) => ({
            role,
            content,
          })),
        };
        meta = this.metadata;
        return messages;
      },
      onContextFetched(context) {
        // only the top 5 results
        context = context.slice(0, 5);

        // inject the context to metadata
        this.metadata = {
          ...this.metadata,
          usedContext: context.map((x) => ({
            url: (x.metadata as { url: string | undefined }).url ?? "NO_URL",
            data: x.data,
          })),
        };
        meta = this.metadata;
        return context;
      },
      topK: 100,
      metadata: {
        usedPrompt: "<PROMPT_USED>",
      } as MessageMetadata,
    });

    // send meta along the response, this is consumed in the client
    // with the data field of useChat
    return aiUseChatAdapter(response, meta);
  } catch (error) {
    return Response.json("Server error", {
      status: 500,
    });
  }
}
