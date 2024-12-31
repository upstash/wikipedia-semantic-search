import type { QueryResult } from "@upstash/vector";

export type WikiMetadata = {
  id: string;
  url: string;
  title: string;
};

export enum ResultCode {
  Empty = "EMPTY",
  Success = "SUCCESS",
  UnknownError = "UNKNOWN_ERROR",
  MinLengthError = "MIN_LENGTH_ERROR",
}

export interface Result {
  code: ResultCode;
  data: QueryResult<WikiMetadata>[];
  ms?: number;
}

interface NamespaceData {
  vectorCount: number;
  pendingVectorCount: number;
}

export interface Info {
  vectorCount: number;
  pendingVectorCount: number;
  indexSize: number;
  dimension: number;
  similarityFunction: string;
  namespaces: {
    [key: string]: NamespaceData;
  };
}

export const MODEL_OPTIONS = [
  "BGE-M3 (Dense)",
  "MXBAI (Dense)",
  "BGE-M3 (Sparse)",
  "BM25 (Sparse)",
  "BGE-M3 / BGE-M3 (Hybrid)",
  "MXBAI / BM25 (Hybrid)",
] as const;
export type ModelOption = (typeof MODEL_OPTIONS)[number];
