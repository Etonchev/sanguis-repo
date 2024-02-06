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
import { signIn } from "next-auth/react";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(3),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    const { emailAddress, password } = form.getValues();

    await signIn("credentials", {
      email: emailAddress,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24">
      <div className="text-4xl">Login</div>
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
          <Button className="w-full">Login</Button>
          <div className="flex gap-2">
            <div className="text-sm">You don't have an account?</div>
            <Link className="text-sm text-blue-500" href="/register">
              Register
            </Link>
          </div>
        </form>
      </Form>
    </main>
  );
}
