import React from "react";
import { useTranslations } from "next-intl";

export default function EmptyState({
  onSearch = () => {},
}: {
  onSearch: (query: string) => void;
}) {
  const t = useTranslations();

  const _onSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSearch(e.currentTarget.textContent ?? "");
  };

  return (
    <>
      <h3 className="opacity-80">{t("exampleTitle")}</h3>

      <ol className="mt-2 list-decimal grid gap-2 list-inside">
        <li>
          <a
            href=""
            className="font-serif font-bold hover:bg-yellow-100 decoration-yellow-300 underline text-2xl"
            onClick={_onSearch}
          >
            {t("example1")}
          </a>
        </li>
        <li>
          <a
            href=""
            className="font-serif font-bold hover:bg-yellow-100 decoration-yellow-300 underline text-2xl"
            onClick={_onSearch}
          >
            {t("example2")}
          </a>
        </li>
        <li>
          <a
            href=""
            className="font-serif font-bold hover:bg-yellow-100 decoration-yellow-300 underline text-2xl"
            onClick={_onSearch}
          >
            {t("example3")}
          </a>
        </li>
      </ol>
    </>
  );
}
