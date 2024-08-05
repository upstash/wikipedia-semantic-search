"use server";

import { Index } from "@upstash/vector";
import { z } from "zod";
import {
  Info,
  Result,
  ResultCode,
  SearchOptions,
  WikiMetadata,
} from "@/lib/types";
import { getUserLocale } from "@/service";

const index = new Index<WikiMetadata>({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function getData(
  values: SearchOptions,
): Promise<Result | undefined> {
  try {
    const namespace = await getUserLocale();

    const query = values.query;
    const topK = values.topK;

    const parsedCredentials = z
      .object({
        query: z.string().min(2),
        topK: z.number().min(5).max(20),
      })
      .required()
      .safeParse({
        query,
        topK,
      });

    if (parsedCredentials.error) {
      return {
        code: ResultCode.MinLengthError,
        data: [],
      };
    }

    const q = {
      data: query as string,
      topK: Math.max(topK, 50), // Over query the index to return better results, if topK is small
      includeData: true,
      includeVectors: false,
      includeMetadata: true,
    };

    const t0 = performance.now();
    let data = await index.query<WikiMetadata>(q, { namespace });
    const t1 = performance.now();
    const ms = t1 - t0;

    // The response from the server is sorted (highest scores first, 
    // so we can just take the first topK many elements)
    data = data.slice(0, topK);

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
