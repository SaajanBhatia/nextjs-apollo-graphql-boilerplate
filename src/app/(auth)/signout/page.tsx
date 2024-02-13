'use client';

/**
 * Sign out handler
 */

import React from 'react';

import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import FullScreenLoading from '@/components/utils/Loading';


const SignoutPage = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        }
    });

    const handleLogout = async () => {
        await signOut({ redirect: false });
    };

    if (status === 'loading')
        return <FullScreenLoading />;

    if (status === 'authenticated') return handleLogout();
};

export default SignoutPage;
