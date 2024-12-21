import { queryIndex } from "@/lib/actions";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    query: string;
    isHybrid: boolean;
  };

  const result = await queryIndex({
    query: body.query,
    isHybrid: body.isHybrid,
  });

  return Response.json(result);
}
