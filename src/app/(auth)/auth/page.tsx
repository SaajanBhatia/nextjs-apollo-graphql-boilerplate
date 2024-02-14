'use client';

import LandingHeroSection from '@/components/landing';
import FullScreenLoading from '@/components/utils/Loading';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = () => {
    const { status } = useSession()

    if (status === 'authenticated') {
        redirect('/')
    }

    return (
        <>
            {status === 'loading' && <FullScreenLoading />}
            <LandingHeroSection />
        </>
    );
};

export default Page;