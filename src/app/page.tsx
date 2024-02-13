'use client';

import FullScreenLoading from "@/components/utils/Loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect('/auth')
    },
  })

  if (status == 'loading') {
    return <FullScreenLoading />
  }

  return (
    <>
      <h1>This is America</h1>
    </>
  )
}
