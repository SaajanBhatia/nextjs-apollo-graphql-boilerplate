'use client';

import SimpleCard from '@/components/auth/SignIn';
import FullScreenLoading from '@/components/utils/Loading';
import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const Page = () => {
    const router = useRouter()
    const { status } = useSession()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault()
        const result: SignInResponse | undefined = await signIn<'credentials'>('credentials', {
            username,
            password,
            redirect: false
        });

        if (!result || result?.error) {
            console.error('Sign In Failed');
        } else {
            () => router.push('/')
        }
    }

    return (
        <>
            {status == 'unauthenticated' && <SimpleCard
                username={username}
                password={password}
                handleSignIn={handleSignIn}
                updateUsername={setUsername}
                updatePassword={setPassword}
            />}
            {status == 'loading' && <FullScreenLoading />}
            {status == 'authenticated' && redirect('/')}
        </>
    );
};

export default Page;