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
            <div className="h-full w-[50%] bg-[#F4F4F4] overflow-hidden">
            <div className="w-full max-w-lg mx-auto ">
            <video 
                autoPlay 
                loop 
                muted 
                className="w-full max-w-lg"
              >
                <source src="/Signup.mp4" type="video/mp4" />
              </video>
            </div>
            </div>
        </div>
    </div>
  );
}
