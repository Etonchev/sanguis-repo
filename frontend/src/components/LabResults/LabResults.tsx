import { useEffect, useState } from "react";
import LabResultCard from "./LabResultCard/LabResultCard";
import { fetchLabResults } from "@/app/helpers/lab-results";
import { useSession } from "next-auth/react";
import { LabResultItem, LabResultsType } from "@/app/utils/types";
import { Skeleton } from "../ui/skeleton";

const LabResults = () => {
  const { data: session, status } = useSession();
  const [labResults, setLabResults] = useState<LabResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!session || !session.user) return;
      setIsLoading(true);
      const labResults = await fetchLabResults(session.user.token);

      if (labResults && labResults.length > 0) {
        setLabResults(labResults[0].items);
      }

      setIsLoading(false);
    })();
  }, [session]);

  return (
    <main className="flex flex-wrap gap-8 w-full h-auto">
      {isLoading && (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-md drop-shadow-md w-1/5">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      )}
      {labResults.length > 0 &&
        labResults.map((labResult: LabResultItem) => {
          return <LabResultCard key={labResult.id} labResult={labResult} />;
        })}
      {!labResults ||
        (labResults.length < 0 && !isLoading && (
          <div className="text-2xl m-auto">You don't have lab results recorded.</div>
        ))}
    </main>
  );
};

export default LabResults;
