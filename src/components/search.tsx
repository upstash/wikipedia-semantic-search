"use client";

import { cn } from "@/lib/utils";
import LocaleSelect from "@/components/locale-select";
import { useFetchInfo } from "@/lib/use-fetch-info";

export default function Search({
  isLoading,
  value,
  onChange,
  onSubmit = () => {},
}: {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const { data: info } = useFetchInfo();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-wrap gap-2 items-center"
    >
      <input
        type="search"
        name="query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        disabled={isLoading}
        className="grow w-full md:w-auto border border-zinc-300 px-4 h-10 rounded-lg"
      />

      <LocaleSelect />

      <button
        type="submit"
        className={cn(
          "px-4 h-10 bg-yellow-950 text-white rounded-lg",
          isLoading && "opacity-30",
        )}
        disabled={isLoading}
      >
        Search
      </button>
    </form>
  );
}
