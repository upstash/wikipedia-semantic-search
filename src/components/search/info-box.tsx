import { useFetchInfo } from "@/lib/use-fetch-info";
import { formatter } from "@/lib/utils";
import { Info } from "../info";

export const InfoBox = () => {
  const { data: info } = useFetchInfo();

  return (
    <Info className="mt-16 sm:mt-24 px-10">
      <p>
        This project is an experiment to demonstrate the scalability of Upstash
        Vector with large datasets. We vectorized <b>23M Wikipedia articles</b>{" "}
        and store{" "}
        <b>{info ? formatter.format(info.vectorCount) : "..."} vectors</b> in
        Upstash Vector. You can compare results from dense, hybrid and sparse
        indexes.
      </p>

      <p>
        <b>
          👉 Check out the{" "}
          <a
            className="underline"
            target="_blank"
            href="https://github.com/upstash/wikipedia-semantic-search"
          >
            github repo
          </a>{" "}
          or the{" "}
          <a
            className="underline"
            target="_blank"
            href="https://upstash.com/blog/sparse-and-hybrid-indexes"
          >
            blog post
          </a>{" "}
          for more.
        </b>
      </p>
    </Info>
  );
};
