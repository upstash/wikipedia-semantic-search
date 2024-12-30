import { Redis } from "@upstash/redis";
import { Index } from "@upstash/vector";
import { WikiMetadata } from "./types";

export const mxbaiIndex = new Index<WikiMetadata>({
  url: process.env.MXBAI_UPSTASH_VECTOR_REST_URL,
  token: process.env.MXBAI_UPSTASH_VECTOR_REST_TOKEN,
});
export const bgeIndex = new Index<WikiMetadata>({
  url: process.env.BGE_UPSTASH_VECTOR_REST_URL,
  token: process.env.BGE_UPSTASH_VECTOR_REST_TOKEN,
});
export const redis = Redis.fromEnv();
