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
    <>
      <Header />

      <main>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "chat" | "search")}
        >
          <TabsList className="block">
            <Container>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="chat">Chat to Wikipedia</TabsTrigger>
            </Container>
          </TabsList>

          <TabsContent value="search" className="">
            <Container className="py-6 sm:py-8">
              <SearchTab />
            </Container>
          </TabsContent>
          <TabsContent value="chat">
            <Container className="py-6 sm:py-8">
              <ChatTab />
            </Container>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
