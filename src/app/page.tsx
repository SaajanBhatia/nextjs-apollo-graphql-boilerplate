'use client';

import { BooksDocument, BooksQuery, BooksQueryVariables } from "@/graphql/__generated__/types";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

export default function Home() {
  const { data, loading } = useQuery<BooksQuery, BooksQueryVariables>(BooksDocument)
  return (
    <>
      <h1>welcome</h1>
    </>
  );
}
