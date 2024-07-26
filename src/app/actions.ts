"use server";

import { Index } from "@upstash/vector";
import { z } from "zod";
import { Info, Result, ResultCode, WikiMetadata } from "@/lib/types";
import prettyMilliseconds from "pretty-ms";

const index = new Index<WikiMetadata>({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

export async function searchMovies(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  try {
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

    // console.log(parsedCredentials.error?.message);

    if (parsedCredentials.error) {
      return {
        code: ResultCode.MinLengthError,
        data: [],
      };
    }

    const t0 = performance.now();

    const res = await index.info();
    console.log(res);

    const data = await index.query<WikiMetadata>(
      {
        data: query as string,
        topK: topK as number,
        includeData: true,
        includeVectors: false,
        includeMetadata: true,
      },
      {
        namespace: "tr",
      },
    );

    const t1 = performance.now();
    const ms = prettyMilliseconds(t1 - t0);

    console.log(ms);

    return {
      code: ResultCode.Success,
      data,
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
