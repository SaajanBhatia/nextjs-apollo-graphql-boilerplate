"use client";

import FullScreenLoading from "@/components/utils/Loading";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AdminBooking from "@/components/booking/index";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/auth");
    },
  });

  if (status == "loading") {
    return <FullScreenLoading />;
  }

  return (
    <>
      <AdminBooking />
    </>
  );
}
