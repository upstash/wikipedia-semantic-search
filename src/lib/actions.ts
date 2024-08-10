"use server";

import { z } from "zod";
import { Info, Result, ResultCode, WikiMetadata } from "@/lib/types";
import { getUserLocale } from "@/service";
import { index } from "./dbs";
import { buildRagChat } from "./rag-chat";
import { cookies } from "next/headers";

export async function getMessages() {
  const sessionId = cookies().get("sessionId")?.value;

  if (!sessionId) throw new Error("No sessionId found");

  const messages = await buildRagChat(sessionId).history.getMessages({
    sessionId: sessionId,
    amount: 10,
  });

  return messages;
}

export async function clearMessages() {
  const sessionId = cookies().get("sessionId")?.value;

  if (!sessionId) throw new Error("No sessionId found");

  await buildRagChat(sessionId).history.deleteMessages({ sessionId });
}

export async function getData(query: string): Promise<Result | undefined> {
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

export async function getInfo(): Promise<Info | undefined> {
  try {
    const data = await index.info();
    return data;
  } catch (error) {
    console.error("Error querying Upstash:", error);
    return undefined;
  }
}
