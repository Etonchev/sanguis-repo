import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleUserLogin } from "../helpers/auth";
import { mockUsers } from "./mocks";
import { User } from "./types";

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

        const { email, password } = credentials;

        const response = await handleUserLogin({ email, password });

        // TODO: Delete this mock when there is a real data and return the response.user instead of the authenticatedUser
        const authenticatedUser = mockUsers.find(user => user.email === email && user.password === password);

        if (response && response.user && authenticatedUser) {
          // return { ...response.user, token: response.token };
          return { ...authenticatedUser, token: response.token };
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
