import { useQuery } from "@tanstack/react-query";
import { serverGetInfo } from "./actions";

export const useFetchInfo = () => {
  return useQuery({
    queryKey: ["info"],
    queryFn: async () => await serverGetInfo(),
  });
};
