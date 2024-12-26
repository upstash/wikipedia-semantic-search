import { useSearch } from "@/lib/use-search";
import * as Select from "@radix-ui/react-select";
import { IconSelector } from "@tabler/icons-react";
import { QueryMode } from "@upstash/vector";
import { useEffect, useState } from "react";
import { SearchSkeleton } from "./search-skeleton";
import ErrorMessages from "./error";
import List from "./list";

export const SearchResult = ({
  searchParam,
  initialMode,
  onLoadingChange,
}: {
  searchParam: string;
  initialMode: QueryMode;
  onLoadingChange: (isLoading: boolean) => void;
}) => {
  const [queryMode, setQueryMode] = useState<QueryMode>(initialMode);
  const query = useSearch({ queryMode, search: searchParam });

  // Update global loading state
  useEffect(() => {
    onLoadingChange(query.isPending);
  }, [query.isPending, onLoadingChange]);

  return (
    <div className="grid gap-2">
      <div className="mb-1">
        <Select.Root
          value={queryMode}
          onValueChange={(value) => setQueryMode(value as QueryMode)}
        >
          <div className="flex w-full items-center justify-between px-6 py-2 border rounded-lg bg-zinc-950 text-white shadow-sm">
            {/* Select Trigger */}
            <Select.Trigger
              className="inline-flex items-center"
              aria-label="Query Mode"
            >
              {/* Label and Custom Icon */}
              <Select.Value className="flex items-center space-x-2">
                <span className="font-semibold text-white">
                  {options.find((option) => option.value === queryMode)?.label}
                </span>
                <IconSelector
                  className="inline-flex items-center ml-2"
                  opacity={0.6}
                />
              </Select.Value>
            </Select.Trigger>

            <div className="text-xs font-medium text-gray-400 border border-zinc-400 rounded px-1 mr-1">
              {query.data
                ? `Latency: ${query.data.ms?.toFixed(2)}`
                : query.isPending
                  ? "Loading..."
                  : ""}
            </div>
          </div>

          <Select.Content className="z-10 w-56 bg-zinc-950 text-white border border-zinc-700 rounded-md shadow-lg">
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="px-4 py-2 text-sm text-white hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>
      {query.isPending && <SearchSkeleton />}
      {query.isError && <ErrorMessages state={query.data} />}
      <List state={query.data} />
    </div>
  );
};

const options: { value: QueryMode; label: string }[] = [
  { value: QueryMode.DENSE, label: "Semantic (Dense)" },
  { value: QueryMode.HYBRID, label: "Hybrid" },
  { value: QueryMode.SPARSE, label: "Sparse" },
];
