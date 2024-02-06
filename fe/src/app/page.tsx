"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log("1111", session);
  return <main>{session ? "Hello" : "Please login"}</main>;
}
