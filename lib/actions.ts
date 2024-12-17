"use server"


import * as z from "zod"
import { AuthError } from 'next-auth';
import { hash } from "bcryptjs"
import { db } from "./db";
import { LoginSchema, RegisterSchema } from './../schemas/index';
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "./mail";



export const login = async (values: z.infer<typeof LoginSchema>) => {
   const validatedFields = LoginSchema.safeParse(values);

   if (!validatedFields.success) {
      return { error: "Invalid fields!" }
   }
   const { email, password } = validatedFields.data
   const existingUser = await getUserByEmail(email);

   if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" }
   }

   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
         existingUser.email
      )

      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return { success: "Confirmation email sent!" }
   }


   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT
      })
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "Invalid credentials!" }
            default:
               return { error: "Something went wrong!" }
         }
      }
      throw error;
   }
}





export const register = async (values: z.infer<typeof RegisterSchema>) => {
   const validatedField = RegisterSchema.safeParse(values);

   if (!validatedField.success) {
      return { error: "Invalid fields!" }
   }

   const { email, password, name } = validatedField.data
   const hashedPassword = await hash(password, 10)

   const existingUser = await getUserByEmail(email)

   if (existingUser) {
      return { error: "Email already in use!" }
   }

   await db.user.create({
      data: {
         name,
         email,
         password: hashedPassword
      }
   })

   const verificationToken = await generateVerificationToken(email)

   await sendVerificationEmail(verificationToken.email, verificationToken.token)

   return { success: "Confirmation email sent!" }
}