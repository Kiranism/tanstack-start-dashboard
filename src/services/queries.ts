import { queryOptions } from "@tanstack/react-query";
import { getUserSession } from "../lib/auth";

export const authQueries = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, "user"],
      queryFn: () => getUserSession(),
      staleTime: 5000,
    }),
};
