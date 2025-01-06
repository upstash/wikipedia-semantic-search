import { useSearch } from "@/lib/use-search";
import * as Select from "@radix-ui/react-select";
import { IconSelector } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ErrorMessages from "./error";
import List from "./list";
import { MODEL_OPTIONS, ModelOption } from "@/lib/types";

export const SearchResult = ({
  searchParam,
  onLoadingChange,
  modelOption,
  setModelOption,
}: {
  searchParam: string;
  onLoadingChange: (isLoading: boolean) => void;
  modelOption: ModelOption;
  setModelOption: (model: ModelOption) => void;
}) => {
  const query = useSearch({ modelOption, search: searchParam });

  // Update global loading state
  useEffect(() => {
    onLoadingChange(query.isPending);
  }, [query.isPending, onLoadingChange]);

  return (
    <div className="grid gap-4">
      <div>
        <Select.Root
          value={modelOption}
          onValueChange={(value: ModelOption) => setModelOption(value)}
        >
          <div className="flex w-full items-center justify-between px-6 py-2 border rounded-lg bg-zinc-950 text-white shadow-sm">
            {/* Select Trigger */}
            <Select.Trigger className="w-full" aria-label="Query Mode">
              {/* Label and Custom Icon */}
              <Select.Value>
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-white">
                    {modelOption}
                  </span>
                  <IconSelector
                    className="ml-auto inline-flex items-center"
                    opacity={0.6}
                  />
                </div>
              </Select.Value>
            </Select.Trigger>
          </div>

          <Select.Content
            className="z-10 bg-zinc-950 text-white border border-zinc-700 rounded-lg shadow-lg w-full"
            position="item-aligned"
          >
            <Select.Viewport>
              {MODEL_OPTIONS.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className="px-4 py-2 text-sm text-white hover:bg-emerald-500 hover:text-white cursor-pointer rounded-lg"
                >
                  <Select.ItemText>
                    <span className="font-semibold text-white text-base rounded-lg">
                      {option}
                    </span>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      {query.data?.ms && (
        <div className="flex justify-end text-xs text-zinc-400">
          Latency: {query.data?.ms.toFixed(0)}ms
        </div>
      )}
      {query.isError && <ErrorMessages state={query.data} />}
      <List state={query.data} />
    </div>
  );
};
