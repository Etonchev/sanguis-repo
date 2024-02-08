"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { handleUserRegister } from "../helpers/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { emtpyFieldErrorMessage } from "../utils/constants";

const formSchema = z
  .object({
    emailAddress: z.string().email().min(1, { message: emtpyFieldErrorMessage }),
    password: z.string().min(3).min(1, { message: emtpyFieldErrorMessage }),
    firstName: z.string().min(1, { message: emtpyFieldErrorMessage }),
    lastName: z.string().min(1, { message: emtpyFieldErrorMessage }),
    birthDate: z.string().min(1, { message: emtpyFieldErrorMessage }),
  })
  .required();

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "asdasd",
      password: "asdasd",
      firstName: "ada",
      lastName: "",
      birthDate: "a",
    },
  });

  const handleSubmit = async () => {
    const { emailAddress, password, firstName, lastName, birthDate } = form.getValues();

    const user = await handleUserRegister({
      email: emailAddress,
      password,
      firstName,
      lastName,
      birthDate,
    });

    if (user) {
      router.push("/login");

      toast({
        title: "You registered successfully.",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24">
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
                    <Input {...field} placeholder="Birth Date" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="w-full">Register</Button>
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
