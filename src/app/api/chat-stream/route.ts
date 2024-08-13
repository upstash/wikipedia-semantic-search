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

    const response = await ragChat.chat(question, {
      streaming: true,
      sessionId: sessionId,
      namespace: namespace,

      onChatHistoryFetched(messages) {
        // Inject the history to metadata
        this.metadata = {
          ...this.metadata,
          usedHistory: messages.map(({ role, content }) => ({
            role,
            content,
          })),
        };
        return messages;
      },
      onContextFetched(context) {
        // Inject the context to metadata
        this.metadata = {
          ...this.metadata,
          usedContext: context.map((x) => ({
            url: (x.metadata as { url: string | undefined }).url ?? "NO_URL",
            data: x.data,
          })),
        };
        return context;
      },
      metadata: {
        usedPrompt: "<PROMPT_USED>",
      } as MessageMetadata,
    });

    return aiUseChatAdapter(response);
  } catch (error) {
    return Response.json("Server error", {
      status: 500,
    });
  }
}
