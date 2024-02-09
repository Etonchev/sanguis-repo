"use client";

import LabResults from "@/components/LabResults/LabResults";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status]);

  return (
    <main className="flex flex-col gap-24 items-center">
      {status === "loading" && <LoadingSkeleton />}
      {session && session.user && (
        <div className="w-2/3 h-auto">
          <div className="flex flex-col gap-4">
            <div className="text-4xl self-center">{`Welcome, ${session?.user.firstName}`}</div>
            <div className="text-2xl self-center underline underline-offset-4">
              Your Lab Results
            </div>
          </div>
          <Button onClick={() => router.push("/create-lab-result")} className="mt-52 mb-4">
            + ADD NEW
          </Button>
          <LabResults />
        </div>
      )}
    </main>
  );
}
