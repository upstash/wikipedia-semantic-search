import { Result } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useSearch = ({
  isHybrid,
  search,
}: {
  isHybrid: boolean;
  search: string;
}) => {
  const context = useQuery({
    // This prevents the query from being re-executed after changing tabs
    staleTime: 1000 * 60,
    queryKey: ["search", search, isHybrid],
    queryFn: async () => {
      if (!search) return undefined;
      const req = await fetch("/api/query", {
        method: "POST",
        body: JSON.stringify({
          query: search,
          isHybrid,
        }),
      });

      return (await req.json()) as Result;
    },
  });

  const groupedData = useMemo(() => {}, [context.data]);

  return { ...context, groupedData };
};
