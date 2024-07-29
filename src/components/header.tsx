"use client";

import { useTranslations } from "next-intl";
import LocaleSelect from "@/components/locale-select";

export default async function Header() {
  const t = useTranslations();

  return (
    <header>
      <h1 onClick={() => window.location.reload()} className="">
        {t("home.title")} <LocaleSelect />
      </h1>
    </header>
  );
}
