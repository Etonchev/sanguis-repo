"use client";

import { getAllBloodTests, getBloodTestsTypes } from "@/app/helpers/blood-tests";
import { deleteLabResult, fetchLabResult } from "@/app/helpers/lab-results";
import { AllBloodTests, BloodTestsCategory, LabResultBloodTests } from "@/app/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/Loader/Loader";
import _ from "lodash";
import TestValuesLegend from "@/components/TestValuesLegend/TestValuesLegend";
import LineChart from "@/components/LineChart/LineChart";

export type Data = {
  [date: string]: number;
};
interface TestCardInfo {
  data: Data[];
  description: string;
  name: string;
  upperRange: number;
  lowerRange: number;
  unit: string;
}

const LabResult = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [testCategories, setTestsCategories] = useState<BloodTestsCategory[] | undefined>([]);
  const [areTestsCategoriesLoading, setAreTestsCategoriesLoading] = useState(false);
  const [allBloodTests, setAllBloodTests] = useState<AllBloodTests[]>([]);
  const [areAllBloodTestsLoading, setAreAllBloodTestsLoading] = useState(false);
  const [testCardInfo, setTestCardInfo] = useState<TestCardInfo | null>(null);
  const { id } = params;

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status]);

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
      setAreAllBloodTestsLoading(true);

      const allBloodTests = await getAllBloodTests(session.user.token);

      if (allBloodTests) {
        setAllBloodTests(allBloodTests);
      }
      setAreAllBloodTestsLoading(false);
    })();
  }, [session, id]);

  useEffect(() => {
    if (!session) return;

    if (!allBloodTests || !testCategories || !allBloodTests.length || !testCategories.length)
      return;

    let testCardInfo: TestCardInfo | null = null;

    allBloodTests.forEach((bloodTest) => {
      const categoryId = bloodTest.items[0].categoryId;

      const matchingItem = testCategories.find((item) => item.id === categoryId);

      if (matchingItem) {
        const newObj = {
          lowerRange: matchingItem.lowerRange,
          upperRange: matchingItem.upperRange,
          name: matchingItem.name,
          description: matchingItem.description,
          unit: matchingItem.unit,
          data: [],
        } as TestCardInfo;

        bloodTest.items.forEach((test) => {
          newObj.data.push({ [test.date]: test.value });
        });

        newObj.data.sort((a, b) => {
          const dateA = Object.keys(a)[0];
          const dateB = Object.keys(b)[0];
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });

        testCardInfo = newObj;

        setTestCardInfo(testCardInfo);
      }
    });
  }, [session, testCategories, allBloodTests]);

  if ((!session && status === "loading") || areAllBloodTestsLoading || areTestsCategoriesLoading) {
    return <Loader />;
  }

  if (_.isEmpty(testCardInfo)) {
    return <div>No Tests added.</div>;
  }

  return (
    <main className="flex flex-col items-center gap-16">
      <div className="text-4xl mt-24">My Tests</div>
      <div className="w-[80%]">
        <div key={testCardInfo.name} className="w-full my-6">
          <Card className="w-full p-4 border border-green-400 shadow-lg h-auto">
            <CardContent className="flex">
              <div className="w-1/2">
                <div className="text-xl font-bold text-blue-950">{testCardInfo.name}</div>
                <div className="text-lg font-normal text-gray-500">{testCardInfo.description}</div>
                <div className="w-full h-auto mt-8">
                  <LineChart data={testCardInfo.data}/>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <div className="self-end text-xl font-bold text-blue-950">
                  Your latest result:
                  <span className="text-green-600 font-semibold">{` ${
                    Object.values(testCardInfo.data[0])[0]
                  } ${testCardInfo.unit}`}</span>
                </div>
                <TestValuesLegend
                  lowerRange={testCardInfo.lowerRange}
                  upperRange={testCardInfo.upperRange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default LabResult;
