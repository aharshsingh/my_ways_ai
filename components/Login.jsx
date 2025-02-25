"use client"
import React from "react";
import { SignupForm } from "@/components/ui/signup-form";

export default function SignupFormDemo() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-200">
        <div className='w-[80%] h-[85vh] flex justify-center items-center'>
            <div className="h-full w-[50%] flex items-center justify-center">
              <SignupForm />
            </div>
            <div className="h-full border-2 w-[50%] bg-[#F4F4F4]">
            </div>
        </div>
    </div>
  );
}
