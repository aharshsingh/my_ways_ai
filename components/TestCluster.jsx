"use client"
import { useTheme } from "next-themes"
import { Particles } from "@/components/ui/particles"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import axios from "axios";
import { useAuth } from "@/context/authContext"
import { CreditCard } from "@/components/ui/credit-card";

export default function TestCluster() {
    const [tests, setTests] = useState([]);
    const[isLoading,setIsLoading]=useState(true);
    const { theme } = useTheme()
    const { token } = useAuth();
    const [color, setColor] = useState("#ffffff")
  
    useEffect(() => {
      const fetchTests = async () => {
        if (!token) return;
          try {
              const response = await axios.get("http://localhost:3000/api/test",{
                headers: { Authorization: `Bearer ${token}` },
              });
              setTests(response.data);
          } catch (err) {
              // setError("Failed to load tests");
              console.log(err);
          } 
      };
      fetchTests();
  }, [token]);

    useEffect(() => {
      setColor(theme === "dark" ? "#ffffff" : "#000000")
    }, [theme])

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

        
  return (

<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
    
   <div className='w-full flex items-center justify-center '>
   {isLoading ?  (<div className='h-screen w-full flex justify-start'>
        <div className='h-[70%] m w-full grid grid-cols-4 place-items-center'>
         {tests.map((test)=>(
          <div key={test.testId} className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>))}
        </div>
    </div>)
    :( <div className='h-screen w-full flex items-center justify-center'>
      <div className='h-full mt-[20%]  w-[95%] grid grid-cols-4 place-item-center'>
        {tests.map((test)=>(
           <div key={test.testId} className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
           <div className='text-black h-auto w-full  flex flex-col  items-start gap-y-1'>
              <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>{test.testName} </p>       
              <hr className='w-full' />
              <p>No of questions: {test.numOfQuestions}</p>
              <p>Duration: {test.duration} min</p>
              <p>Score: {test.score}</p>
           </div>
           {/* <CreditCard
            cardNumber="4111 1111 1111 9743"
            cardHolder="John Doe"
            expiryDate="12/24"
          /> */}
          </div>
        ))}
           
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
