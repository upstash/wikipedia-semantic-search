import { Result, WikiMetadata } from "@/lib/types";
import { useQuerySearchParam } from "@/lib/use-query-search-param";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { QueryResult } from "@upstash/vector";
import { PropsWithChildren } from "react";

export default function List({ state }: { state: Result | undefined }) {
  const [searchParam, setSearchParam] = useQuerySearchParam();
  const isEmpty = searchParam === "";

  const listItems = isEmpty
    ? undefined
    : !state || state.data.length === 0
      ? new Array(3).fill(null).map((_, i) => <ListItem key={i} skeleton />)
      : state?.data.map((vector, i) => (
          <ListItem key={vector.metadata?.id + i.toString()} vector={vector} />
        ));

  return <>{listItems}</>;
}

function ListItemBorderBox({ children }: PropsWithChildren) {
  return (
    <div className="p-6 bg-white rounded-2xl overflow-auto">{children}</div>
  );
}

function ListItem({
  vector,
  skeleton,
}:
  | {
      vector: QueryResult<WikiMetadata>;
      skeleton?: never;
    }
  | {
      vector?: never;
      skeleton: true;
    }) {
  if (skeleton) {
    return (
      <ListItemBorderBox>
        <div className="max-w-64 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
        <div className="max-w-[450px] mt-2 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
        <div className="max-w-[400px] mt-1 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
        <div className="max-w-[120px] mt-3 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
      </ListItemBorderBox>
    );
  }
  return (
    <ListItemBorderBox>
      <article>
        <p className="font-semibold text-zinc-950">{vector.metadata?.title}</p>
        <p className="line-clamp-2 text-zinc-700">{vector.data}</p>
        <p className="mt-2 text-ellipsis overflow-hidden text-zinc-500 line-clamp-1">
          Score: {vector.score.toFixed(4)} •{" "}
          <a
            href={vector.metadata?.url}
            target="_blank"
            className="hover:bg-emerald-100 text-ellipsis overflow-hidden w-1/4"
          >
            {decodeURI(vector.metadata?.url ?? "")}
          </a>
          <ExternalLinkIcon
            className="ml-1 inline-flex opacity-60"
            href={vector.metadata?.url}
          />
        </p>
      </article>
    </ListItemBorderBox>
  );
}
