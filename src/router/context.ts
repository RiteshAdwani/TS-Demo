import { createContext } from "react";
import type {
  InferredPaths,
  RouteDataForPath,
  RouterContextType,
  SearchParamsForPath,
} from "./types";

export const RouterContext = createContext<RouterContextType<
  InferredPaths,
  SearchParamsForPath<InferredPaths>,
  RouteDataForPath<InferredPaths>
> | null>(null);
