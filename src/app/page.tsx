"use client";

import { getData, getInfo } from "./actions";
import { Info, Result, ResultCode, SearchOptions } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import List from "@/components/list";
import Search from "@/components/search";
import InfoMessages from "@/components/info";
import ErrorMessages from "@/components/error";
import EmptyState from "@/components/empty";

const initialState = {
  data: [],
  code: ResultCode.Empty,
};

export default function Page() {
  const t = useTranslations();

  const [state, setState] = useState<Result | undefined>(initialState);
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
    const data = await getData(options);
    setState(data);
  };

  const onChangeSearchValues = (values: SearchOptions) => {
    setSearchValues(values);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <header>
        <h1 className="font-serif font-bold text-2xl md:text-3xl">
          {t("title")}
        </h1>
      </header>

      <Search
        info={info}
        searchValues={searchValues}
        onChangeSearchValues={onChangeSearchValues}
        onSubmit={fetchData}
      />

      <div className="mt-8">
        <InfoMessages state={state} info={info} />
      </div>

      <div className="mt-8">
        <ErrorMessages state={state} />
      </div>

      <div className="mt-8">
        <EmptyState state={state} />
      </div>

      <div className="mt-8">
        <List state={state} />
      </div>
    </div>
  );
}
