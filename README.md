# Custom Type-Safe Router

This project implements a custom **type-safe router** built using TypeScript. It provides features similar to the Tanstack Router but on a smaller scale. The router ensures **type inference** for search params, route params, and other types of data associated with routes, making it easy to handle routing in a type-safe manner.

## Features

- **Type inference** for:
  - Route params
  - Search params
  - Data associated with a route
- Data loading during route definition
- React hooks for interacting with the router, such as:
  - `useRouter`
  - `useSearchParams`
  - `useParams`
  - `useRouteData`
- A `Link` component that **infers suggested routes** based on the defined routes object.

## TypeScript Concepts Used

**1. Generics:** Used extensively in functions and classes, such as in the Link component and Router class, to create reusable and type-safe structures. 

**2. Type Inference:** Automatically inferring types based on the context, like in useParams and extractRouteMatch. TypeScript infers the return type without needing explicit type declarations.

**3. Conditional Types:** Types are conditionally computed based on other types, such as in RouteParams and RouteMatch.

**4. Mapped Types:** These are used to map over types, especially in defining complex types like SearchParams and RouteParams.

**5. Utility Types:** Types like `Record` and `Extract` are used to manipulate existing types for route configuration, enabling more granular type definitions.

**6. Intersection Types:** Combines multiple types for more complex route configurations, especially when merging route params and data types.

**7. Type Aliases:** Used to define complex types that are reused throughout the code. Examples: Route, RouterState, LinkProps.

**8. Type Constraints:** Generics are constrained using extends to ensure they adhere to a certain shape or structure. Example: TRoutes extends readonly Route<any, any, any>[]

**9. React Types:** TypeScript types for React components and hooks like React.FC, React.PropsWithoutRef, and React.AnchorHTMLAttributes are used to ensure components receive the correct props.

**10. Literal Types:** String literals used in type definitions, like the template literals in RouteParams<TPath>.

**11. Type Narrowing:** Using conditional types and utility functions to narrow down types based on conditions (e.g., narrowing route matches in findMatchingRoute).

**12. Readonly Arrays:** The readonly keyword ensures that the routes array in generics cannot be modified. Example: TRoutes extends readonly Route<any, any, any>[].

**13. Type Guards:** Type guards used to narrow down types based on specific conditions.

## Known Issues

- **Inference of Params and Search Params**: Currently, type inference applies to all routes, even those that don't have params, which will be addressed in future improvements.
