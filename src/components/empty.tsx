import { Result } from "@/lib/types";
import React from "react";
import { useTranslations } from "next-intl";

export default function EmptyState({
  loading,
  state,
  onSearch = () => {},
}: {
  loading: boolean;
  state: Result | undefined;
  onSearch: (query: string) => void;
}) {
  const t = useTranslations();

  const _onSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSearch(e.currentTarget.textContent ?? "");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (state?.data && state?.data.length > 0) {
    return null;
  }

  return (
    <>
      <h3>{t("exampleTitle")}</h3>

      <ol className="mt-2 list-decimal grid gap-2 list-inside">
        <li>
          <a
            href=""
            className="font-serif font-bold hover:bg-yellow-300 decoration-yellow-300 underline text-xl"
            onClick={_onSearch}
          >
            {t("example1")}
          </a>
        </li>
        <li>
          <a
            href=""
            className="font-serif font-bold hover:bg-yellow-300 decoration-yellow-300 underline text-xl"
            onClick={_onSearch}
          >
            {t("example2")}
          </a>
        </li>
        <li>
          <a
            href=""
            className="font-serif font-bold hover:bg-yellow-300 decoration-yellow-300 underline text-xl"
            onClick={_onSearch}
          >
            {t("example3")}
          </a>
        </li>
      </ol>
    </>
  );
}
