import { Result } from "@/lib/types";
import prettyMilliseconds from "pretty-ms";
import { formatter } from "@/lib/utils";
import { useFetchInfo } from "@/lib/use-fetch-info";

export default function List({ state }: { state: Result | undefined }) {
  const { data: info } = useFetchInfo();

  if (state?.data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-lg">
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
                className="decoration-yellow-300 underline hover:bg-yellow-300"
              >
                {movie.metadata?.title}
              </a>
            </h3>

            <p className="line-clamp-3 opacity-80">{movie.data}</p>

            <p className="flex">
              <span className="text-sm px-2 text-zinc-600 border border-zinc-300 rounded bg-white">
                Score: {movie.score}
              </span>
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
