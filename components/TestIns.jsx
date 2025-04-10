"use client";
import React from 'react';
import{useEffect, useState,useRef} from 'react'
// import {TestButton} from './Buttons'
import Link from 'next/link';

export default function TestIns() {
    return (
    <div className='flex h-screen bg-gray-50 w-[100%] border-red-800'>
        <div className=' flex items-center justify-center w-[50%]  border-gray-500  bg-[rgb(22,29,41)]'>
                <img
              src="/TestIns.jpg"  // Replace with your actual path
              alt="Descriptive Alt Text"
              className="max-w-[90%] max-h-[80%] object-contain rounded-2xl shadow-lg"
            />
        </div>
   
     <div className=' bg-[rgb(22,29,41)] h-full flex flex-col items-center w-[50%]'>
        <h1 className='text-4xl font-bold mb-6 mt-20 text-white'>Test Instructions</h1>
          <div className="flex justify-center items-center w-full py-8 px-4">
             <ul className="list-disc w-4/5 pl-6 space-y-4 text-white text-base leading-relaxed font-medium bg-[rgb(22,29,41)] p-6">
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
              className="w-full block px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-center text-lg font-semibold"
            >Start Now
            </Link>     
        </div>
        </div>
      </div>
      )
    
}
