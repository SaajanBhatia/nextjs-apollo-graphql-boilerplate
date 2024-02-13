'use client';

import SimpleCard from '@/components/auth/SignIn';
import React, { useState } from 'react';

const Page = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSignIn = async () => {

    }
    return (
        <>
            <SimpleCard />
        </>
    );
};

export default Page;