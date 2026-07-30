import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import Resend from "next-auth/providers/resend"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.BETTER_AUTH_SECRET,
})