'use client';

import { FC, ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';

import { ApolloWrapper } from '@/lib/apollo/client';

interface LayoutProps {
    children: ReactNode
}

export const Providers: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <ApolloWrapper>
                {children}
            </ApolloWrapper>
        </>
    )
}