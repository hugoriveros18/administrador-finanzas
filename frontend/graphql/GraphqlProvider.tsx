'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

interface Props {
  children: React.ReactNode;
}

export default function GraphqlProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
