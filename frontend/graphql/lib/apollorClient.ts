import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  fetchOptions: { cache: "no-store" },
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const cookieStore = cookies();
  let token = await cookieStore.get("auth-token")?.value;

  return {
    headers: {
      ...headers,
      cookie: `auth-token=${token}`,
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
