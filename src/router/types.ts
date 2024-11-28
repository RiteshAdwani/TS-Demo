import { ComponentType } from "react";
import { routes } from "../routes";

// ============== Search Params ==============
export type SearchParams<T> = {
  [K in keyof T]: string | string[];
};

// ============== Route Params ==============
export type RouteParams<TPath> =
  TPath extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & RouteParams<Rest>
    : TPath extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : Record<string, never>;

// ============== Route ==============
export type Route<
  TPath extends string,
  TSearch = unknown,
  TLoaderData = unknown
> = {
  path: TPath;
  component: ComponentType;
  searchParams?: TSearch;
  loader?: (params: any) => Promise<TLoaderData> | TLoaderData;
  children?: Route<TPath, TSearch, TLoaderData>[];
};

// ============== Router Options ==============
export type RouterOptions<TConfig extends readonly Route<any, any, any>[]> = {
  routes: TConfig;
  initialPath?: string;
};

// ============== Router state ==============
export type RouterState = {
  currentPath: string;
  previousPath?: string;
  params: Record<string, string>;
  searchParams: Record<string, string | string[]>;
  isLoading: boolean;
  error?: Error;
  data?: unknown;
};

// ============== Navigate options ==============
export type NavigateOptions = {
  replace?: boolean;
  state?: any;
};

// ============== Link component props ==============
export type LinkProps<
  TRoutes extends readonly Route<any, any, any>[],
  TPath extends RoutePaths<TRoutes> = InferredPaths
> = {
  to: TPath;
  params?: RouteParams<TPath>;
  searchParams?: SearchParams<
    Extract<TRoutes[number], { path: TPath }>["searchParams"]
  >;
  children: React.ReactNode;
};

// ============== Router context ==============
export type RouterContextType<
  TPath extends InferredPaths,
  TSearchParams = SearchParamsForPath<TPath>,
  TRouteData = RouteDataForPath<TPath>
> = {
  state: RouterState;
  navigate: (path: string, options?: NavigateOptions) => Promise<RouterState>;
  back: () => RouterState;
  forward: () => RouterState;
  getCurrentRoute: () => Route<TPath, TSearchParams, TRouteData>;
  getCurrentState: () => RouterState;
  isActive: (path: string) => boolean;
};

// Helper type to extract route paths
export type RoutePaths<T extends readonly Route<any, any, any>[]> =
  T[number]["path"];

// Helper type to match route paths
export type RouteMatch<T extends Route<any, any, any>> = {
  params: RouteParams<T["path"]>;
  searchParams: T extends Route<any, infer S>
    ? SearchParams<S>
    : Record<string, never>;
  data?: T extends Route<any, any, infer D> ? D : never;
};

// Helper type to extract route configuration from routes array
export type RouteConfig = (typeof routes)[number];

// Helper type to extract paths from routes array
export type InferredPaths = RouteConfig["path"];

// Helper type to extract search params from RouteConfig
export type SearchParamsForPath<Path extends InferredPaths> = Extract<
  RouteConfig,
  { path: Path }
> extends { searchParams: infer Params }
  ? Params
  : undefined;

// Helper type to extract route data from RouteConfig
export type RouteDataForPath<Path extends InferredPaths> = Extract<
  RouteConfig,
  { path: Path }
> extends { loader: (...args: any[]) => Promise<infer U> | infer U }
  ? U
  : undefined;
