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

function LoginForm() {
   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: ""
      }
   })

   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      console.log(values);
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
                                 placeholder="******"
                                 {...field}
                                 type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message="" />
               <FormSuccess message="" />
               <Button type="submit" className="w-full">
                  Login
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}

export default LoginForm