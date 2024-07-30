import { Info, Result } from "@/lib/types";
import prettyMilliseconds from "pretty-ms";
import { formatter } from "@/lib/utils";
import React from "react";
import { useLocale } from "next-intl";

export default function InfoMessages({
  info,
  state,
}: {
  info: Info | undefined;
  state: Result | undefined;
}) {
  const locale = useLocale();
  const vectorCount = info?.vectorCount ?? 0;
  const dimension = info?.dimension ?? 0;
  const similarityFunction =
    info?.similarityFunction.toLocaleLowerCase() ?? "...";
  // const namespace = info?.namespaces[locale];

  // show general info
  if (state?.data.length === 0) {
    return (
      <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
        <p>
          Our database has <b>{formatter.format(vectorCount)} vectors</b> with{" "}
          <b>{dimension} dimensions</b>.
        </p>
        <p className="">
          We use <b>{similarityFunction}</b> to find similar results.
        </p>
      </div>
    );
  }

  // show search info
  return (
    <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
      <p>
        Search has been completed in <b>{prettyMilliseconds(state?.ms ?? 0)}</b>{" "}
        over <b>{formatter.format(vectorCount || 0)}</b> wikipedia records.
      </p>
    </div>
  );

  // return (
  //   <Collapsible className="mb-8 px-4 py-2 bg-emerald-50 border border-emerald-900/10 text-emerald-900 rounded-lg">
  //     <CollapsibleTrigger>
  //       Search has been completed in <b>{prettyMilliseconds(state?.ms ?? 0)}</b>{" "}
  //       over <b>{formatter.format(namespace?.vectorCount || 0)}</b> wikipedia
  //       records.
  //     </CollapsibleTrigger>
  //     <CollapsibleContent></CollapsibleContent>
  //   </Collapsible>
  // );
}
