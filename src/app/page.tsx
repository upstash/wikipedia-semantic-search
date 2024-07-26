"use client";

import { useFormState } from "react-dom";
import { searchMovies } from "./actions";
import { ResultCode } from "@/lib/types";
import Search from "@/components/search";
import List from "@/components/list";
import React, { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Locale, setUserLocale } from "@/service";
import { cn } from "@/lib/utils";

const initialState = {
  data: [],
  code: ResultCode.Empty,
};
export type options = {
  topK: 5 | 10 | 20;
};

export default function Page() {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const [state, formAction] = useFormState(searchMovies, initialState);
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = React.useState<options>({
    topK: 5,
  });

  const onChangeQuery = (q: string) => {
    setQuery(q);
  };

  return (
    <div className="max-w-screen-md px-8 py-12">
      <header>
        <select
          value={locale}
          name="locale"
          className={cn(isPending ? "opacity-50" : "")}
          onChange={(event) => {
            startTransition(() => {
              return setUserLocale(event.target.value as Locale);
            });
          }}
        >
          <option value="en">EN</option>
          <option value="tr">TR</option>
        </select>

        <h1 onClick={() => window.location.reload()} className="">
          {t("home.title")}
        </h1>
      </header>

      <form action={formAction} className="mt-10">
        <Search
          query={query}
          options={options}
          onChangeOptions={(data: options) => {
            setOptions(data);
          }}
          setQuery={setQuery}
        />

        <div className="mt-10">
          <List state={state} onChangeQuery={onChangeQuery} />
        </div>
      </form>
    </div>
  );
}
