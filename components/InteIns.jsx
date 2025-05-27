"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from 'axios';
import { MessageLoading } from "@/components/ui/message-loading";
import RouteAuthCheck from '@/lib/routeAuthCheck';
export default function InteIns() {
  const[isLoading,setIsLoading]=useState(false);
    const router = useRouter();
    const handelClick=async()=>{
      setIsLoading(true);
      const testId=localStorage.getItem('testId');
      try {
        const res= await axios.get(`http://localhost:3000/api/test/${testId}`)
        if(res.status===200){
          // console.log(res.data);
          localStorage.setItem('test', JSON.stringify(res.data));
          router.push(`/test`); 
          setIsLoading(false);
        }
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
       toast.error("Failed to fetch test details. Please try again.");
      }
    }
  return (
    <RouteAuthCheck userRole="user">
    <div className="flex flex-col items-center text-[#09090c] py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 mt-5 text-[#5862b2]">Interview Instructions</h1>
    <p className='text-[#09090c] text-lg'>Your are in a proctered test enviorment. If caught in any suspicious behaviour, you will be marked <span className='text-red-500'>FAIL!</span></p>
      
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
       
        <div className="text-center bg-[#9ea5dc] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct1.5b43960d.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 1"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className=" text-md text-white">Do not look off screen & maintain eye contact with the camera.</p>
        </div>

        {/* Instruction 2 */}
        <div className="text-center bg-[#9ea5dc] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct2.724dba41.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 2"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-md">Avoid unusual extended pauses & responds to questions promptly</p>
        </div>

      
        <div className="text-center bg-[#9ea5dc] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct3.29af2c81.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 3"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-md">Ensure you are the only person visible in the camera frame during the interview.</p>
        </div>

 
        <div className="text-center bg-[#9ea5dc] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct4.50439e66.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 4"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-md">Do not switch between tabs in your web browser.</p>
        </div>

        {/* Instruction 5 */}
        <div className="text-center bg-[#9ea5dc] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct5.02e436bc.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 5"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-md">Minimizing the screen will lead to you being kicked out.</p>
        </div>

       
      </div>
      <p className=' mt-7 text-green-500 text-lg'>Stay focused and do your best!.</p>
   
      <button  disabled={isLoading}  onClick={handelClick} className={`mt-3 p-3 w-[15%]  bg-[#5762b2] text-white items-center justify-center flex  rounded-lg text-lg font-semibold`}>
        {isLoading ? <MessageLoading />: "I Understand, Proceed"}
      </button>
        <Toaster richColors position="top-center" />
    </div>
    </RouteAuthCheck>
  );
}
