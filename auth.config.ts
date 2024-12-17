import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { compare } from 'bcryptjs';
import { getUserByEmail } from "./data/user";
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"


export default {
   providers: [
      Github({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET
      }),
      Credentials({
         async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
               const { email, password } = validatedFields.data

               const user = await getUserByEmail(email)
               if (!user || !user.password) return null

               const passwordMatch = await compare(
                  password,
                  user.password
               )

               if (passwordMatch) return user;
            }
            return null
         },
      }),
   ],
} satisfies NextAuthConfig




