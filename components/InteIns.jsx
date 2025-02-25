"use client";
import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";

export default function InteIns() {
    const router = useRouter();
    const handelClick=()=>{
        router.push('/test');
    }
  return (
    <div className="flex flex-col items-center bg-[rgb(22,29,41)] py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Interview Instructions</h1>
    <p className='text-white'>Your are in a proctered test enviorment. If caught in ant suspicious behaviour, you will be marked <span className='text-red-500'>FAIL!</span></p>
      
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
       
        <div className="text-center bg-[rgb(22,29,41)]p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct1.5b43960d.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 1"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className=" text-sm text-white">Do not look off screen & maintain eye contact with the camera.</p>
        </div>

        {/* Instruction 2 */}
        <div className="text-center bg-[rgb(22,29,41)] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct2.724dba41.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 2"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-sm">Avoid unusual extended pauses & responds to questions promptly</p>
        </div>

      
        <div className="text-center bg-[rgb(22,29,41)] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct3.29af2c81.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 3"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-sm">Ensure you are the only person visible in the camera frame during the interview.</p>
        </div>

 
        <div className="text-center bg-[rgb(22,29,41)] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct4.50439e66.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 4"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-sm">Do not switch between tabs in your web browser.</p>
        </div>

        {/* Instruction 5 */}
        <div className="text-center bg-[rgb(22,29,41)] p-4 rounded-lg text-white">
          <img
            src="https://interview.zeko.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FvideoInstruct5.02e436bc.svg&w=256&q=75" // Replace with your image path
            alt="Instruction 5"
            className="h-25 w-25 mx-auto mb-4" 
          />
          <p className="text-white text-sm">Minimizing the screen will lead to you being kicked out.</p>
        </div>

       
      </div>
      <p className=' mt-7 text-green-500'>Stay focused and do your best!.</p>
   
      <button onClick={handelClick} className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold">
        I Understand, start the interview
      </button>
    </div>
  );
}
