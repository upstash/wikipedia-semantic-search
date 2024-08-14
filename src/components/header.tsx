import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-yellow-100 p-6 sm:p-8 sm:pb-6">
      <h1
        onClick={() => {
          router.replace("/");
        }}
        className="font-serif font-bold text-2xl sm:text-3xl hover:underline cursor-pointer"
      >
        Wikipedia Semantic Search
      </h1>

      {/*<h5 className="mt-1 text-sm italic opacity-60">
        powered by{" "}
        <a href="https://upstash.com" className="underline">
          <b>Upstash Vector</b>
        </a>
      </h5>*/}
    </header>
  );
};
