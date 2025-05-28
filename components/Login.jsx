"use client"
import React from "react";
import { SignupForm } from "@/components/ui/signup-form";
export default function SignupFormDemo() {
  return (

    <div className="flex items-center justify-center h-screen w-full bg-gray-200">
        <div className='w-[80%] h-[85%] flex justify-center items-center'>
            <div className="h-full w-[50%] bg-white overflow-hidden">
            <div className="w-full h-full  mx-auto ">
            <video 
                autoPlay 
                muted 
                className="w-full h-full"
              >
                <source src="/intervusignup.mp4" type="video/mp4" />
              </video>
            </div>
            </div>
            <div className="h-full w-[50%] flex items-center justify-center">
              <SignupForm />
            </div>
        </div>
    </div>
  );
}
