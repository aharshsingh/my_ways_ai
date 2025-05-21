"use Client"
import React from 'react'
import { PasswordResetDialog } from '../ui/password-reset-dialog';
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner";
import axios from "axios";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function LoginDrawer({ isOpen, setIsOpen }) {
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const[forgotPassword, setForgotPassword] = .(false); 
    const [errors, setErrors] = useState({
      email: false,
      password: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let newErrors = {
          email: email.trim() === "",
          password: password.trim() === "",
        };
        setErrors(newErrors);
        if (Object.values(newErrors).includes(true)) {
          return;
        }
        else{
          try {
            setIsLoading(true);
            // const response = await axios.post("https://intervu-ai-beige.vercel.app/api/auth/login", {
              const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password
            });
            const authToken = response.data.accessToken;
            const userId=response.data.userId;
            const userType=response.data.role;
            localStorage.setItem("userId",userId);
            localStorage.setItem("authToken", authToken);
            if (response.status === 200) 
              {
                setIsLoading(false);
                toast.success("Login Successfull!");
                setIsOpen(false);
                if(userType === "admin")
                {
                  router.push('/admin');
                }
                else if(userType === "user")
                {
                  router.push('/testCluster');
                }
              }
            else 
                {
                  toast.error("Login Failed");
                  setIsLoading(false);
                }
            }
         catch (error) {
            console.log("Error:", error);
            if(error.response)
            {
                if (error.response.status === 404) {
                  toast.error("User not found");
                } else if (error.response.status === 401) {
                    toast.error("Invalid password");
                 } else {
                    toast.error("Something went wrong");
                }
                return   setIsLoading(false);
            }
          }
        } 
       
        };
      
  return (
 <>
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-[#5862b2] font-bold">Login</DrawerTitle>
            <DrawerDescription>
              Please login to continue using the application.
            </DrawerDescription>
          </DrawerHeader>
          <form className="grid gap-4 p-2" >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input required id="email" type="email" autoComplete="username" placeholder="team@mynaui.com" value={email} className={`${errors.email ? "border-red-500" : ""} text-md `} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" type="password" placeholder="••••••••••" autoComplete="current-password" value={password} className={`${errors.password ? "border-red-500" : ""} text-md `} onChange={(e)=>setPassword(e.target.value)}  />
           
            <span className='text-sm cursor-pointer mt-2 font-semibold hover:underline' onClick={()=>setIsDialogOpen(true)}>Forgot Password ?</span>
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" className="bg-[#5862b2] hover:bg-[#5862b2]" onClick={handleSubmit}>
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Logging in <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
                </span>
              ) : (
                "Login"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

    {isDialogOpen && <PasswordResetDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />}
    </>
  );
}
