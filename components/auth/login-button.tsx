"use client"

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
   children: React.ReactNode,
   mode?: "modal" | "redirect",
   // asChild?: boolean;
}


function LoginButton({ children, mode = "redirect" }: LoginButtonProps) {
   const router = useRouter()

   const onClick = () => {
      router.push("/auth/login")
      console.log("LOGIN BUTTON CLICK");
   }

   if (mode === "modal") {
      return (
         <span>
            TODO: Implement modal !
         </span>
      )
   }

   return (
      <span onClick={onClick} className='cursor-painter'>
         {children}
      </span>
   )
}

export default LoginButton