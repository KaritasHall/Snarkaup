"use client";

import { ApolloProvider } from "@apollo/client";
import { DatoClient } from "./dato/apollo-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// This is a wrapper component that provides the React Query client to its children
// and the Apollo Client to its children's children.
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={DatoClient}>{children}</ApolloProvider>
    </QueryClientProvider>
  );
};
