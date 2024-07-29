"use client";

import { useFormState } from "react-dom";
import { getInfo, searchMovies } from "./actions";
import { Info, ResultCode } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import List from "@/components/list";
import Search from "@/components/search";

const initialState = {
  data: [],
  code: ResultCode.Empty,
};

export type options = {
  topK: 5 | 10 | 20;
};

export default function Page() {
  const t = useTranslations();

  const [info, setInfo] = useState<Info | undefined>(undefined);

  const [state, formAction] = useFormState(searchMovies, initialState);
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = React.useState<options>({
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
    <div className="max-w-screen-md px-8 py-12">
      <header>
        <h1 className="">{t("title")}</h1>
      </header>

      <form action={formAction} className="mt-10 flex gap-2 items-center">
        <Search
          info={info}
          search={search}
          setSearch={setSearch}
          options={options}
          onChangeOptions={(data: options) => {
            setOptions(data);
          }}
        />
      </form>

      <div className="mt-10">
        <List state={state} info={info} />
      </div>
    </div>
  );
}
