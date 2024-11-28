import { useRouter } from "./useRouter";

// Hook to access route data
export function useRouteData<TRouteData = unknown>() {
  const { state } = useRouter();
  return state.data as TRouteData;
}
