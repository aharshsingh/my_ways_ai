import React from 'react'
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { toast } from "sonner";
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

export default function LoginDrawer({ isOpen, setIsOpen }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
      email: false,
      password: false,
    });

    const handleSubmit = (e) => {
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
          toast.success("Login Successfull!");
          setIsOpen(false);
          const formData = {email, password };
          console.log(formData);
        }
        console.log("Form submitted");
    
      };
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
