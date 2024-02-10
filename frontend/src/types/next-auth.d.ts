import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      token: string;
    };
  }
}
