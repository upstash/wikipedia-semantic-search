import { Info, Result, ResultCode } from "@/lib/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/primitive/collapsible";
import prettyMilliseconds from "pretty-ms";
import { formatter } from "@/lib/utils";
import React from "react";

export default function List({
  info,
  state,
}: {
  info: Info | undefined;
  state: Result | undefined;
}) {
  if (!state) {
    return null;
  }

  if (state.code === ResultCode.UnknownError) {
    return (
      <div className="text-red-600">
        <h3>An error occurred, please try again.</h3>
      </div>
    );
  }

  if (state.code === ResultCode.MinLengthError) {
    return (
      <div className="text-red-600">
        <h3>
          Please enter at least 2 characters to start searching for movies.
        </h3>
      </div>
    );
  }

  if (state.data.length === 0 && info) {
    return (
      <div className="bg-yellow-50 px-2 py-2 rounded-md">
        <p>
          Our database has <b>{formatter.format(info.vectorCount)} vectors</b>{" "}
          with <b>{info.dimension} dimensions</b>.
        </p>
        <p>
          We use <b>{info.similarityFunction}</b> to find similar results.
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {info && (
        <Collapsible className="mb-4">
          <CollapsibleTrigger className="px-2 py-1 bg-yellow-50 rounded-md">
            Search has been completed in{" "}
            <b>{prettyMilliseconds(state?.ms ?? 0)}</b> over{" "}
            <b>{formatter.format(info.vectorCount)}</b> wikipedia records.
          </CollapsibleTrigger>
          <CollapsibleContent>deneme</CollapsibleContent>
        </Collapsible>
      )}

      {state.data.map((movie) => (
        <article key={movie.metadata?.id} className="border-b pb-4 mb-4">
          <h3 className="font-serif font-semibold text-xl">
            <a
              href={movie.metadata?.url}
              target="_blank"
              className="underline px-2 bg-emerald-50 hover:bg-emerald-100"
            >
              {movie.metadata?.title}
            </a>
          </h3>

          <p className="ml-2 line-clamp-2 opacity-60">{movie.data}</p>

          {/*<footer className="mt-4 opacity-60 flex flex-wrap gap-2 *:px-2 *:border *:rounded *:border-zinc-200">
            <span className="">{movie.score}</span>
            <span className="">{decodeURI(movie.metadata?.url || "")}</span>
          </footer>*/}
        </article>
      ))}
    </div>
  );
}
