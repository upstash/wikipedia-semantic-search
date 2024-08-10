import { Info } from "@/lib/types";
import { formatter } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const Header = ({ info }: { info?: Info }) => {
  const router = useRouter();
  return (
    <header>
      <h1
        onClick={() => {
          router.replace("/");
        }}
        className="font-serif font-bold text-2xl md:text-3xl hover:underline cursor-pointer"
      >
        Wikipedia Semantic Search by Upstash Vector
      </h1>
      <p className="mt-1 opacity-80">
        Our database has{" "}
        <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b> with{" "}
        <b>{info?.dimension ?? "..."} dimensions</b>.
      </p>
    </header>
  );
};
