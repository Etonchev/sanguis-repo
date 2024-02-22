import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleUserLogin } from "../helpers/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const response = await handleUserLogin({ email, password });

        if (response && response.user) {
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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: "sanguis",
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;
