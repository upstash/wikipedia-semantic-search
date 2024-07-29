import React from "react";
import type { PopoverProps } from "@radix-ui/react-popover";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/primitive/toggle-group";
import { SearchOptions } from "@/lib/types";

const SearchSettings = ({
  onValueChangeTopK,
  options,
}: PopoverProps & {
  options: SearchOptions;
  onValueChangeTopK: (value: string) => void;
}) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        className="rounded-full w-10 h-10 inline-flex items-center
        justify-center bg-zinc-50 cursor-default outline-none
        hover:bg-zinc-200 focus:shadow-black"
      >
        <MixerHorizontalIcon />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="rounded-xl p-5 w-[260px] bg-white shadow-2xl"
        sideOffset={5}
      >
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
              onValueChange={onValueChangeTopK}
            >
              <ToggleGroupItem value="5">5</ToggleGroupItem>
              <ToggleGroupItem value="10">10</ToggleGroupItem>
              <ToggleGroupItem value="20">20</ToggleGroupItem>
            </ToggleGroup>

            {/*<input
              id="topK"
              name="topK"
              type="range"
              min={5}
              step={5}
              max={20}
            />*/}
          </fieldset>
        </div>
        <Popover.Close
          className="rounded-full h-[25px] w-[25px]
          inline-flex items-center
           justify-center text-violet11 absolute top-[5px]
           right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px]
           focus:shadow-violet7 outline-none cursor-default"
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default SearchSettings;
