"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/service";
import { setUserLocale } from "@/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitive/select";
import { useFetchInfo } from "@/lib/use-fetch-info";

export default function LocaleSelect() {
  const { data: info } = useFetchInfo();
  const [_, startTransition] = useTransition();
  const locale = useLocale();

  return (
    <Select
      value={locale}
      name="locale"
      onValueChange={(value) => {
        startTransition(() => {
          return setUserLocale(value as Locale);
        });
      }}
    >
      <SelectTrigger>
        {info?.namespaces ? <SelectValue /> : locale.toLocaleUpperCase("en")}
      </SelectTrigger>
      <SelectContent>
        {!info?.namespaces
          ? []
          : Object.keys(info.namespaces)
              .filter((key) => info.namespaces[key].vectorCount > 0)
              .filter((key) => key !== "")
              .sort()
              .map((key) => (
                <SelectItem key={key} value={key}>
                  {key.toLocaleUpperCase("en")}
                </SelectItem>
              ))}
      </SelectContent>
    </Select>
  );
}
