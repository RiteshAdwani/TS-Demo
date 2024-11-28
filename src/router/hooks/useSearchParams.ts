import { InferredPaths, SearchParamsForPath } from "../types";
import { useRouter } from "./useRouter";

// Hook to access search params
export function useSearchParams() {
  const { getCurrentRoute } = useRouter();
  const route = getCurrentRoute();

  type currentPath = (typeof route)["path"] extends InferredPaths
    ? (typeof route)["path"]
    : never;

  return route.searchParams as SearchParamsForPath<currentPath>;
}
