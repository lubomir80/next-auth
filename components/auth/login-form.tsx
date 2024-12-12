"use client"

import * as z from "zod"
import CardWrapper from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { useState, useTransition } from "react"
import { login } from "@/lib/actions"

function LoginForm() {
   const [error, setError] = useState<string | undefined>("")
   const [success, setSuccess] = useState<string | undefined>("")
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: ""
      }
   })

   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("")


      startTransition(() => {
         login(values).then((data) => {
            setError(data.error);
            setSuccess(data.success)
         })
      })
   }


   return (
      <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Don't have an account"
         backButtonHref="/auth/register"
         showSocial>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Your email</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={isPending}
                                 placeholder="test@gmail.com"
                                 {...field}
                                 type="email" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Your password</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={isPending}
                                 placeholder="******"
                                 {...field}
                                 type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button type="submit" className="w-full" disabled={isPending}>
                  Login
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}

export default LoginForm