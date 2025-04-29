"use client";
import React from 'react';
import{useEffect, useState,useRef} from 'react'
// import {TestButton} from './Buttons'
import Link from 'next/link';

export default function TestIns() {
    return (
    <div className='flex h-screen bg-white w-[100%] '>
        <div className=' flex items-center justify-center w-[50%]  border-gray-500  bg-white'>
                <img
              src="/TestIns.jpg"  // Replace with your actual path
              alt="Descriptive Alt Text"
              className="max-w-[90%] max-h-[80%] object-contain rounded-2xl shadow-lg"
            />
        </div>
   
     <div className=' bg-white h-full flex flex-col items-center justify-center w-[50%]'>
          <div className="flex flex-col justify-center items-center w-full py-8 px-4 gap-5">
            <h1 className='text-4xl font-semibold text-[#5862b2]'> Point to be taken care of</h1>
             <ul className="list-disc w-4/5 pl-6 space-y-4 text-[#09090c] text-base leading-relaxed font-medium bg-white p-6">
               <li className="hover:translate-x-1 transition-all duration-200 ease-in-out">
                 Ensure stable Internet and choose a clean, quiet location
               </li>
               <li className="hover:translate-x-1 transition-all duration-200 ease-in-out">
                 Permission for access of camera, microphone, entire screen sharing is required.
               </li>
               <li className="hover:translate-x-1 transition-all duration-200 ease-in-out">
                 Be in professional attire and avoid distractions.
               </li>
               <li className="hover:translate-x-1 transition-all duration-200 ease-in-out">
                 Give a detailed response, providing as much information as you can.
               </li>
               <li className="hover:translate-x-1 transition-all duration-200 ease-in-out">
                 Answer the question with examples and projects you have worked on.
               </li>
               <li className="hover:translate-x-1 transition-all duration-200 ease-in-out">
                 Be clear when you speak and do not talk too fast
               </li>
             </ul>
           </div>

          <div className="w-[80%] p-2 mt-14 items-center">
            <Link
              href="/permissions"
              className="w-full block px-8 py-3 bg-[#5862b2] text-white rounded-lg text-center text-lg font-semibold"
            >Start Now
            </Link>     
        </div>
        </div>
      </div>
      )
    
}
