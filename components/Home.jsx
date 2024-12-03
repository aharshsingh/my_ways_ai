
import React from 'react'
// import { DemoButton } from './Buttons'
import Link from 'next/link'
export default function Home() {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
            <div className=" pl-10 py-10 border-r-2 border-gray-500 w-full md:w-3/5">
                <div className="mb-6 w-11/12">
                    <p className="h-10  text-lg text-sky-500 bg-gray-100 rounded-s-xl shadow-sm">
                        Make your hiring process Faster,Smarter and Accurate with Zeko Interview</p>
                </div>
                <div className="space-y-6">
                    <h1 className="text-5xl font-extrabold leading-snug text-gray-800"> 
                Surprisingly-Human AI Intrviews,Tailored for <br/> your Industry                
                    </h1>
                    <p className= " w-3/4 text-gray-700 text-2xl">
                        Taken by 15,000+ Candidates for Optimal Candidate
                        Experience & Accurate Hiring. Desgined by Experts from IT,
                        BFSI,BPO & Product Companies,
                    </p>
                </div>
                
            </div>
            <div className="w-full md:w-2/5 flex items-center justify-center border-l-2 border-gray-500">
                   
                   <Link href="/testins" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-60">Start</Link>
              
            </div>
        </div>
      )
   
}
