import { openai, custom } from "@upstash/rag-chat";

const MINIMAX_BASE_URL = "https://api.minimax.io/v1";
// MiniMax temperature must be in (0.0, 1.0] — clamp to minimum positive value
const MINIMAX_MIN_TEMPERATURE = 0.01;

/**
 * Creates an LLM model instance based on environment configuration.
 *
 * Set LLM_PROVIDER=minimax and MINIMAX_API_KEY to use MiniMax models.
 * Supported MiniMax models: MiniMax-M2.7 (default), MiniMax-M2.7-highspeed,
 * MiniMax-M2.5, MiniMax-M2.5-highspeed (all with 204K context window).
 *
 * Defaults to OpenAI gpt-4-turbo when LLM_PROVIDER is unset.
 */
export function createModel() {
  const provider = (process.env.LLM_PROVIDER ?? "openai").toLowerCase();

  if (provider === "minimax") {
    const apiKey = process.env.MINIMAX_API_KEY;
    if (!apiKey) {
      throw new Error(
        "MINIMAX_API_KEY is required when LLM_PROVIDER=minimax"
      );
    }
    const model = process.env.MINIMAX_MODEL ?? "MiniMax-M2.7";
    return custom(model, {
      apiKey,
      baseUrl: MINIMAX_BASE_URL,
      // MiniMax requires temperature > 0; clamp to MINIMAX_MIN_TEMPERATURE
      temperature: MINIMAX_MIN_TEMPERATURE,
    });
  }

  return openai("gpt-4-turbo", {
    apiKey: process.env.OPENAI_API_KEY!,
  });
}
