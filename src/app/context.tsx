"use client";

import { ApolloProvider } from "@apollo/client";
import { DatoClient } from "./dato/apollo-client";

export const Context = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={DatoClient}>{children}</ApolloProvider>;
};
