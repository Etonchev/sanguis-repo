"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import { emtpyFieldErrorMessage } from "../utils/constants";
import { useSession } from "next-auth/react";
import { BloodTestsCategory } from "../utils/types";
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

export default function CreateLabResult() {
  const { data: session, status } = useSession();
  const [bloodTestsTypes, setBloodTestsTypes] = useState<BloodTestsCategory[]>([]);
  const [bloodTestsNames, setBloodTestsNames] = useState<[string, ...string[]]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!session && status !== "loading") {
    router.push("/login");
  }

  useEffect(() => {
    (async () => {
      if (!session || !session.user) return;
      setIsLoading(true);
      const bloodTestsTypes = await getBloodTestsTypes(session.user.token);
      const bloodTestsNames = bloodTestsTypes.map((test: BloodTestsCategory) => test.name);

      setBloodTestsTypes(bloodTestsTypes);
      setBloodTestsNames(bloodTestsNames);
      setIsLoading(false);
    })();
  }, []);

  const formSchema = z
    .object({
      date: z.string().min(1, { message: emtpyFieldErrorMessage }),
      laboratory: z.string().min(1, { message: emtpyFieldErrorMessage }),
      physician: z.string().min(1, { message: emtpyFieldErrorMessage }),
      note: z.string().min(1, { message: emtpyFieldErrorMessage }),
      testType: z.enum(bloodTestsNames),
      testValue: z.string().min(1, { message: emtpyFieldErrorMessage }),
    })
    .required();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      laboratory: "",
      physician: "",
      note: "",
      testType: "",
      testValue: "",
    },
  });

  const handleSubmit = async () => {
    // const { date, laboratory, physician, note, testType, testValue } = form.getValues();
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-16">
      <NavBar />
      <div className="text-4xl mt-24">Create New Lab Result</div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex min-h-screen flex-col items-center gap-16">
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
                        <Input {...field} placeholder="Date" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="testType"
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
                                {bloodTestsTypes.map((test) => {
                                  return (
                                    <SelectItem key={test.id} value={test.name}>
                                      {test.name}
                                    </SelectItem>
                                  );
                                })}
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
                  name="testValue"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Test Value</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Test Value" type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
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
              <Button className="w-full">Create</Button>
            </form>
          </Form>
        </div>
      )}
    </main>
  );
}
