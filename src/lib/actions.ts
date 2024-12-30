"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { UpstashMessage } from "@upstash/rag-chat";
import { Info, Result, ResultCode, WikiMetadata } from "@/lib/types";
import { MessageMetadata } from "./message-meta";
import { ragChat } from "./rag-chat";
import {
  FusionAlgorithm,
  type Index,
  QueryMode,
  QueryResult,
  WeightingStrategy,
} from "@upstash/vector";
import { SearchOption } from "@/app/api/query/route";
import { bgeIndex, mxbaiIndex } from "./dbs";

const configs: Record<
  SearchOption,
  {
    index: Index;
    queryMode: QueryMode;
  }
> = {
  "BGE-M3 (Dense)": {
    index: bgeIndex,
    queryMode: QueryMode.DENSE,
  },
  "MXBAI (Dense)": {
    index: mxbaiIndex,
    queryMode: QueryMode.DENSE,
  },
  "BGE-M3 (Sparse)": {
    index: bgeIndex,
    queryMode: QueryMode.SPARSE,
  },
  "BM25 (Sparse)": {
    index: mxbaiIndex,
    queryMode: QueryMode.SPARSE,
  },
  "BGE-M3 / BGE-M3 (Hybrid)": {
    index: bgeIndex,
    queryMode: QueryMode.HYBRID,
  },
  "MXBAI / BM25 (Hybrid)": {
    index: mxbaiIndex,
    queryMode: QueryMode.HYBRID,
  },
};

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

export async function queryIndex({
  query,
  searchOption,
}: {
  query: string;
  searchOption: SearchOption;
}): Promise<Result> {
  try {
    const namespace = "en";
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

    const { index, queryMode } = configs[searchOption];

    const q: Parameters<Index["query"]>[0] = {
      data: query as string,
      topK: 100,
      includeData: true,
      includeVectors: false,
      includeMetadata: true,
      queryMode,
      fusionAlgorithm: FusionAlgorithm.DBSF,
      weightingStrategy: WeightingStrategy.IDF,
    };

    const t0 = performance.now();
    const result = await index.query<WikiMetadata>(q, { namespace });
    const t1 = performance.now();
    const ms = t1 - t0;

    return {
      code: ResultCode.Success,
      data: removeDuplicates(result),
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

function removeDuplicates(results: QueryResult<WikiMetadata>[]) {
  const map = new Map<string, QueryResult<WikiMetadata>>();
  for (const result of results) {
    if (!result.metadata?.url || map.has(result.metadata.url)) continue;

    map.set(result.metadata?.url, result);
  }

  return Array.from(map.values()).sort((a, b) => b.score - a.score);
}

export async function serverGetInfo(): Promise<Info | undefined> {
  try {
    const data = await bgeIndex.info();
    return data;
  } catch (error) {
    console.error("Error querying Upstash:", error);
    return undefined;
  }
}
