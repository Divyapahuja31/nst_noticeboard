import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null;
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  }),
  Google,
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const  { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers,
  secret: process.env.AUTH_SECRET || process.env.BETTER_AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});
