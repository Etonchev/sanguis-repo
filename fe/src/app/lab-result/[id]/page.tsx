"use client";

import { fetchLabResult } from "@/app/helpers/lab-results";
import { LabResultItem } from "@/app/utils/types";
import NavBar from "@/components/NavBar/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LabResult = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [labResult, setLabResult] = useState<LabResultItem | null>(null);
  const [isLabResultLoading, setIsLabResultLoading] = useState(false);
  const { id } = params;

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status]);

  useEffect(() => {
    (async () => {
      if (!session) return;
      setIsLabResultLoading(true);

      const labResult = await fetchLabResult({ token: session.user.token, id });

      setLabResult(labResult);
      setIsLabResultLoading(false);
    })();
  }, [session, id]);

  return (
    <main>
      <NavBar />
      {isLabResultLoading && <div>Loading...</div>}
      <div>Lab Result</div>
    </main>
  );
};

export default LabResult;
