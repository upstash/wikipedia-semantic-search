import { IconX } from "@tabler/icons-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/primitive/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitive/accordion";
import { PropsWithChildren, useState } from "react";
import { MessageMetadata, messageMetadataSchema } from "@/lib/message-meta";

export const DebugDrawer = ({
  metadata,
  children,
}: PropsWithChildren<{
  metadata: MessageMetadata;
}>) => {
  const [open, setOpen] = useState(false);
  const { success: isValid } = messageMetadataSchema.safeParse(metadata);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div
            onClick={() => {
              setOpen(true);
            }}
          >
            {children}
          </div>
        </SheetTrigger>
        {isValid ? (
          <SheetContent
            closeable={false}
            className="!p-0 sm:w-[400px] sm:max-w-[500px] xl:w-[600px] xl:max-w-none"
          >
            <SheetHeader className="border-0 border-b border-solid px-6 py-5">
              <SheetTitle className="flex items-center justify-between text-sm font-semibold ">
                <span>Debug Prompt</span>
                <IconX
                  className="cursor-pointer text-zinc-400"
                  stroke={1.5}
                  size={20}
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100vh-100px)] p-6 overflow-y-scroll">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Prompt</AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                        {metadata.usedPrompt}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Chat History</AccordionTrigger>
                  <AccordionContent>
                    {metadata.usedHistory.map(({ role, content }, i) => {
                      return (
                        <div key={i}>
                          {role}, {content}
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Context</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 divide-y">
                      {metadata?.usedContext.map(({ url, data }) => (
                        <div key={url + data}>
                          <a className="block underline" href={url}>
                            {url}
                          </a>
                          <p>{data}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        ) : (
          <SheetContent>
            Invalid metadata, message is probably old. Please try this with more
            recent messages
          </SheetContent>
        )}
      </Sheet>
    </>
  );
};
