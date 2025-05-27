"use client";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import LoaderOne from "@/components/ui/loader-one";
const RouteAuthCheck = ({children}) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const token= localStorage.getItem("authToken");
            if(!token){
                 toast.error("You are not Logged in. Please login to continue.");
                setTimeout(()=>{
                router.replace("/login");
                },2000);
                return;
            }
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; 
                if (decodedToken.exp < currentTime) {
                    toast.error("Session expired. Please log in again.");
                    localStorage.clear();
                    setTimeout(() => {  
                      router.replace("/login");
                    }, 2000);
                } else {
                    setIsAuthenticated(true);
                    setLoading(false);
                }
            } catch (error){
              localStorage.clear();
              toast.error("Invalid token. Please log in again.");
              setTimeout(() => {
              router.replace("/login");
              }, 2000);
            }

        },[])
       if (loading) {
        return (
          <>
            <Toaster richColors position="top-center" />
            <div className="flex items-center justify-center h-screen  pointer-events-none ">
            <LoaderOne />;
            </div>
          </>
        );
      }

        if(!isAuthenticated){
             return <Toaster richColors position="top-center" />;
        }
        else{
        return (
        <>
        <Toaster richColors position="top-center" />
        {children}
        </>
     );
    };


}

export default RouteAuthCheck;