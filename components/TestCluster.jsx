"use client"
import { useTheme } from "next-themes"
import { Particles } from "@/components/ui/particles"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

export default function TestCluster() {
    const[isLoading,setIsLoading]=useState()
    const { theme } = useTheme()
    const [color, setColor] = useState("#ffffff")
  
    useEffect(() => {
      setColor(theme === "dark" ? "#ffffff" : "#000000")
    }, [theme])
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(true);
        }, 3000);
        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);
      }, []);
        
  return (

<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
    
   <div className='w-full flex items-center justify-center '>
   {isLoading ?(
    <div className='h-screen w-full flex items-center justify-start'>
      <div className='h-[70%] m w-full grid grid-cols-4 place-items-center'>
            <div className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
             <div className='text-black h-auto w-full flex flex-col  items-start gap-y-1'>
                <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>Test Name </p>       
                <hr className='w-full' />
                <p>No of question: </p>
                <p>Duration: </p>
                <p>Attempted: </p>
             </div>
            </div>
            <div className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
             <div className='text-black h-auto w-full flex flex-col  items-start gap-y-1'>
                <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>Test Name </p>       
                <hr className='w-full' />
                <p>No of question: </p>
                <p>Duration: </p>
                <p>Attempted: </p>
             </div>
            </div>
            <div className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
             <div className='text-black h-auto w-full flex flex-col  items-start gap-y-1'>
                <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>Test Name </p>       
                <hr className='w-full' />
                <p>No of question: </p>
                <p>Duration: </p>
                <p>Attempted: </p>
             </div>
            </div>
            <div className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
             <div className='text-black h-auto w-full flex flex-col  items-start gap-y-1'>
                <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>Test Name </p>       
                <hr className='w-full' />
                <p>No of question: </p>
                <p>Duration: </p>
                <p>Attempted: </p>
             </div>
            </div>
            <div className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
             <div className='text-black h-auto w-full flex flex-col  items-start gap-y-1'>
                <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>Test Name </p>       
                <hr className='w-full' />
                <p>No of question: </p>
                <p>Duration: </p>
                <p>Attempted: </p>
             </div>
            </div>
            <div className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
             <div className='text-black h-auto w-full flex flex-col  items-start gap-y-1'>
                <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>Test Name </p>       
                <hr className='w-full' />
                <p>No of question: </p>
                <p>Duration: </p>
                <p>Attempted: </p>
             </div>
            </div>
      </div>
   </div>):
    (<div className='h-screen w-full flex items-center justify-start'>
        <div className='h-[70%] m w-full grid grid-cols-4 place-items-center'>
         <div className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>
         <div className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>
         <div className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>
         <div className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>
         <div className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>
         
        </div>
    </div>)
  }   
   </div>
   {/* <Particles
      className="absolute inset-0"
      quantity={300}
      ease={80}
      color={color}
      refresh
    /> */}
  </div>
  )
}
