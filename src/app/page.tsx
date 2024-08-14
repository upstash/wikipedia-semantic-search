"use client";

import { useState } from "react";
import { ChatTab } from "@/components/chat-tab";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="grow">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "chat" | "search")}
        >
          <TabsList>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <div className="p-6 sm:p-8 max-w-screen-md">
            <TabsContent value="search" className="">
              <SearchTab />
            </TabsContent>
            <TabsContent value="chat">
              <ChatTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
