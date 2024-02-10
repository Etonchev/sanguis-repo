"use client";

import { getBloodTestsTypes, getLabResultBloodTests } from "@/app/helpers/blood-tests";
import { deleteLabResult, fetchLabResult } from "@/app/helpers/lab-results";
import { BloodTestsCategory, LabResultBloodTests, LabResultItem } from "@/app/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader/Loader";

interface LabResultTestInfo {
  lowerRange: number;
  upperRange: number;
  unit: string;
  value: number;
  name: string;
}

const LabResult = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [labResult, setLabResult] = useState<LabResultItem | null>(null);
  const [isLabResultLoading, setIsLabResultLoading] = useState(false);
  const [testCategories, setTestsCategories] = useState<BloodTestsCategory[] | undefined>([]);
  const [areTestsCategoriesLoading, setAreTestsCategoriesLoading] = useState(false);
  const [labResultBloodTests, setLabResultBloodTests] = useState<LabResultBloodTests[] | undefined>(
    [],
  );
  const [areLabResultBloodTestsLoading, setAreLabResultBloodTestsLoading] = useState(false);
  const [labResultTestsInfo, setLabResultTestsInfo] = useState<LabResultTestInfo[]>([]);
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

  useEffect(() => {
    (async () => {
      if (!session) return;
      setAreTestsCategoriesLoading(true);

      const testsCategories = await getBloodTestsTypes(session.user.token);

      setTestsCategories(testsCategories);
      setAreTestsCategoriesLoading(false);
    })();
  }, [session, id]);

  useEffect(() => {
    (async () => {
      if (!session) return;
      setAreLabResultBloodTestsLoading(true);

      const labResultTests = await getLabResultBloodTests({ token: session.user.token, id });

      setLabResultBloodTests(labResultTests);
      setAreLabResultBloodTestsLoading(false);
    })();
  }, [session, id]);

  useEffect(() => {
    if (!session) return;

    if (
      !labResultBloodTests ||
      !testCategories ||
      !labResultBloodTests.length ||
      !testCategories.length
    )
      return;

    const labResultTestsInfo: any = labResultBloodTests
      .map((blootTest) => {
        const matchingItem = testCategories.find(
          (category) => blootTest.categoryId === category.id,
        );

        if (matchingItem) {
          return {
            lowerRange: matchingItem.lowerRange,
            upperRange: matchingItem.upperRange,
            value: blootTest.value,
            name: matchingItem.name,
            unit: matchingItem.unit,
          };
        }

        return [];
      })
      .filter(Boolean);

    if (labResultTestsInfo && labResultTestsInfo.length) {
      setLabResultTestsInfo(labResultTestsInfo);
    }
  }, [session, labResultBloodTests, testCategories]);

  const handleDeleteLabResult = async () => {
    if (!labResult || !session) return;

    await deleteLabResult({ id: labResult.id, token: session.user.token });

    router.push("/");
  };

  const handleRedirectToEditLabResultPage = () => {
    if (!labResult) return;

    router.push(`/edit-lab-result/${labResult.id}`);
  };

  if (
    (!session && status === "loading") ||
    isLabResultLoading ||
    areTestsCategoriesLoading ||
    areLabResultBloodTestsLoading
  ) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col items-center gap-16">
      <div className="text-4xl mt-24">Lab Result</div>
      {labResult && (
        <div className="w-2/3">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-2xl">{labResult.date}</div>
            <div className="text-xl text-gray-400">{labResult.laboratory}</div>
            <div className="text-sm text-gray-400">{labResult.physician || ""}</div>
            <div className="text-sm">{`Notes: ${
              labResult.note ? labResult.note : "No notes for this lab result."
            }`}</div>
          </div>
          <div className="flex justify-end gap-2 mt-24">
            <Button onClick={handleRedirectToEditLabResultPage} variant="outline">
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this lab result?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600" onClick={handleDeleteLabResult}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Table className="mt-6">
            <TableCaption>A list of your lab result tests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Test Type</TableHead>
                <TableHead className="w-24">Unit</TableHead>
                <TableHead>Your value</TableHead>
                <TableHead>Reference values</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labResultTestsInfo &&
                labResultTestsInfo.map((test) => (
                  <TableRow key={test.name}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>{test.unit}</TableCell>
                    <TableCell>{test.value}</TableCell>
                    <TableCell>{`${test.lowerRange} - ${test.upperRange}`}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
};

export default LabResult;
