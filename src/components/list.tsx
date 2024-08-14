import { Result } from "@/lib/types";
import prettyMilliseconds from "pretty-ms";
import { formatter } from "@/lib/utils";
import { useFetchInfo } from "@/lib/use-fetch-info";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function List({ state }: { state: Result | undefined }) {
  const { data: info } = useFetchInfo();

  if (state?.data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-emerald-50 text-emerald-900 px-4 py-2 rounded-lg">
        <p>
          Search has been completed in{" "}
          <b>{prettyMilliseconds(state?.ms ?? 0)}</b> over{" "}
          <b>{formatter.format(info?.vectorCount ?? 0)}</b> wikipedia records.
        </p>
      </div>

      <div className="mt-8">
        {state?.data.map((movie, index) => (
          <article
            key={movie.metadata?.id + index.toString()}
            className="border-t border-yellow-700/10 pt-5 mt-5 grid gap-1"
          >
            <h3 className="font-serif font-semibold text-xl sm:text-2xl">
              <a
                href={movie.metadata?.url}
                target="_blank"
                className="decoration-yellow-300 underline hover:bg-yellow-100"
              >
                {movie.metadata?.title}
                <ExternalLinkIcon className="ml-1 inline-flex opacity-60" />
              </a>
            </h3>

            <p className="line-clamp-3 opacity-80">{movie.data}</p>

            <p className="flex">
              <span className="text-xs px-2 py-0.5 uppercase rounded font-mono bg-yellow-700/10">
                Score:<b>{movie.score}</b>
              </span>
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
