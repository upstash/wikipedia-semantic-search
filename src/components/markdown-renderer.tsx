import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ children: markdown }: { children: string }) {
  return (
    <Markdown
      className="whitespace-pre-wrap"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        ul({ children }) {
          return (
            <ul className="list-disc whitespace-normal ms-4">{children}</ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="list-decimal whitespace-normal list-inside">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return <li className="">{children}</li>;
        },
        code({ children }) {
          return <code className="font-mono">{children}</code>;
        },
        a({ children, href }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
