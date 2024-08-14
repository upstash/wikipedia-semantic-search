"use client";

import { useState } from "react";
import { ChatTab } from "@/components/chat-tab";
import { Header } from "@/components/header";
import { SearchTab } from "@/components/search-tab";
import { Tab } from "@/components/primitive/tab";

export default function Page() {
  const [tab, setTab] = useState<"chat" | "search">("search");

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <Header />

      <div className="flex gap-1 mb-5 mt-8">
        <Tab
          active={tab === "search"}
          onClick={() => {
            setTab("search");
          }}
        >
          Search
        </Tab>
        <Tab
          active={tab === "chat"}
          onClick={() => {
            setTab("chat");
          }}
        >
          Chat
        </Tab>
      </div>

      <SearchTab active={tab === "search"} />
      <ChatTab active={tab === "chat"} />
    </div>
  );
}
