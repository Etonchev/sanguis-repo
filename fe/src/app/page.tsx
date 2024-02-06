"use client";

import NavBar from "@/components/NavBar/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session);

  if (!session && status !== "loading") {
    router.push("/login");
  }

  return (
    <main>
      <NavBar />
    </main>
  );
}
