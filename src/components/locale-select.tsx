"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/service";
import { setUserLocale } from "@/service";
import { Info } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitive/select";

export default function LocaleSelect({
  namespaces = {},
}: {
  namespaces: Info["namespaces"];
}) {
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
        <SelectValue placeholder="Select a locale" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(namespaces)
          .filter((key) => namespaces[key].vectorCount > 0)
          .map((key) => (
            <SelectItem key={key} value={key}>
              {key.toLocaleUpperCase("en")}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
