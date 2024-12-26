import { useEffect, useState } from "react";
import ErrorMessages from "./error";
import List from "./list";
import Search from "./search";
import { InfoBox } from "./info-box";
import { SearchSkeleton } from "./search-skeleton";
import { useQuerySearchParam } from "../../lib/use-query-search-param";
import { useSearch } from "../../lib/use-search";

export const SearchTab = () => {
  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useQuerySearchParam();
  const [isInitial, setIsInitial] = useState(true);

  const queryNormal = useSearch({ isHybrid: false, search: searchParam });
  const queryHybrid = useSearch({ isHybrid: true, search: searchParam });
  const isLoading = queryNormal.isPending || queryHybrid.isPending;
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
    <div>
      <div className="max-w-[720px] mx-auto">
        <Search
          value={search}
          onChange={setSearch}
          onSubmit={() => {
            setSearchParam(search);
          }}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-8 flex gap-4 justify-center max-w-[1000px] mx-auto">
        <SearchResult query={queryNormal} />
        <SearchResult query={queryHybrid} />
      </div>
      <div className="max-w-[720px] mx-auto">{!isLoading && <InfoBox />}</div>
    </div>
  );
};

const SearchResult = ({ query }: { query: ReturnType<typeof useSearch> }) => {
  return (
    <div className="w-full">
      {query.isPending && <SearchSkeleton />}
      {query.isError && <ErrorMessages state={query.data} />}
      {query.data && <List state={query.data} />}
    </div>
  );
};
