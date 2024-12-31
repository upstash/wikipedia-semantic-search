import { queryIndex } from "@/lib/actions";
import { ModelOption } from "@/lib/types";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    query: string;
    modelOption: ModelOption;
  };

  const result = await queryIndex({
    query: body.query,
    modelOption: body.modelOption,
  });

  return Response.json(result);
}
