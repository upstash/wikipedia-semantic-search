import { useRouter } from "next/navigation";
import Container from "@/components/container";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-yellow-100 py-6 sm:pb-6">
      <Container>
        <h1
          onClick={() => {
            router.replace("/");
          }}
          className="font-serif font-bold text-2xl sm:text-3xl hover:underline cursor-pointer"
        >
          Wikipedia Semantic Search
        </h1>
      </Container>
    </header>
  );
};
