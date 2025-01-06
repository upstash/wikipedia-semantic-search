import { useEffect, useState } from "react";
import Search from "./search";
import { InfoBox } from "./info-box";
import { useQuerySearchParam } from "../../lib/use-query-search-param";
import { formatter } from "@/lib/utils";
import { SearchResult } from "./search-result";
import { useFetchInfo } from "@/lib/use-fetch-info";
import { BorderBox } from "../border-box";

export const SearchTab = () => {
  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useQuerySearchParam();
  const [isInitial, setIsInitial] = useState(true);

  const { data: info } = useFetchInfo();

  const [isAnyLoading, setIsAnyLoading] = useState(false);

  // Use the search query in the URL
  useEffect(() => {
    if (!isInitial) return;
    setIsInitial(false);
    if (searchParam) {
      setSearch(searchParam);
    } else {
      setSearchParam("Who are the founders of internet?");
    }
  }, [searchParam, isInitial]);

  return (
    <div className="max-w-[1180px] mx-auto grid gap-4">
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
          This database index stores{" "}
          <b>{formatter.format(info?.vectorCount ?? 0)}</b> wikipedia articles.
        </p>
      </BorderBox>
      <div className="grid grid-cols-2 gap-4 justify-center max-w-[1180px] mx-auto w-full">
        <BorderBox>
          <SearchResult
            searchParam={searchParam}
            initialOption={"BGE-M3 (Dense)"}
            onLoadingChange={setIsAnyLoading}
          />
        </BorderBox>
        <BorderBox>
          <SearchResult
            searchParam={searchParam}
            initialOption={"BGE-M3 / BGE-M3 (Hybrid)"}
            onLoadingChange={setIsAnyLoading}
          />
        </BorderBox>
      </div>
      {!isAnyLoading && <InfoBox />}
    </div>
  );
};
