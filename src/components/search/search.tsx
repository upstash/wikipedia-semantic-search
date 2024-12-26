"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
      className="relative flex items-center"
    >
      <input
        type="search"
        name="query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask a question..."
        disabled={isLoading}
        className="shadow-sm border placeholder:text-zinc-950/50 text-zinc-950 rounded-md pl-6 pr-14 h-10 w-full outline-none ring-0 bg-emerald-50 font-medium"
      />
      <button
        type="submit"
        className="absolute right-6 flex items-center justify-center h-6 w-6 text-zinc-950"
        disabled={isLoading}
      >
        <MagnifyingGlassIcon width={20} height={20} />
      </button>
    </form>
  );
}
