"use client";

import { cn } from "@/lib/utils";
import { Info, SearchOptions } from "@/lib/types";
import LocaleSelect from "@/components/locale-select";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/primitive/popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/primitive/toggle-group";

export default function Search({
  loading,
  info,
  searchValues,
  onChangeSearchValues,
  onSubmit = () => {},
  onClear = () => {},
}: {
  loading: boolean;
  info: Info | undefined;
  searchValues: SearchOptions;
  onChangeSearchValues: (options: SearchOptions) => void;
  onSubmit: (options: SearchOptions) => void;
  onClear?: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchValues);
      }}
      className="mt-10 flex flex-wrap gap-2 items-center"
    >
      <input
        type="search"
        name="query"
        value={searchValues.query}
        onChange={(e) =>
          onChangeSearchValues({
            ...searchValues,
            query: e.target.value,
          })
        }
        placeholder="Search..."
        disabled={loading}
        className="grow w-full md:w-auto border border-zinc-300 px-2 h-10 rounded-lg"
      />

      <LocaleSelect namespaces={info ? info.namespaces : {}} />

      <Popover>
        <PopoverTrigger>
          <button
            className="rounded-lg w-10 h-10 border-zinc-300 border inline-flex items-center
        justify-center bg-white cursor-default outline-none
        hover:bg-zinc-200 focus:shadow-black"
          >
            <MixerHorizontalIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <fieldset className="flex gap-4 items-center">
              <label className="grow" htmlFor="topK">
                TopK
              </label>

              <ToggleGroup
                value={searchValues.topK.toString()}
                type="single"
                onValueChange={(value) => {
                  onChangeSearchValues({
                    ...searchValues,
                    topK: Number(value) as SearchOptions["topK"],
                  });
                }}
              >
                <ToggleGroupItem value="5">5</ToggleGroupItem>
                <ToggleGroupItem value="10">10</ToggleGroupItem>
                <ToggleGroupItem value="20">20</ToggleGroupItem>
              </ToggleGroup>
            </fieldset>
          </div>
        </PopoverContent>
      </Popover>

      <button
        type="submit"
        className={cn(
          "px-4 h-10 bg-black text-white rounded-lg",
          loading && "opacity-30",
        )}
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
}
