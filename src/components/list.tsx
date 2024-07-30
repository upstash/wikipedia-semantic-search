import { Info, Result } from "@/lib/types";
import React from "react";
import prettyMilliseconds from "pretty-ms";
import { formatter } from "@/lib/utils";

export default function List({
  loading,
  info,
  state,
}: {
  loading: boolean;
  info: Info | undefined;
  state: Result | undefined;
}) {
  if (state?.data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-emerald-100 text-emerald-900 px-4 py-3 rounded-lg">
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
            <h3 className="font-serif font-semibold text-xl">
              <a
                href={movie.metadata?.url}
                target="_blank"
                className="decoration-yellow-300 underline hover:bg-yellow-300"
              >
                {movie.metadata?.title}
              </a>
            </h3>

            <p className="line-clamp-3 opacity-60">{movie.data}</p>
            <p className="flex">
              <span className="text-sm px-2 text-zinc-600 border border-zinc-300 rounded bg-white">
                {movie.score}
              </span>
            </p>

            {/*<span className="">{decodeURI(movie.metadata?.url || "")}</span>*/}
          </article>
        ))}
      </div>
    </>
  );
}
