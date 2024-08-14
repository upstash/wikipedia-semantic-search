"use client";

import { useState } from "react";
import { ChatTab } from "@/components/chat-tab";
import { Header } from "@/components/header";
import { SearchTab } from "@/components/search-tab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/primitive/tabs";

export default function Page() {
  const [tab, setTab] = useState<"chat" | "search">("search");

  return (
    <div className="max-w-screen-md px-4 md:px-8 py-8 md:py-12">
      <Header />

      <Tabs
        className=""
        value={tab}
        onValueChange={(value) => setTab(value as "chat" | "search")}
      >
        <TabsList>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <SearchTab />
        </TabsContent>
        <TabsContent value="chat">
          <ChatTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
