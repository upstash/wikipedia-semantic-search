import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ModelOption } from "./types";

type QuerySearchParam = {
  query: string;
  leftModel: ModelOption;
  rightModel: ModelOption;
};

export const useQuerySearchParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("query") ?? "";
  const leftModel = (searchParams.get("leftModel") ?? "") as ModelOption;
  const rightModel = (searchParams.get("rightModel") ?? "") as ModelOption;

  const setState = useCallback(
    (params: Partial<QuerySearchParam>) => {
      router.push(
        `${pathname}?${new URLSearchParams({
          query,
          leftModel,
          rightModel,
          ...params,
        })}`,
      );
    },
    [searchParams],
  );

  const params: QuerySearchParam = {
    query,
    leftModel,
    rightModel,
  };
  return [params, setState] as const;
};
