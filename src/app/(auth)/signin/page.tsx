'use client';

import { useAlertToast } from '@/app/hooks/useAlertToast';
import SimpleCard from '@/components/auth/SignIn';
import FullScreenLoading from '@/components/utils/Loading';
import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const Page = () => {
    const router = useRouter()
    const { status, data: session } = useSession()

    // Username is email and password is LUXID
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { successToast, errorToast, toast } = useAlertToast()

    const handleSignIn = async (e: FormEvent) => {

        e.preventDefault()
        const result: SignInResponse | undefined = await signIn<'credentials'>('credentials', {
            username,
            password,
            redirect: false
        });

        if (!result || result?.error) {
            console.error('Sign In Failed');
            toast.closeAll()
            errorToast({
                title: "Login error!",
                description: "Check you have typed your email and Lux ID Correctly"
            })
        } else {
            () => router.push('/')
            toast.closeAll()
            successToast({
                title: `Welcome back`,
                description: "Login successful!"
            })
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