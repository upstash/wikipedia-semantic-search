import { Result } from "@/lib/types";
import React from "react";

export default function List({ state }: { state: Result | undefined }) {
  if (!state) {
    return null;
  }

  return (
    <div className="">
      {state.data.map((movie, index) => (
        <article
          key={movie.metadata?.id + index.toString()}
          className="border-t pt-4 mt-4 grid gap-1"
        >
          <h3 className="font-serif font-semibold text-xl">
            <a href={movie.metadata?.url} target="_blank" className="underline">
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
  );
}
