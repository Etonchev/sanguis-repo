"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { emtpyFieldErrorMessage } from "../../utils/constants";
import { useSession } from "next-auth/react";
import { BloodTestsCategory, LabResultItem, LabTest } from "../../utils/types";
import { getBloodTestsTypes } from "../../helpers/blood-tests";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewLabResult, editLabResult, fetchLabResult } from "../../helpers/lab-results";
import Loader from "@/components/Loader/Loader";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function EditLabResult({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const { id } = params;
  const router = useRouter();
  const [bloodTestsTypes, setBloodTestsTypes] = useState<BloodTestsCategory[]>([]);
  const [bloodTestsNames, setBloodTestsNames] = useState<[string, ...string[]] | string[]>([""]);
  const [dynamicFields, setDynamicFields] = useState([{ testType: "", testValue: "" }]);
  const [labResult, setLabResult] = useState<LabResultItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLabResultLoading, setIsLabResultLoading] = useState(false);
  const [editLabResultError, setEditLabResultError] = useState(false);

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    (async () => {
      if (!session) return;
      setIsLoading(true);

      const bloodTestsTypes = await getBloodTestsTypes(session.user.token);
      const bloodTestsNames =
        bloodTestsTypes && bloodTestsTypes.map((test: BloodTestsCategory) => test.name);

      if (!bloodTestsTypes || !bloodTestsNames) {
        return;
      }

      setBloodTestsTypes(bloodTestsTypes);
      setBloodTestsNames(bloodTestsNames);
      setIsLoading(false);
    })();
  }, [session, id]);

  useEffect(() => {
    (async () => {
      if (!session) return;
      setIsLabResultLoading(true);

      const labResult = await fetchLabResult({ token: session.user.token, id });
      const testPairs =
        labResult &&
        labResult.tests.map((test: LabTest) => {
          const currentTest = bloodTestsTypes.find((t) => {
            return t.id === test.categoryId;
          });

          if (currentTest) {
            return { testType: currentTest.name, testValue: test.value.toString() };
          }
        });

      form.reset({
        date: labResult && labResult.date,
        laboratory: labResult && labResult.laboratory,
        physician: labResult && labResult.physician,
        note: labResult && labResult.note,
        testPairs,
      });

      setLabResult(labResult);
      setIsLabResultLoading(false);
    })();
  }, [session, id, bloodTestsTypes]);

  const formSchema = z
    .object({
      date: z.date({
        required_error: "A date of birth is required.",
      }),
      laboratory: z.string().min(1, { message: emtpyFieldErrorMessage }),
      physician: z.string().min(1, { message: emtpyFieldErrorMessage }),
      note: z.string().min(1, { message: emtpyFieldErrorMessage }),
      testPairs: z.array(
        z.object({
          testType: z.enum(bloodTestsNames as [string, ...string[]]),
          testValue: z.number({
            required_error: "This field is required.",
          }),
        }),
      ),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      laboratory: "",
      physician: "",
      note: "",
      testPairs: [{ testType: "", testValue: undefined }],
    },
  });

  const getTests = () => {
    const { testPairs } = form.getValues();
    const tests: LabTest[] = [];

    for (const pair of testPairs) {
      const category = bloodTestsTypes.find((test) => test.name === pair.testType);

      if (category) {
        tests.push({
          categoryId: category.id,
          value: Number(pair.testValue),
        });
      } else {
        console.warn(`Category not found for testType: ${pair.testType}`);
      }
    }

    return tests;
  };

  const handleSubmit = async () => {
    if (!session) return;

    const { date, laboratory, physician, note } = form.getValues();
    const tests = getTests();
    const labResultDate = format(date, "yyyy-MM-dd");
    setEditLabResultError(false);

    try {
      await editLabResult({
        labResultDate,
        laboratory,
        physician,
        note,
        tests,
        token: session.user.token,
        id,
      });

      router.push("/");
    } catch (e) {
      console.log(e);
      setEditLabResultError(true);
    }
  };

  if ((!session && status === "loading") || isLoading || isLabResultLoading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col items-center gap-16">
      <div className="text-4xl mt-24">Edit Lab Result</div>
      {!isLabResultLoading && !labResult && <div>There is no lab result with this id.</div>}
      <div className="flex flex-col items-center gap-16">
        <Form {...form}>
          <form
            className="max-w-md w-full flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="physician"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Physician</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Physician" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="laboratory"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Laboratory</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Laboratory" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex gap-2">
              <Button
                className="bg-slate-800 text-slate-50"
                onClick={(e) => {
                  e.preventDefault();
                  setDynamicFields([...dynamicFields, { testType: "", testValue: "" }]);
                }}
              >
                + Add Test
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setDynamicFields(dynamicFields.slice(0, dynamicFields.length - 1));
                }}
                disabled={dynamicFields.length === 1}
                variant="destructive"
              >
                Remove Last Test
              </Button>
            </div>
            {dynamicFields.map((field, index) => (
              <div key={index} className="flex gap-6">
                <FormField
                  control={form.control}
                  name={`testPairs[${index}].testType` as `testPairs.${number}.testType`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Blood Test Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-52">
                              <SelectValue placeholder="Select Blood Test" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Blood Test Type</SelectLabel>
                                {bloodTestsTypes.map((test) => (
                                  <SelectItem key={test.id} value={test.name}>
                                    {test.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`testPairs[${index}].testValue` as `testPairs.${number}.testValue`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Test Value</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Test Value"
                            type="number"
                            step="any"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            ))}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Note" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {editLabResultError && (
              <div className="text-sm text-red-600">Something went wrong, please try again.</div>
            )}
            <Button className="w-full bg-slate-800 text-slate-50">Edit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
