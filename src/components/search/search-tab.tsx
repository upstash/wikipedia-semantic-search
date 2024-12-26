import { PropsWithChildren, useEffect, useState } from "react";
import Search from "./search";
import { InfoBox } from "./info-box";
import { useQuerySearchParam } from "../../lib/use-query-search-param";
import { QueryMode } from "@upstash/vector";
import { cn } from "@/lib/utils";
import { SearchResult } from "./search-result";

const BorderBox = ({
  children,
  className = "",
}: PropsWithChildren & { className?: string }) => {
  return (
    <div className={cn("p-8 border border-zinc-300  rounded-3xl", className)}>
      {children}
    </div>
  );
};

export const SearchTab = () => {
  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useQuerySearchParam();
  const [isInitial, setIsInitial] = useState(true);

  const [isAnyLoading, setIsAnyLoading] = useState(false);
  const isEmpty = searchParam === "";

  // Use the search query in the URL
  useEffect(() => {
    if (!isInitial) return;
    setIsInitial(false);
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParam, isInitial]);

  return (
    <div className="max-w-5xl mx-auto grid gap-4">
      <BorderBox>
        <Search
          value={search}
          onChange={setSearch}
          onSubmit={() => {
            setSearchParam(search);
          }}
          isLoading={isAnyLoading}
        />
        <p className="text-zinc-500 text-sm mt-2 -mb-2">
          This database index stores 144M wikipedia articles.
        </p>
      </BorderBox>
      <div className="flex gap-4 justify-center max-w-5xl mx-auto w-full">
        <BorderBox className={"w-full"}>
          <SearchResult
            searchParam={searchParam}
            initialMode={QueryMode.DENSE}
            onLoadingChange={setIsAnyLoading}
          />
        </BorderBox>
        <BorderBox className={"w-full"}>
          <SearchResult
            searchParam={searchParam}
            initialMode={QueryMode.HYBRID}
            onLoadingChange={setIsAnyLoading}
          />
        </BorderBox>
      </div>
      <div>{!isAnyLoading && <InfoBox />}</div>
    </div>
  );
};
