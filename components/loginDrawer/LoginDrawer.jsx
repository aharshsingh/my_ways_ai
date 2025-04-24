"use Client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner";
import axios from "axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Link from 'next/link';
import { useAuth } from '@/context/authContext';

export default function LoginDrawer({ isOpen, setIsOpen }) {
  const router = useRouter();
  // const { login }= useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            const response = await axios.post("https://intervu-ai-beige.vercel.app/api/auth/login", {
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
                }
            }
         catch (error) {
            console.log("Error:", error);
            if(error.response)
            {
                // console.log("Error status:", error.response);
                if (error.response.status === 404) {
                  toast.error("User not found");
                } else if (error.response.status === 401) {
                    toast.error("Invalid password");
                 } else {
                    toast.error("Something went wrong");
                }
            }
          }
        }
       
        };
        // console.log("Form submitted");
      
  return (
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Login</DrawerTitle>
            <DrawerDescription>
              Please login again to continue using the application.
            </DrawerDescription>
          </DrawerHeader>
          <form className="grid gap-4 p-4" >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input required id="email" type="email" autoComplete="username" placeholder="team@mynaui.com" value={email} className={errors.email ? "border-red-500" : ""} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input required id="password" type="password" placeholder="••••••••••" autoComplete="current-password" value={password} className={errors.password ? "border-red-500" : ""} onChange={(e)=>setPassword(e.target.value)}  />
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" onClick={handleSubmit}>Login</Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
