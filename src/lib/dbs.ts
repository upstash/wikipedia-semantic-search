import { Redis } from "@upstash/redis";
import { Index } from "@upstash/vector";
import { WikiMetadata } from "./types";

export const index = new Index<WikiMetadata>();
export const redis = Redis.fromEnv();
