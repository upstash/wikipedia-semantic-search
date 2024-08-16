import { RAGChat, upstash } from "@upstash/rag-chat";
import { index, redis } from "./dbs";

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct", {
    analytics: {
      name: "helicone",
      token: process.env.HELICONE_TOKEN!,
    },
  }),
  vector: index,
  redis: redis,
  debug: false,
  promptFn: ({ chatHistory, context, question }) => {
    return PROMPT.replace("{chatHistory}", chatHistory ?? "<NO_CHAT_HISTORY>")
      .replace("{context}", context)
      .replace("{question}", question);
  },
});

export const PROMPT = `You are a friendly AI assistant augmented with an Upstash Vector Store that contains embeddings from wikipedia.
To help you answer the questions, a context and chat history will be provided.
Answer the question at the end using only the information available in the context or chat history, either one is ok.

-------------
Chat history:
{chatHistory}
-------------
Context:
{context}
-------------

Question: {question}
Helpful answer:`;
