"use client";

import { getData, getInfo } from "../lib/actions";
import { ResultCode } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import List from "@/components/list";
import Search from "@/components/search";
import ErrorMessages from "@/components/error";
import EmptyState from "@/components/empty";
import { cn, formatter } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Chat } from "./chat";

const emptyState = {
  data: [],
  code: ResultCode.Empty,
};

export const Tab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer border-b-2 px-2 py-1 transition-all bg-transparent rounded-none",
        {
          "hover:bg-amber-100 rounded-lg": !active,
          "border-b-amber-700": active,
          "border-b-transparent": !active,
        }
      )}
    >
      {label}
    </div>
  );
};

export default function Page() {
  const [search, setSearch] = useQueryState("query");
  const [tab, setTab] = useState<"chat" | "search">("search");

  const {
    data,
    mutate: fetchResults,
    reset: resetResults,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (query: string) => await getData(query),
  });

  useEffect(() => {
    if (search) fetchResults(search);
  }, [search]);

  const state = data ?? emptyState;

  const { data: info } = useQuery({
    queryKey: ["info"],
    queryFn: async () => await getInfo(),
  });

  const onSubmit = () => {
    fetchResults(search);
  };

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <header>
        <h1
          onClick={() => {
            setTab("search");
            setSearch("");
            resetResults();
          }}
          className="font-serif font-bold text-2xl md:text-3xl hover:underline cursor-pointer"
        >
          Wikipedia Semantic Search by Upstash Vector
        </h1>
        <p className="mt-1 opacity-80">
          Our database has{" "}
          <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b>{" "}
          with <b>{info?.dimension ?? "..."} dimensions</b>.
        </p>
      </header>

      <div className="flex gap-1 mb-5 mt-8">
        <Tab
          label="Search"
          active={tab === "search"}
          onClick={() => {
            setTab("search");
          }}
        />
        <Tab
          label="Chat"
          active={tab === "chat"}
          onClick={() => {
            setTab("chat");
          }}
        />
      </div>

      {tab === "search" ? (
        <div>
          <Search
            value={search}
            onChange={setSearch}
            onSubmit={onSubmit}
            loading={isLoading}
            info={info}
          />

          <div className="mt-8">
            <ErrorMessages state={state} />
          </div>

          <div className="mt-8">
            <EmptyState
              loading={isLoading}
              state={state}
              info={info}
              onSearch={(query: string) => {
                setSearch(query);
                fetchResults(query);
              }}
            />
          </div>

          <div className="mt-8">
            <List loading={isLoading} state={state} info={info} />
          </div>
        </div>
      ) : (
        <Chat />
      )}
    </div>
  );
}

const useQueryState = (key: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state = searchParams.get(key) ?? "";

  const setState = useCallback(
    (state: string) => {
      console.log("oathname", pathname);
      if (!state) router.push(pathname);
      else
        router.push(
          `${pathname}?${new URLSearchParams({
            key: state,
          })}`
        );
    },
    [searchParams]
  );

  return [state, setState] as const;
};
