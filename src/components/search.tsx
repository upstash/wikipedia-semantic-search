import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import SearchSettings from "@/components/search-settings";
import { options } from "@/app/page";

export default function Search({
  query,
  setQuery,
  options,
  onChangeOptions,
}: {
  query: string;
  setQuery: (q: string) => void;
  onChangeOptions: (options: options) => void;
  options: options;
}) {
  const status = useFormStatus();

  return (
    <div className="flex gap-4 items-center">
      <input
        type="search"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        disabled={status.pending}
        className="grow border px-2 h-10"
      />
      <input type="hidden" name="topK" value={options.topK} />
      <SearchSettings
        onValueChangeTopK={(value) => {
          onChangeOptions({
            ...options,
            topK: Number(value) as options["topK"],
          });
        }}
      />

      <button
        type="submit"
        className={cn("border px-2 h-10", status.pending && "opacity-50")}
        disabled={status.pending}
      >
        Search
      </button>
    </div>
  );
}
