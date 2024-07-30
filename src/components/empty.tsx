import { Result } from "@/lib/types";
import React from "react";

export default function EmptyState({ state }: { state: Result | undefined }) {
  if (state?.data && state?.data.length > 0) {
    return null;
  }

  return (
    <ul className="">
      <li>Dünyanın en yüksek dağı</li>
    </ul>
  );
}
