"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default async function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(pathname);
  console.log(searchParams);

  return (
    <div className="max-w-screen-md px-8 py-12">
      {/*<Header />
      <Search />
      <div className="mt-10">
        <List />
      </div>*/}

      <h2>deneme</h2>
    </div>
  );
}
