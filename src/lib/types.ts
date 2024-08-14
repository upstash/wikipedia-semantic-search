export type WikiMetadata = {
  id: string;
  url: string;
  title: string;
};

export type Wiki = {
  id: number | string;
  score: number;
  metadata?: WikiMetadata | undefined;
  data?: string;
};

export enum ResultCode {
  Empty = "EMPTY",
  Success = "SUCCESS",
  UnknownError = "UNKNOWN_ERROR",
  MinLengthError = "MIN_LENGTH_ERROR",
}

export interface Result {
  code: ResultCode;
  data: Wiki[];
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
