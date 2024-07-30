import { Info, Result } from "@/lib/types";
import React from "react";
import { formatter } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function EmptyState({
  loading,
  info,
  state,
  onSearch = () => {},
}: {
  loading: boolean;
  info: Info | undefined;
  state: Result | undefined;
  onSearch: (query: string) => void;
}) {
  const t = useTranslations();

  const vectorCount = info?.vectorCount ?? 0;
  const dimension = info?.dimension ?? 0;

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
      <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-lg">
        <p>
          Our database has <b>{formatter.format(vectorCount)} vectors</b> with{" "}
          <b>{dimension} dimensions</b>.
        </p>
      </div>

      <div className="mt-8">
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
      </div>
    </>
  );
}
