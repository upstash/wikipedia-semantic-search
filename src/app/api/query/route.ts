import { queryIndex } from "@/lib/actions";
import { type QueryMode } from "@upstash/vector";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    query: string;
    queryMode: QueryMode;
  };

  const result = await queryIndex({
    query: body.query,
    queryMode: body.queryMode,
  });

  return Response.json(result);
}
