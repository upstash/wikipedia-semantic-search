import { serverQueryIndex } from "@/lib/actions";
import { ResultCode } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import EmptyState from "./empty";
import ErrorMessages from "./error";
import List from "./list";
import Search from "./search";
import { Info } from "@/components/info";
import { useFetchInfo } from "@/lib/use-fetch-info";
import { formatter } from "@/lib/utils";

const emptyState = {
  data: [],
  code: ResultCode.Empty,
};

export const SearchTab = () => {
  const { data: info } = useFetchInfo();

  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useQuerySearchParam();
  const [isInitial, setIsInitial] = useState(true);

  const {
    data,
    mutate: fetchResults,
    isPending: isLoading,
    reset,
  } = useMutation({
    mutationFn: async (query: string) => await serverQueryIndex(query),
  });

  const groupedData = useMemo(() => {
    const results = data?.data;
    if (!results) return [];

    // Group by url
    const map = new Map<string, (typeof results)[number]>();
    for (const result of results) {
      if (!result.metadata?.url || map.has(result.metadata.url)) continue;

      map.set(result.metadata?.url, result);
    }

    return Array.from(map.values()).sort((a, b) => b.score - a.score);
  }, [data]);

  const state = data ?? emptyState;

  useEffect(() => {
    if (!isInitial) return;
    setIsInitial(false);
    if (searchParam) fetchResults(searchParam);
    setSearch(searchParam);
  }, [searchParam, isInitial]);

  useEffect(() => {
    if (!searchParam) reset();
  }, [searchParam]);

  const onSubmit = () => {
    setSearchParam(search);
    fetchResults(search);
  };

  return (
    <div className="max-w-[720px]">
      <Search
        value={search}
        onChange={setSearch}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      <div className="mt-8">
        <ErrorMessages state={state} />
      </div>

      <div className="mt-8 grow">
        <EmptyState
          loading={isLoading}
          state={state}
          onSearch={(query: string) => {
            setSearch(query);
            setSearchParam(query);
            fetchResults(query);
          }}
        />
      </div>

      <div className="mt-8">
        <List
          state={{
            ...state,
            data: groupedData,
          }}
        />
      </div>

      {!isLoading && (
        <Info className="mt-16 sm:mt-24">
          <p>
            This project is an experiment to demonstrate the scalability of
            Upstash Vector with large datasets. We vectorized{" "}
            <b>23M Wikipedia articles</b> in <b>11 languages</b> and stored{" "}
            <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b>{" "}
            in a single Upstash Vector index.
          </p>

          <p>
            <b>
              👉 Check out the{" "}
              <a
                className="underline"
                target="_blank"
                href="https://github.com/upstash/wikipedia-semantic-search"
              >
                github repo
              </a>{" "}
              or the{" "}
              <a
                className="underline"
                target="_blank"
                href="https://upstash.com/blog/indexing-wikipedia"
              >
                blog post
              </a>{" "}
              for more.
            </b>
          </p>
        </Info>
      )}
    </div>
  );
};

const useQuerySearchParam = () => {
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
