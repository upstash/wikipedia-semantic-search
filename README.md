# Indexing Millions of Wikipedia Articles With Upstash Vector

This repository contains the code and documentation for our project on indexing millions of Wikipedia articles using Upstash Vector, as described in our [blog post](https://upstash.com/blog/indexing-wikipedia).

## Project Overview

We've created a semantic search engine and [Upstash RAG Chat SDK](https://github.com/upstash/rag-chat) using Wikipedia data to demonstrate the capabilities of Upstash Vector and RAG Chat SDK. The project involves:

1. Preparing and embedding Wikipedia articles
2. Indexing the vectors using Upstash Vector
3. Building a Wikipedia semantic search engine
4. Implementing a RAG chatbot

## Key Features

- Indexed over 144 million vectors from Wikipedia articles in 11 languages
- Used BGE-M3 embedding model for multilingual support
- Implemented semantic search with cross-lingual capabilities
- Created a RAG chatbot using Upstash RAG Chat SDK

## Technologies Used

- [Upstash Vector](https://upstash.com/docs/vector/overall/getstarted): For storing and querying vector embeddings
- [Upstash Redis](https://upstash.com/redis): For storing chat sessions
- [Upstash RAG Chat SDK](https://github.com/upstash/rag-chat): For building the RAG Chat application
- [SentenceTransformers](https://www.sbert.net/): For generating embeddings
- [Meta-Llama-3-8B-Instruct](https://ai.meta.com/blog/llama-3-available/): As the LLM provider through [QStash LLM APIs](https://upstash.com/docs/qstash/features/llm)
- [MiniMax](https://api.minimax.io): Alternative LLM provider via OpenAI-compatible API

## Development

To run the project locally, follow these steps:

1. Go to [Upstash Console](https://console.upstash.com/) to manage your databases:
   - Create a new Vector database with embedding model support. You can choose the BGE-M3 model for multilingual support.
   - Create a new Redis database for storing chat sessions.
   - Copy the credentials for both Redis and Vector. Also copy the QStash credentials for using the upstash hosted LLM models.

Put the credentials in a `.env` file in the root of the project. Your `.env` file should look like this:

```bash
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=

UPSTASH_REDIS_REST_TOKEN=
UPSTASH_REDIS_REST_URL=

QSTASH_TOKEN=

# LLM Provider: "openai" (default) or "minimax"
LLM_PROVIDER=openai

# OpenAI — required when LLM_PROVIDER=openai
OPENAI_API_KEY=

# MiniMax — required when LLM_PROVIDER=minimax
MINIMAX_API_KEY=
MINIMAX_MODEL=MiniMax-M2.7
```

### Using MiniMax as the LLM backend

[MiniMax](https://api.minimax.io) provides an OpenAI-compatible API with models that have a 204K context window, making them well-suited for RAG workloads with large Wikipedia contexts.

To switch to MiniMax, set the following environment variables:

```bash
LLM_PROVIDER=minimax
MINIMAX_API_KEY=<your MiniMax API key>
# Optional — defaults to MiniMax-M2.7
MINIMAX_MODEL=MiniMax-M2.7
```

Available MiniMax models (all with 204K context):

| Model | Notes |
|---|---|
| `MiniMax-M2.7` | Latest, highest quality (default) |
| `MiniMax-M2.7-highspeed` | Faster, lower latency |
| `MiniMax-M2.5` | Previous generation |
| `MiniMax-M2.5-highspeed` | Previous generation, faster |

2. Populate your Vector index.

> This project uses namespaces to store articles in different languages. So you have to upsert the vectors in the correct namespace. For english, upsert your vectors into the `en` namespace.

3. Install the dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
pnpm dev
```

## Contributing

We welcome contributions to improve this project. Please feel free to submit issues or pull requests.

## Acknowledgements

- Wikipedia for providing the dataset
- Upstash for their vector database and RAG Chat SDK
- All contributors to the open-source libraries used in this project

## Contact

For any questions or feedback about the project or Upstash Vector, please reach out to us at (add contact information).

Check out our [live demo](https://wikipedia-semantic-search.vercel.app/) to see the project in action!
