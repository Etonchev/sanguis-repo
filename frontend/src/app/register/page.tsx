"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { handleUserRegister } from "../helpers/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { emtpyFieldErrorMessage } from "../utils/constants";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect } from "react";

const formSchema = z
  .object({
    emailAddress: z.string().email().min(1, { message: emtpyFieldErrorMessage }),
    password: z.string().min(3).min(1, { message: emtpyFieldErrorMessage }),
    firstName: z.string().min(1, { message: emtpyFieldErrorMessage }),
    lastName: z.string().min(1, { message: emtpyFieldErrorMessage }),
    birthDate: z.date({
      required_error: "A date of birth is required.",
    }),
  })
  .required();

export default function Register() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      firstName: "",
      lastName: "",
      birthDate: undefined,
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, status]);

  const handleSubmit = async () => {
    const { emailAddress, password, firstName, lastName, birthDate } = form.getValues();
    const userBirthDate = format(birthDate, "yyyy-MM-dd");

    const user = await handleUserRegister({
      email: emailAddress,
      password,
      firstName,
      lastName,
      birthDate: userBirthDate,
    });

    if (user) {
      router.push("/login");

      toast({
        title: "You registered successfully.",
      });
    }
  };

  return (
    <main className="flex flex-col items-center gap-16 p-24">
      <div className="text-4xl">Register</div>
      <Form {...form}>
        <form
          className="max-w-md w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email address" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="First Name" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Last Name" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
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
          <Button className="w-full bg-slate-800 text-slate-50">Register</Button>
          <div className="flex gap-2">
            <div className="text-sm">Already have an account?</div>
            <Link className="text-sm text-blue-500" href="/login">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </main>
  );
}
