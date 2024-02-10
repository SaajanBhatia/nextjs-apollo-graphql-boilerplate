import { PropsWithChildren } from 'react';

import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { NextSSRInMemoryCache, ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/graphql`
})

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new NextSSRInMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )
};
