"use client";

import { getData, getInfo } from "../lib/actions";
import { Info, ResultCode } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import List from "@/components/list";
import Search from "@/components/search";
import ErrorMessages from "@/components/error";
import EmptyState from "@/components/empty";
import { cn, formatter } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChatTab } from "./chat";

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

const Header = ({ info }: { info?: Info }) => {
  const router = useRouter();
  return (
    <header>
      <h1
        onClick={() => {
          router.replace("/");
        }}
        className="font-serif font-bold text-2xl md:text-3xl hover:underline cursor-pointer"
      >
        Wikipedia Semantic Search by Upstash Vector
      </h1>
      <p className="mt-1 opacity-80">
        Our database has{" "}
        <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b> with{" "}
        <b>{info?.dimension ?? "..."} dimensions</b>.
      </p>
    </header>
  );
};

export default function Page() {
  const [tab, setTab] = useState<"chat" | "search">("search");
  const { data: info } = useQuery({
    queryKey: ["info"],
    queryFn: async () => await getInfo(),
  });

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <Header info={info} />
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
      <SearchTab info={info} active={tab === "search"} />{" "}
      <ChatTab active={tab === "chat"} />
    </div>
  );
}

export const SearchTab = ({
  info,
  active,
}: {
  info?: Info;
  active: boolean;
}) => {
  const [search, setSearch] = useState<string>("");
  const [searchParam, setSearchParam] = useQuerySearchParam();
  const [isInitial, setIsInitial] = useState(true);

  const {
    data,
    mutate: fetchResults,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (query: string) => await getData(query),
  });
  const state = data ?? emptyState;

  useEffect(() => {
    if (!isInitial) return;
    setIsInitial(false);
    if (searchParam) fetchResults(searchParam);
    setSearch(searchParam);
  }, [searchParam, isInitial]);

  const onSubmit = () => {
    setSearchParam(search);
    fetchResults(search);
  };

  return (
    <div className={!active ? "hidden" : ""}>
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
          onSearch={(query: string) => {
            setSearch(query);
            setSearchParam(query);
            fetchResults(query);
          }}
        />
      </div>

      <div className="mt-8">
        <List loading={isLoading} state={state} info={info} />
      </div>
    </div>
  );
};

const useQuerySearchParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state = searchParams.get("query") ?? "";

  const setState = useCallback(
    (state: string) => {
      if (!state) router.push(pathname);
      else
        router.push(
          `${pathname}?${new URLSearchParams({
            query: state,
          })}`
        );
    },
    [searchParams]
  );

  return [state, setState] as const;
};
