import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserDetail from "./pages/UserDetail";
import UserList from "./pages/UserList";

export const routes = [
  {
    path: "/",
    component: Home,
    searchParams: undefined,
  },
  {
    path: "/about",
    component: About,
    searchParams: undefined,
  },
  {
    path: "/users",
    component: UserList,
    searchParams: { sort: "asc" },
    loader: async ({
      searchParams,
    }: {
      searchParams?: { sort?: "asc" | "desc" };
    }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users?sort=${
          searchParams?.sort ?? ""
        }`
      );
      const users = await response.json();
      return users;
    },
  },
  {
    path: "/users/:id",
    component: UserDetail,
    searchParams: undefined,
    loader: async ({ id }: { id: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
      );
      const user = await response.json();
      return user;
    },
  },
  {
    path: "*",
    component: NotFound,
    searchParams: undefined,
  },
] as const;
