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
      className="flex gap-2 items-center"
    >
      <input
        type="search"
        name="query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask a question..."
        disabled={isLoading}
        className="border placeholder:text-yellow-950/50 border-yellow-700/20 rounded-md px-4 h-10 w-full focus:border-yellow-950 outline-none ring-0"
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
