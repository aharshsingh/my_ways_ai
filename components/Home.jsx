"use client";
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-full flex flex-col md:flex-row bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200">
    
      <div className="pl-20 py-10 border-gray-500 w-full md:w-3/5">
        <div className="mb-6 border-white border-2 rounded-xl w-11/12 text-center bg-violet-100">
          <p className="h-9 leading-snug text-lg pt-1 text-[rgb(87,60,255)]">
            Make your hiring process Faster, Smarter, and Accurate with Zeko Interview
          </p>
        </div>
        <div className="space-y-6">
          <h1 className="w-full text-7xl leading-snug text-gray-800">
            Surprisingly-Human AI Interviews,
            <br />
            Tailored for your Industry
          </h1>
          <p className="w-full text-gray-700 text-2xl">
            Taken by 15,000+ Candidates for Optimal Candidate Experience & Accurate Hiring.
            Designed by Experts from IT, BFSI, BPO & Product Companies,
          </p>
        </div>
      </div>

   
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center text-center border-gray-500 -mt-14">
             
              <img
                src="/homeImg.png" 
                alt="AI Interviews"
                className="w-full h-auto object-cover rounded-lg mb-0" 
              />
              <Link
                href="/testins"
                className="w-2/3 text-2xl px-6 py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 mt-2" // Added slight margin-top for the button
              >
                Start
              </Link>
        </div>

    </div>
  );
}
