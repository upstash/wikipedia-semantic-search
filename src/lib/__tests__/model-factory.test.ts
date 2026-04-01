import { describe, it, expect, vi, beforeEach } from "vitest";
import { createModel } from "../model-factory";

// Mocks are hoisted before any imports
vi.mock("@upstash/rag-chat", () => ({
  RAGChat: vi.fn(),
  openai: vi.fn().mockReturnValue({ type: "openai-model" }),
  custom: vi.fn().mockReturnValue({ type: "custom-model" }),
}));

// Import mocks after the vi.mock call
const { openai, custom } = await import("@upstash/rag-chat");

describe("createModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    // Ensure MINIMAX_API_KEY is blank by default so error-path tests work
    // even when the env var is set on the host machine
    vi.stubEnv("MINIMAX_API_KEY", "");
  });

  it("defaults to OpenAI when LLM_PROVIDER is not set", () => {
    vi.stubEnv("OPENAI_API_KEY", "test-openai-key");

    createModel();

    expect(openai).toHaveBeenCalledWith("gpt-4-turbo", {
      apiKey: "test-openai-key",
    });
    expect(custom).not.toHaveBeenCalled();
  });

  it("uses OpenAI when LLM_PROVIDER=openai", () => {
    vi.stubEnv("LLM_PROVIDER", "openai");
    vi.stubEnv("OPENAI_API_KEY", "test-openai-key");

    createModel();

    expect(openai).toHaveBeenCalledWith("gpt-4-turbo", {
      apiKey: "test-openai-key",
    });
    expect(custom).not.toHaveBeenCalled();
  });

  it("uses MiniMax when LLM_PROVIDER=minimax", () => {
    vi.stubEnv("LLM_PROVIDER", "minimax");
    vi.stubEnv("MINIMAX_API_KEY", "test-minimax-key");

    createModel();

    expect(custom).toHaveBeenCalledWith(
      "MiniMax-M2.7",
      expect.objectContaining({
        apiKey: "test-minimax-key",
        baseUrl: "https://api.minimax.io/v1",
        temperature: 0.01,
      })
    );
    expect(openai).not.toHaveBeenCalled();
  });

  it("uses MINIMAX_MODEL env var when set", () => {
    vi.stubEnv("LLM_PROVIDER", "minimax");
    vi.stubEnv("MINIMAX_API_KEY", "test-minimax-key");
    vi.stubEnv("MINIMAX_MODEL", "MiniMax-M2.7-highspeed");

    createModel();

    expect(custom).toHaveBeenCalledWith(
      "MiniMax-M2.7-highspeed",
      expect.any(Object)
    );
  });

  it("throws when LLM_PROVIDER=minimax but MINIMAX_API_KEY is missing", () => {
    vi.stubEnv("LLM_PROVIDER", "minimax");
    vi.stubEnv("MINIMAX_API_KEY", ""); // explicitly empty

    expect(() => createModel()).toThrow(
      "MINIMAX_API_KEY is required when LLM_PROVIDER=minimax"
    );
  });

  it("sets temperature to minimum 0.01 for MiniMax (API requires temp > 0)", () => {
    vi.stubEnv("LLM_PROVIDER", "minimax");
    vi.stubEnv("MINIMAX_API_KEY", "test-key");

    createModel();

    expect(custom).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ temperature: 0.01 })
    );
  });

  it("uses MiniMax base URL https://api.minimax.io/v1", () => {
    vi.stubEnv("LLM_PROVIDER", "minimax");
    vi.stubEnv("MINIMAX_API_KEY", "test-key");

    createModel();

    expect(custom).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ baseUrl: "https://api.minimax.io/v1" })
    );
  });

  it("treats LLM_PROVIDER case-insensitively", () => {
    vi.stubEnv("LLM_PROVIDER", "MiniMax");
    vi.stubEnv("MINIMAX_API_KEY", "test-key");

    createModel();

    expect(custom).toHaveBeenCalled();
    expect(openai).not.toHaveBeenCalled();
  });

  it("defaults to MiniMax-M2.7 model when MINIMAX_MODEL is not set", () => {
    vi.stubEnv("LLM_PROVIDER", "minimax");
    vi.stubEnv("MINIMAX_API_KEY", "test-key");

    createModel();

    expect(custom).toHaveBeenCalledWith("MiniMax-M2.7", expect.any(Object));
  });
});
