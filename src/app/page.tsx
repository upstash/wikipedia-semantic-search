"use client";

import { getInfo } from "../lib/actions";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTab } from "../components/chat-tab";
import { Header } from "@/components/header";
import { SearchTab } from "@/components/search-tab";
import { Tab } from "@/components/primitive/tab";

export default function Page() {
  const [tab, setTab] = useState<"chat" | "search">("search");
  const { data: info } = useQuery({
    queryKey: ["info"],
    queryFn: async () => await getInfo(),
  });

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <Header info={info} />
      <div className="flex gap-1 mb-5 mt-8">
        <Tab
          label="Search"
          active={tab === "search"}
          onClick={() => {
            setTab("search");
          }}
        />
        <Tab
          label="Chat"
          active={tab === "chat"}
          onClick={() => {
            setTab("chat");
          }}
        />
      </div>
      <SearchTab info={info} active={tab === "search"} />{" "}
      <ChatTab active={tab === "chat"} />
    </div>
  );
}
