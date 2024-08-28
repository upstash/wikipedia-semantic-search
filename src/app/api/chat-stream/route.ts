import type { Message } from "ai";
import { NextRequest } from "next/server";
import { MessageMetadata } from "@/lib/message-meta";
import { PROMPT, ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

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
      onContextFetched(context) {
        // only the top 5 results
        return context.slice(0, 5);
      },
      topK: 50,
    });

    const meta = {
      usedPrompt: PROMPT,
      usedHistory: response.history.map(({ role, content }) => ({
        role,
        content,
      })),
      usedContext: response.context.map(({ metadata, data }) => ({
        url: (metadata as { url?: string }).url ?? "<NO_URL>",
        data,
      })),
    };

    // send meta along the response, this is consumed in the client
    // with the data field of useChat
    return aiUseChatAdapter(response, meta);
  } catch (error) {
    return Response.json("Server error", {
      status: 500,
    });
  }
}
