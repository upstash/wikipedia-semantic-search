import { queryIndex } from "@/lib/actions";
import { type QueryMode } from "@upstash/vector";

export const SEARCH_OPTIONS = [
  "BGE-M3 (Dense)",
  "MXBAI (Dense)",
  "BGE-M3 (Sparse)",
  "BM25 (Sparse)",
  "BGE-M3 / BGE-M3 (Hybrid)",
  "MXBAI / BM25 (Hybrid)",
] as const;
export type SearchOption = (typeof SEARCH_OPTIONS)[number];

export async function POST(req: Request) {
  const body = (await req.json()) as {
    query: string;
    searchOption: SearchOption;
  };

  const result = await queryIndex({
    query: body.query,
    searchOption: body.searchOption,
  });

  return Response.json(result);
}
