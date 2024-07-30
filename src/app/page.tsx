"use client";

import { getData, getInfo } from "./actions";
import { Info, Result, ResultCode, SearchOptions } from "@/lib/types";
import React, { useEffect, useState } from "react";
import List from "@/components/list";
import Search from "@/components/search";
import ErrorMessages from "@/components/error";
import EmptyState from "@/components/empty";
import { formatter } from "@/lib/utils";

const initialState = {
  data: [],
  code: ResultCode.Empty,
};

export default function Page() {
  const [state, setState] = useState<Result | undefined>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValues, setSearchValues] = React.useState<SearchOptions>({
    query: "",
    topK: 10,
  });
  const [info, setInfo] = useState<Info | undefined>(undefined);

  const fetchInfo = async () => {
    const info = await getInfo();
    setInfo(info);
  };

  const fetchData = async (options: SearchOptions) => {
    try {
      setLoading(true);
      const data = await getData(options);
      setState(data);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearchValues = (values: SearchOptions) => {
    setSearchValues(values);
  };

  const onClear = () => {
    // setSearchValues(values);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <header>
        <h1 className="font-serif font-bold text-2xl md:text-3xl">
          Wikipedia Semantic Search
        </h1>
        <p className="mt-1 opacity-80">
          Our database has{" "}
          <b>{formatter.format(info?.vectorCount ?? 0)} vectors</b> with{" "}
          <b>{info?.dimension} dimensions</b>.
        </p>
      </header>

      <Search
        loading={loading}
        info={info}
        searchValues={searchValues}
        onChangeSearchValues={onChangeSearchValues}
        onSubmit={fetchData}
        onClear={onClear}
      />

      <div className="mt-8">
        <ErrorMessages state={state} />
      </div>

      <div className="mt-8">
        <EmptyState
          loading={loading}
          state={state}
          info={info}
          onSearch={(query: string) => {
            setSearchValues({
              ...searchValues,
              query,
            });
            return fetchData({
              ...searchValues,
              query,
            });
          }}
        />
      </div>

      <div className="mt-8">
        <List loading={loading} state={state} info={info} />
      </div>
    </div>
  );
}
