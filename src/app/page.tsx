"use client";

import { Suspense, useState } from "react";
import { ChatTab } from "@/components/chat-tab";
import { SearchTab } from "@/components/search/search-tab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/primitive/tabs";
import Container from "@/components/container";
import { BorderBox } from "@/components/border-box";

export default function Page() {
  const [tab, setTab] = useState<"chat" | "search">("search");

  return (
    <>
      <main className="bg-zinc-100">
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "chat" | "search")}
        >
          <BorderBox className="max-w-[1180px] mx-auto w-full bg-zinc-100 flex flex-col items-center justify-center text-sm mt-10">
            <a
              className="font-semibold text-2xl text-zinc-950 text-center"
              href="/"
            >
              Hybrid and Semantic Search on Wikipedia Articles
            </a>
            <div className="text-zinc-500 flex items-center mt-2">
              Powered by&nbsp;
              <img
                src="/favicon-32x32.png"
                alt="Upstash Vector Icon"
                height={17}
                width={17}
                className="-ml-[2px] mr-[2px]"
              />
              <a
                href="https://upstash.com/vector"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-600 transition-colors underline-offset-2"
              >
                Upstash Vector
              </a>
              &nbsp;and&nbsp;
              <a
                href="https://openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-600 transition-colors underline-offset-2"
              >
                OpenAI
              </a>
            </div>
            <TabsList className="block mt-4">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
          </BorderBox>

          <TabsContent value="search" className="">
            <div className="py-6 sm:py-8">
              <Suspense fallback="Loadings...">
                <SearchTab />
              </Suspense>
            </div>
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
