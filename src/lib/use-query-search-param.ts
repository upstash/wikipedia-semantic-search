import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQuerySearchParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state = searchParams.get("query") ?? "";

  const setState = useCallback(
    (state: string) => {
      if (!state) router.push(pathname);
      else
        router.push(
          `${pathname}?${new URLSearchParams({
            query: state,
          })}`,
        );
    },
    [searchParams],
  );

  return [state, setState] as const;
};
