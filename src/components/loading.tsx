import { Result, ResultCode } from "@/lib/types";
import { useFormStatus } from "react-dom";

export default function List({
  state,
  onChangeQuery = () => {},
}: {
  state: Result | undefined;
  onChangeQuery: (q: string) => void;
}) {
  const status = useFormStatus();

  const handleClick = (query: string) => {
    onChangeQuery(query);
  };

  if (status.pending) {
    return <div>Loading...</div>;
  }

  if (state?.code === ResultCode.UnknownError) {
    return (
      <div className="text-red-600">
        <h3>An error occurred, please try again.</h3>
      </div>
    );
  }

  if (state?.code === ResultCode.MinLengthError) {
    return (
      <div className="text-red-600">
        <h3>
          Please enter at least 2 characters to start searching for movies.
        </h3>
      </div>
    );
  }

  if (state?.code === ResultCode.Empty) {
    return (
      <ol className="">
        <li>
          <h4 className="opacity-60">
            Search movies by title, genre, or description...
          </h4>
          <button
            type="submit"
            onClick={() => handleClick("a romantic comedy set in New York")}
          >
            a romantic comedy set in New York
          </button>
        </li>
      </ol>
    );
  }

  return (
    <div className="ml-4 list-decimal">
      {state?.data.map((movie) => (
        <article key={movie.metadata?.id} className="border-b pb-4 mb-4">
          <h3 className="font-serif font-semibold text-2xl">
            <a href={movie.metadata?.url} target="_blank">
              {movie.metadata?.title}
            </a>
          </h3>

          <p className="line-clamp-2 opacity-60">{movie.data}</p>

          <footer className="opacity-60 flex flex-wrap gap-2 *:px-2 *:border *:rounded *:border-zinc-200">
            <span className="">{movie.score}</span>
            <span className="">{decodeURI(movie.metadata?.url || "")}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}
