import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitive/accordion";
import { PropsWithChildren, useState } from "react";
import { MessageMetadata, messageMetadataSchema } from "@/lib/message-meta";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitive/dialog";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export const DebugDrawer = ({
  metadata,
}: PropsWithChildren<{
  metadata: MessageMetadata;
}>) => {
  const [open, setOpen] = useState(false);
  const { success: isValid } = messageMetadataSchema.safeParse(metadata);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button
          type="button"
          className="underline uppercase cursor-pointer font-mono text-xs opacity-50"
          onClick={() => {
            setOpen(true);
          }}
        >
          debug
        </button>
      </DialogTrigger>

      {isValid ? (
        <DialogContent>
          <DialogTitle>Debug Prompt</DialogTitle>

          <div className="mt-8">
            <Accordion type="single" className="w-full" defaultValue="prompt">
              <AccordionItem value="prompt">
                <AccordionTrigger>Prompt</AccordionTrigger>
                <AccordionContent>
                  <pre className="whitespace-pre-wrap">
                    {metadata.usedPrompt}
                  </pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="history">
                <AccordionTrigger>Chat History</AccordionTrigger>
                <AccordionContent>
                  {metadata.usedHistory.map(({ role, content }, i) => {
                    return (
                      <pre key={i} className="whitespace-pre-wrap">
                        <b>{role}</b>: {content}
                      </pre>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="context">
                <AccordionTrigger>Context</AccordionTrigger>
                <AccordionContent>
                  <div className="grid">
                    {metadata?.usedContext.map(({ url, data }) => (
                      <div
                        className="pb-2 mb-2 border-b border-b-yellow-500/5"
                        key={url + data}
                      >
                        <h4>
                          <a className="underline" href={url} target="_blank">
                            <b>{decodeURI(url)}</b>
                            <ExternalLinkIcon className="ml-1 inline-flex opacity-60" />
                          </a>
                        </h4>
                        <p className="line-clamp-2 opacity-80">{data}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          Invalid metadata, message is probably old. Please try this with more
          recent messages
        </DialogContent>
      )}
    </Dialog>
  );
};
