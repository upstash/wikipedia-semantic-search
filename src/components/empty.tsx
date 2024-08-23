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
    return <Skeleton />;
  }

  if (state?.data && state?.data.length > 0) {
    return null;
  }

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

const Skeleton = () => {
  return (
    <div className="flex flex-col divide-y divide-zinc-700/10">
      <div className="mb-8 h-10 rounded-md animate-pulse bg-zinc-700/10" />
      {new Array(3).fill(null).map((_, i) => (
        <div className="flex flex-col gap-2 py-4" key={i}>
          <div className="max-w-[600px] mt-2 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
          <div className="max-w-[450px] mt-2 sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
          <div className="max-w-[450px] sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
          <div className="max-w-[120px] sm:h-5 h-4 rounded-md animate-pulse bg-zinc-700/10" />
        </div>
      ))}
    </div>
  );
};
