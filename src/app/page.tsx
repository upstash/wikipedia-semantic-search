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
import Container from "@/components/container";

export default function Page() {
  const [tab, setTab] = useState<"chat" | "search">("search");

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "chat" | "search")}
        >
          <TabsList>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="chat">RAG Chat</TabsTrigger>
          </TabsList>

          <Container className="py-6 sm:py-8">
            <TabsContent value="search" className="">
              <SearchTab />
            </TabsContent>
            <TabsContent value="chat">
              <ChatTab />
            </TabsContent>
          </Container>
        </Tabs>
      </main>
    </div>
  );
}
