import { RAGChat, upstash } from "@upstash/rag-chat";
import { index, redis } from "./dbs";

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
  vector: index,
  redis: redis,
  debug: true,
});
