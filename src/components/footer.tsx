import { useFetchInfo } from "@/lib/use-fetch-info";
import { formatter } from "@/lib/utils";

export const Footer = () => {
  const { data: info } = useFetchInfo();

  return (
    <footer className="p-6 sm:p-8 max-w-screen-md">
      <div className="text-emerald-900 rounded-lg border border-emerald-200 text-sm grid gap-4 bg-emerald-50 p-6">
        <p>
          This project is an experiment to demonstrate the scalability of
          Upstash Vector with large datasets. We vectorized{" "}
          <b>23M Wikipedia articles</b> in <b>11 languages</b> and stored{" "}
          <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b> in
          a single Upstash Vector index.
        </p>

        <p>
          <b>
            👉 Check out our{" "}
            <a className="underline" href="/">
              blog post for more...
            </a>
          </b>
        </p>
      </div>
    </footer>
  );
};
