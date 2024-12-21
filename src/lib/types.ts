import { QueryResult } from "@upstash/vector";

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
