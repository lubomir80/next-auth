import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
   DEFAULT_LOGIN_REDIRECT,
   apiAuthPrefix,
   publicRoutes,
   authRoutes,
} from "@/routes"


const { auth } = NextAuth(authConfig)


export default auth((req) => {
   const { nextUrl } = req
   const isLoggedIn = !!req.auth

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
   const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
   const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

   if (isApiAuthRoute) {
      return
   }

   if (isAuthRoutes) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return
   }

   if (!isLoggedIn && !isPublicRoutes) {
      return Response.redirect(new URL("/auth/login", nextUrl))
   }
   return
})


export const config = {
   matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
   ],
}