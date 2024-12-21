import { Redis } from "@upstash/redis";
import { Index } from "@upstash/vector";
import { WikiMetadata } from "./types";

export const index = new Index<WikiMetadata>();
export const indexHybrid = new Index<WikiMetadata>({
  url: process.env.HYBRID_UPSTASH_VECTOR_REST_URL,
  token: process.env.HYBRID_UPSTASH_VECTOR_REST_TOKEN,
});
export const redis = Redis.fromEnv();
