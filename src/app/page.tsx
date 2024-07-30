"use client";

import { useFormState } from "react-dom";
import { getInfo, searchMovies } from "./actions";
import { Info, ResultCode, SearchOptions } from "@/lib/types";
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

  const [info, setInfo] = useState<Info | undefined>(undefined);

  const [state, formAction] = useFormState(searchMovies, initialState);
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = React.useState<SearchOptions>({
    topK: 10,
  });

  const updateViews = async () => {
    const info = await getInfo();
    setInfo(info);
  };

  useEffect(() => {
    updateViews();
  }, []);

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <header>
        <h1 className="font-serif font-bold text-2xl md:text-3xl">
          {t("title")}
        </h1>
      </header>

      <form
        action={formAction}
        className="mt-10 flex flex-wrap gap-2 items-center"
      >
        <Search
          info={info}
          search={search}
          setSearch={setSearch}
          options={options}
          onChangeOptions={(data: SearchOptions) => {
            setOptions(data);
          }}
        />
      </form>

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
