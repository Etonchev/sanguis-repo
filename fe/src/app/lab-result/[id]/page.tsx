"use client";

import { getBloodTestsTypes, getLabResultBloodTests } from "@/app/helpers/blood-tests";
import { deleteLabResult, fetchLabResult } from "@/app/helpers/lab-results";
import { BloodTestsCategory, LabResultBloodTests, LabResultItem } from "@/app/utils/types";
import NavBar from "@/components/NavBar/NavBar";
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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const handleDeleteLabResult = async () => {
    if (!labResult || !session) return;

    await deleteLabResult({ id: labResult.id, token: session.user.token });

    router.push("/");
  };

  const handleRedirectToEditLabResultPage = () => {
    if (!labResult) return;

    router.push(`/edit-lab-result/${labResult.id}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-16">
      <NavBar />
      {isLabResultLoading ||
        areTestsCategoriesLoading ||
        (areLabResultBloodTestsLoading && <div>Loading...</div>)}
      <div className="text-4xl mt-24">Lab Result</div>
      {labResult && (
        <div className="w-2/3">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-2xl">{labResult.physician}</div>
            <div className="text-xl text-gray-400">{labResult.laboratory}</div>
            <div className="text-sm text-gray-400">{labResult.date}</div>
            <div className="text-sm">{`Notes: ${labResult.note}`}</div>
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
                  <AlertDialogAction onClick={handleDeleteLabResult}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          {labResultBloodTests &&
            labResultBloodTests.map((test) => {
              const testType =
                testCategories && testCategories.find((t) => t.id === test.categoryId);

              return (
                <div key={test.categoryId} className="w-full my-6">
                  <Card className="w-full p-4 shadow-lg">
                    <CardContent className="flex">
                      <div className="w-1/2">
                        <div className="text-xl font-bold text-blue-950">
                          {testType?.name || ""}
                        </div>
                        <div className="text-lg font-normal text-gray-500">
                          {testType?.description || ""}
                        </div>
                        <div className="w-full h-72 border border-red-500 mt-8"></div>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <div className="self-end text-xl font-bold text-blue-950">
                          Your result:
                          <span className="text-green-600 font-semibold">{` ${test.value} ${
                            testType?.unit || ""
                          }`}</span>
                        </div>
                        <div className="text-lg text-gray-500 mt-20 self-center">{`Date: ${test.date}`}</div>
                        <div className="text-lg text-gray-500 self-center">{`Notes: ${test.note}`}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      )}
    </main>
  );
};

export default LabResult;
