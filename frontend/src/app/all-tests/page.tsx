"use client";

import { getAllBloodTests, getBloodTestsTypes } from "@/app/helpers/blood-tests";
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

interface CategoryData {
  [key: string]: {
    data: { date: string; value: number }[];
    categoryId: string;
  };
}

const LabResult = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [testCategories, setTestsCategories] = useState<BloodTestsCategory[] | undefined>([]);
  const [areTestsCategoriesLoading, setAreTestsCategoriesLoading] = useState(false);
  const [allBloodTests, setAllBloodTests] = useState<AllBloodTests[]>([]);
  const [areAllBloodTestsLoading, setAreAllBloodTestsLoading] = useState(false);
  const [testCardInfo, setTestCardInfo] = useState<TestCardInfo[]>([]);
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
    if (!session || !allBloodTests.length || !testCategories || !testCategories.length) return;

    const categoryDataMapping: CategoryData = {};

    allBloodTests.forEach((bloodTestGroup) => {
      bloodTestGroup.items.forEach((item) => {
        if (!categoryDataMapping[item.categoryId]) {
          categoryDataMapping[item.categoryId] = {
            data: [],
            categoryId: item.categoryId,
          };
        }
        categoryDataMapping[item.categoryId].data.push({ date: item.date, value: item.value });
      });
    });

    const testCardInfos: any = testCategories
      .map((category) => {
        const categoryData = categoryDataMapping[category.id];
        if (!categoryData) return null; // Skip categories without data

        const sortedData = categoryData.data.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          return dateA - dateB;
        });

        return {
          name: category.name,
          description: category.description,
          unit: category.unit,
          lowerRange: category.lowerRange,
          upperRange: category.upperRange,
          data: sortedData,
        };
      })
      .filter((info) => info !== null);

    setTestCardInfo(testCardInfos);
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
        {testCardInfo &&
          testCardInfo.length > 0 &&
          testCardInfo.map((testInfo) => {
            return (
              <div key={testInfo.name} className="w-full my-6">
                <Card className="w-full p-4 border border-green-400 shadow-lg h-auto">
                  <CardContent className="flex">
                    <div className="w-1/2">
                      <div className="text-xl font-bold text-blue-950">{testInfo.name}</div>
                      <div className="w-full h-auto">
                        <LineChart data={testInfo.data} />
                      </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <div className="self-end text-xl font-bold text-blue-950">
                        Your latest result:
                        <span className="font-semibold">{` ${testInfo.data[testInfo.data.length - 1].value} ${testInfo.unit}`}</span>
                      </div>
                      <TestValuesLegend
                        lowerRange={testInfo.lowerRange}
                        upperRange={testInfo.upperRange}
                      />
                      <div className="ml-4 mt-12">
                        <div className="text-lg font-semibold">About this Test</div>
                        <div className="text-lg font-normal text-gray-500">
                          {testInfo.description}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default LabResult;
