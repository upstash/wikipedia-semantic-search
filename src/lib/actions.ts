"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { getUserLocale } from "@/service";
import { upstash, UpstashMessage } from "@upstash/rag-chat";
import { Info, ResultCode, WikiMetadata } from "@/lib/types";
import { index } from "./dbs";
import { MessageMetadata } from "./message-meta";
import { ragChat } from "./rag-chat";

export async function serverGetMessages() {
  const sessionId = cookies().get("sessionId")?.value;

  if (!sessionId) throw new Error("No sessionId found");

  const messages = (await ragChat.history.getMessages({
    sessionId: sessionId,
    amount: 10,
  })) as UpstashMessage<MessageMetadata>[];

  return messages;
}

export async function serverClearMessages() {
  const sessionId = cookies().get("sessionId")?.value;

  if (!sessionId) throw new Error("No sessionId found");

  await ragChat.history.deleteMessages({ sessionId });
}

const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

async function getKeywords(query: string) {
  const resp = await upstash("meta-llama/Meta-Llama-3-8B-Instruct", {
    analytics: {
      name: "helicone",
      token: process.env.HELICONE_TOKEN!,
    },
  }).invoke(`
    Please provide a list of keywords about the question given in JSON format.
    Don't answer with anything else.

    EXAMPLE INPUT:
    Ghandi

    EXAMPLE OUTPUT:
    ["Ghandi", "India", "peace", "leader", "non-violence", "freedom"]

    INPUT:
    ${query.split(" ").map(capitalizeWord).join(" ")}

    OUTPUT:
    `);

  console.log(resp);

  try {
    // @ts-ignore
    return JSON.parse(resp.content) as string[];
  } catch (error) {
    console.error("Error parsing keywords, prompt:", resp.content);
    return undefined;
  }
}

export async function serverQueryIndex(query: string) {
  try {
    const keywords = await getKeywords(query);
    console.log("query: ", query, "keywords: ", keywords);

    if (keywords && keywords.length > 0)
      query = query + " " + keywords.join(" ");

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
