"use server";

import { Index } from "@upstash/vector";
import { z } from "zod";
import { Info, Result, ResultCode, WikiMetadata } from "@/lib/types";
import { getUserLocale } from "@/service";

const index = new Index<WikiMetadata>({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function searchMovies(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  try {
    const namespace = await getUserLocale();

    const query = formData.get("query");
    const topK = Number(formData.get("topK"));

    console.log(query, topK);

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
      topK: topK as number,
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
