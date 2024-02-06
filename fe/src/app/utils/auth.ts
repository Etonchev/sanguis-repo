import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleUserLogin } from "../helpers/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return;
        const { email, password } = credentials;

        const response = await handleUserLogin({ email, password });

        if (!response) return;

        if (response.user) {
          return { ...response.user, token: response.token };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;
