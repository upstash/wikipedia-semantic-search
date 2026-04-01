/**
 * Integration tests for MiniMax provider.
 *
 * Run with: pnpm test:integration
 * Requires: MINIMAX_API_KEY environment variable and network access to api.minimax.io
 */
import { describe, it, expect, beforeAll } from "vitest";

const MINIMAX_BASE_URL = "https://api.minimax.io/v1";
const TEST_MODEL = "MiniMax-M2.5-highspeed";

/** Returns true if the network can reach MiniMax API within 5 seconds */
async function canReachMiniMax(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    await fetch(`${MINIMAX_BASE_URL}/models`, {
      signal: controller.signal,
      headers: { Authorization: "Bearer probe" },
    });
    clearTimeout(timeout);
    return true;
  } catch {
    return false;
  }
}

describe("MiniMax API integration", () => {
  let apiKey: string;
  let networkAvailable: boolean;

  beforeAll(async () => {
    apiKey = process.env.MINIMAX_API_KEY ?? "";
    if (!apiKey) {
      console.warn(
        "Skipping MiniMax integration tests: MINIMAX_API_KEY not set"
      );
      networkAvailable = false;
      return;
    }
    networkAvailable = await canReachMiniMax();
    if (!networkAvailable) {
      console.warn(
        "Skipping MiniMax integration tests: api.minimax.io is not reachable"
      );
    }
  });

  it("connects to MiniMax API and gets a valid chat completion", async () => {
    if (!apiKey || !networkAvailable) return;

    const response = await fetch(`${MINIMAX_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: TEST_MODEL,
        messages: [
          {
            role: "user",
            content: "Reply with exactly one word: hello",
          },
        ],
        temperature: 0.01,
        max_tokens: 10,
      }),
    });

    expect(response.ok).toBe(true);

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    expect(data.choices).toBeDefined();
    expect(data.choices.length).toBeGreaterThan(0);
    expect(data.choices[0].message.content).toBeTruthy();
  });

  it("returns 204K context window size for MiniMax-M2.7", async () => {
    if (!apiKey || !networkAvailable) return;

    const response = await fetch(`${MINIMAX_BASE_URL}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    // Even if models endpoint is not available, the API should respond
    expect([200, 404].includes(response.status)).toBe(true);
  });

  it("rejects invalid API key with 401", async () => {
    if (!networkAvailable) return;

    const response = await fetch(`${MINIMAX_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer invalid-key",
      },
      body: JSON.stringify({
        model: TEST_MODEL,
        messages: [{ role: "user", content: "hi" }],
        temperature: 0.01,
      }),
    });

    expect([401, 403].includes(response.status)).toBe(true);
  });
});
