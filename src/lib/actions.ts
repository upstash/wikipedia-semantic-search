"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { getUserLocale } from "@/service";
import { UpstashMessage } from "@upstash/rag-chat";
import { Info, ResultCode, WikiMetadata } from "@/lib/types";
import { index } from "./dbs";
import { MessageMetadata } from "./message-meta";
import { ragChat } from "./rag-chat";

export async function serverGetMessages() {
  const sessionId = "test-session";

  if (!sessionId) throw new Error("No sessionId found");

  const messages = (await ragChat.history.getMessages({
    sessionId: sessionId,
    amount: 10,
  })) as UpstashMessage<MessageMetadata>[];

  return messages;
}

export async function serverClearMessages() {
  const sessionId = "test-session";

  if (!sessionId) throw new Error("No sessionId found");

  await ragChat.history.deleteMessages({ sessionId });
}

export async function serverQueryIndex(query: string) {
  try {
    const namespace = await getUserLocale();
    const parsedCredentials = z
      .object({
        query: z.string().min(2),
      })
      .required()
      .safeParse({
        query,
      });

    if (parsedCredentials.error) {
      return {
        code: ResultCode.MinLengthError,
        data: [],
      };
    }

    const q = {
      data: query as string,
      topK: 100,
      includeData: true,
      includeVectors: false,
      includeMetadata: true,
    };

    const t0 = performance.now();
    const data = await index.query<WikiMetadata>(q, { namespace });
    const t1 = performance.now();
    const ms = t1 - t0;

    return {
      code: ResultCode.Success,
      data,
      ms,
    };
  } catch (error) {
    console.error("Error querying Upstash:", error);
    return {
      code: ResultCode.UnknownError,
      data: [],
    };
  }
}

export async function serverGetInfo(): Promise<Info | undefined> {
  try {
    const data = await index.info();
    return data;
  } catch (error) {
    console.error("Error querying Upstash:", error);
    return undefined;
  }
}
