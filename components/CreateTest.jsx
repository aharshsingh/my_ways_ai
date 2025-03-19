"use client"
import React, { use } from 'react'
import { useState, useEffect} from "react"
import { Iinput } from "@/components/ui/number-input"
import { Input } from "@/components/ui/input";
import { NumberTicker } from "@/components/magicui/number-ticker";
 
 
import { useId } from "react";


export default function CreateTest() {
  const id = useId();
  const [testName, setTestName] = useState("")
  const [testDuration, setTestDuration] = useState(0)
  const [totalMark, setTotalMark] = useState(0)
  const [accuracyMark, setAccuracyMark] = useState(0)
  const [completenessMark, setCompletenesseMark] = useState(0)
  const [explainationMark, setExplainationMark] = useState(0)
  const [practicalRelevanceMark, setPracticalRelevanceMark] = useState(0)
  const [concisenessMark, setConcisenessMark] = useState(0)

  useEffect(() => { 
    setTotalMark(accuracyMark + completenessMark + explainationMark + practicalRelevanceMark + concisenessMark);
  }, 
  [testName, testDuration, totalMark, accuracyMark, completenessMark, explainationMark, practicalRelevanceMark, concisenessMark])


  return (
    <div className="flex-grow h-screen  bg-black ">
     <div className='flex items-center justify-center w-full h-[8%]'>
     <img
            src="/appLogo3.png" 
            alt="Logo"
            className="h-14 w-auto"
          /> 
     </div>
     <div className='flex w-full  h-[92%]'>
      <div className='flex flex-col justify-center gap-10 items-center w-[35%] '>
        <div className='w-full flex flex-col justify-center items-center gap-5'>
            <div className="group relative w-[70%] ">
                <label
                 htmlFor={id}
                  className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text p-3 text-xl text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
                  <span className="inline-flex bg-background px-2">Test Name</span>
                </label>
                <Input id={id} type="email" placeholder="" />
            </div>
    
            <div className="group relative w-[70%] ">
                <label
                 htmlFor={id}
                  className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text p-3 text-xl text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
                  <span className="inline-flex bg-background px-2">Test Duration</span>
                </label>
                <Input id={id} type="email" placeholder="" />
            </div>
        </div>



        <div className='testMark flex flex-col gap-5 items-center justify-center w-full'>
    
            <div className='flex w-[90%] items-center justify-center gap-5 '>
              <h1 className='text-white flex justify-center items-center text-2xl w-[50%] border-2 p-2 rounded-xl bg-black'>Accuracy</h1>
              <div className="text-white space-y-2 flex flex-col items-center justify-center">
              <Iinput value={accuracyMark} onChange={setAccuracyMark} min={0} max={10} />
              </div>
            </div>

            <div className='flex w-[90%] items-center justify-center gap-5 '>
              <h1 className='text-white flex justify-center items-center text-2xl w-[50%] border-2 p-2 rounded-xl bg-black'>Completeness</h1>
              <div className="text-white space-y-2 flex flex-col items-center justify-center">
              <Iinput value={completenessMark} onChange={setCompletenesseMark} min={0} max={10} />
              </div>
            </div>

            <div className='flex w-[90%] items-center justify-center gap-5 '>
              <h1 className='text-white flex justify-center items-center text-2xl w-[50%] border-2 p-2 rounded-xl bg-black'>Explanation</h1>
              <div className="text-white space-y-2 flex flex-col items-center justify-center">
              <Iinput value={explainationMark} onChange={setExplainationMark} min={0} max={10} />
              </div>
            </div>

            <div className='flex w-[90%] items-center justify-center gap-5 '>
              <h1 className='text-white flex justify-center items-center text-2xl w-[50%] border-2 p-2 rounded-xl bg-black  whitespace-nowrap overflow-hidden text-ellipsis text-center'>Practical Relevance</h1>
              <div className="text-white space-y-2 flex flex-col items-center justify-center">
              <Iinput value={practicalRelevanceMark} onChange={setPracticalRelevanceMark} min={0} max={10} />
              </div>
            </div>

            <div className='flex w-[90%] items-center justify-center gap-5 '>
              <h1 className='text-white flex justify-center items-center text-2xl w-[50%] border-2 p-2 rounded-xl bg-black'>Conciseness</h1>
              <div className="text-white space-y-2 flex flex-col items-center justify-center">
              <Iinput value={concisenessMark} onChange={setConcisenessMark} min={0} max={10} />
              </div>
            </div>

            <div className='flex w-[90%] items-center justify-center gap-10'>
            <h1 className='text-white flex justify-center items-center text-4xl w-[50%] p-2 rounded-xl bg-black'>Total Marks</h1>
            <div className="text-white   flex flex-col items-center justify-center">
              <NumberTicker
                value={totalMark}
                className="whitespace-pre-wrap text-7xl font-medium tracking-tighter text-white dark:text-white"
              />
            </div>
            </div>
          
           
        </div>
      </div>
      <div className='w-[65%]'>

      </div>
     </div>
    </div>
  )
}
