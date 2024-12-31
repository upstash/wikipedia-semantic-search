import { RAGChat } from "@upstash/rag-chat";
import { bgeIndex, mxbaiIndex } from "./dbs";
import { bgeRagChat, mxbaiRagChat } from "./rag-chat";
import { ModelOption } from "./types";
import { Index, QueryMode } from "@upstash/vector";

export const MODEL_CONFIGS: Record<
  ModelOption,
  {
    index: Index;
    queryMode: QueryMode;
  }
> = {
  "BGE-M3 (Dense)": {
    index: bgeIndex,
    queryMode: QueryMode.DENSE,
  },
  "MXBAI (Dense)": {
    index: mxbaiIndex,
    queryMode: QueryMode.DENSE,
  },
  "BGE-M3 (Sparse)": {
    index: bgeIndex,
    queryMode: QueryMode.SPARSE,
  },
  "BM25 (Sparse)": {
    index: mxbaiIndex,
    queryMode: QueryMode.SPARSE,
  },
  "BGE-M3 / BGE-M3 (Hybrid)": {
    index: bgeIndex,
    queryMode: QueryMode.HYBRID,
  },
  "MXBAI / BM25 (Hybrid)": {
    index: mxbaiIndex,
    queryMode: QueryMode.HYBRID,
  },
};

export const RAG_CHAT: Record<ModelOption, RAGChat> = {
  "BGE-M3 (Dense)": bgeRagChat,
  "MXBAI (Dense)": mxbaiRagChat,
  "BGE-M3 (Sparse)": bgeRagChat,
  "BM25 (Sparse)": mxbaiRagChat,
  "BGE-M3 / BGE-M3 (Hybrid)": bgeRagChat,
  "MXBAI / BM25 (Hybrid)": mxbaiRagChat,
};
