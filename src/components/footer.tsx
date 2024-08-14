import { useFetchInfo } from "@/lib/use-fetch-info";
import { formatter } from "@/lib/utils";

export const Footer = () => {
  const { data: info } = useFetchInfo();

  return (
    <footer className="mt-8 rounded-lg border border-yellow-500/20 text-sm grid gap-4 bg-yellow-500/10 p-6">
      <p>
        This project is an experiment to demonstrate the scalability of Upstash
        Vector with large datasets. We vectorized <b>23M Wikipedia Articles</b>{" "}
        in <b>11 Languages</b> and stored{" "}
        <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b> in a
        single Upstash Vector index.
      </p>
      <p>
        <b>
          👉 Check out our{" "}
          <a className="underline" href="/">
            blog post for more
          </a>
        </b>
      </p>
    </footer>
  );
};
