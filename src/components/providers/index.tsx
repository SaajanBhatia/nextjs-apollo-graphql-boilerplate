'use client';

import { FC, ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js';
import { SessionProvider } from 'next-auth/react';

import { ApolloWrapper } from '@/lib/apollo/client';

interface LayoutProps {
    children: ReactNode
}

export const Providers: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <SessionProvider>
                <ApolloWrapper>
                    <CacheProvider>
                        <ChakraProvider>
                            {children}
                        </ChakraProvider>
                    </CacheProvider>
                </ApolloWrapper>
            </SessionProvider>
        </>
    )
}