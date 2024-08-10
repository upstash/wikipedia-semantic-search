import { RAGChat, upstash } from "@upstash/rag-chat";
import { index, redis } from "./dbs";

export const buildRagChat = (sessionId: string) =>
  new RAGChat({
    model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
    sessionId,
    vector: index,
    redis: redis,
  });
