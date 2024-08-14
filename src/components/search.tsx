"use client";

import { cn } from "@/lib/utils";
import LocaleSelect from "@/components/locale-select";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

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
        placeholder="Ask a question..."
        disabled={isLoading}
        className="grow w-full sm:w-auto border border-zinc-300 px-4 h-10 rounded-lg"
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
        <PaperPlaneIcon />
      </button>
    </form>
  );
}
