"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Info, SearchOptions } from "@/lib/types";
import LocaleSelect from "@/components/locale-select";
import React from "react";
import { options } from "@/app/page";
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
  search,
  setSearch,
  options,
  onChangeOptions,
  info,
}: {
  search: string;
  setSearch: (q: string) => void;
  onChangeOptions: (options: SearchOptions) => void;
  options: SearchOptions;
  info: Info | undefined;
}) {
  const status = useFormStatus();

  return (
    <>
      <LocaleSelect namespaces={info ? info.namespaces : {}} />

      <input
        type="search"
        name="query"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        disabled={status.pending}
        className="grow border px-2 h-10 rounded-md"
      />

      <input type="hidden" name="topK" value={options.topK} />

      <Popover>
        <PopoverTrigger>
          <button
            className="rounded-full w-10 h-10 inline-flex items-center
        justify-center bg-zinc-50 cursor-default outline-none
        hover:bg-zinc-200 focus:shadow-black"
          >
            <MixerHorizontalIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2.5">
            <p className="text-mauve12 text-[15px] font-medium mb-2.5">
              Search Settings
            </p>

            <fieldset className="flex gap-4 items-center">
              <label className="grow" htmlFor="topK">
                TopK
              </label>

              <ToggleGroup
                value={options.topK.toString()}
                type="single"
                onValueChange={(value) => {
                  onChangeOptions({
                    ...options,
                    topK: Number(value) as options["topK"],
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
        className={cn("border px-2 h-10", status.pending && "opacity-50")}
        disabled={status.pending}
      >
        Search
      </button>
    </>
  );
}
