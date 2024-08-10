"use client";

import { cn } from "@/lib/utils";
import { Info } from "@/lib/types";
import LocaleSelect from "@/components/locale-select";

export default function Search({
  loading,
  info,
  value,
  onChange,
  onSubmit = () => {},
}: {
  loading: boolean;
  info: Info | undefined;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mt-10 flex flex-wrap gap-2 items-center"
    >
      <input
        type="search"
        name="query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        disabled={loading}
        className="grow w-full md:w-auto border border-zinc-300 px-2 h-10 rounded-lg"
      />

      <LocaleSelect namespaces={info ? info.namespaces : {}} />

      <button
        type="submit"
        className={cn(
          "px-4 h-10 bg-black text-white rounded-lg",
          loading && "opacity-30"
        )}
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
}
