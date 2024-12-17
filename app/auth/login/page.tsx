import LoginForm from "@/components/auth/login-form"
import { Suspense } from "react"


function LoginPage() {
   return (
      <div>
         <Suspense>
            <LoginForm />
         </Suspense>
      </div>
   )
}

export default LoginPage