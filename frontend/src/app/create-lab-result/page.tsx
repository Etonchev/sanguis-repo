"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { emtpyFieldErrorMessage } from "../utils/constants";
import { useSession } from "next-auth/react";
import { BloodTestsCategory, LabTest } from "../utils/types";
import { getBloodTestsTypes } from "../helpers/blood-tests";
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
import { addNewLabResult } from "../helpers/lab-results";
import Loader from "@/components/Loader/Loader";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CreateLabResult() {
  const { data: session, status } = useSession();
  const [bloodTestsTypes, setBloodTestsTypes] = useState<BloodTestsCategory[]>([]);
  const [dynamicFields, setDynamicFields] = useState([{ testType: "", testValue: "" }]);
  const [selectTestTypes, setSelectTestTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addNewLabResultError, setAddNewLabResultError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }

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
      setIsLoading(false);
    })();
  }, [session]);

  const formSchema = z
    .object({
      date: z.date({
        required_error: "A date of birth is required.",
      }),
      laboratory: z.string().min(1, { message: emtpyFieldErrorMessage }),
      physician: z.string(),
      note: z.string(),
      testPairs: z.array(
        z.object({
          testType: z.string({
            required_error: "Please select a value, or remove the test.",
          }),
          testValue: z.number({
            required_error: "Please select a value, or remove the test.",
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
      testPairs: [{ testType: undefined, testValue: undefined }],
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
    setAddNewLabResultError(false);

    try {
      await addNewLabResult({
        date: labResultDate,
        laboratory,
        physician,
        note,
        tests,
        token: session.user.token,
      });

      router.push("/");
    } catch (e) {
      console.log(e);
      setAddNewLabResultError(true);
    }
  };

  if ((!session && status === "loading") || isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col items-center gap-16">
      <div className="flex gap-64 w-1/2">
        <div className="flex flex-col items-center gap-16 w-[90%]">
          <div className="text-4xl mt-24">Create New Lab Result</div>
          <Form {...form}>
            <form
              className="max-w-md w-full flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
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
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectTestTypes([...selectTestTypes, value]);
                              }}
                            >
                              <SelectTrigger className="w-52">
                                <SelectValue placeholder="Select Blood Test" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Select Blood Test Type</SelectLabel>
                                  {bloodTestsTypes.map((test) => (
                                    <SelectItem
                                      disabled={selectTestTypes.includes(test.name)}
                                      key={test.id}
                                      value={test.name}
                                    >
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
              {addNewLabResultError && (
                <div className="text-sm text-red-600">Something went wrong, please try again.</div>
              )}
              <Button className="w-full bg-slate-800 text-slate-50">Create</Button>
            </form>
          </Form>
        </div>
        <div className="w-full">
          <div className="text-4xl mt-24 text-center mb-12">Test Types Info</div>
          <Accordion type="single" collapsible>
            {bloodTestsTypes &&
              bloodTestsTypes.length &&
              bloodTestsTypes.map((testType) => (
                <AccordionItem key={testType.id} value="item-1">
                  <AccordionTrigger>{testType.name}</AccordionTrigger>
                  <AccordionContent>{testType.description}</AccordionContent>
                  <AccordionContent>{testType.aliases}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
}
