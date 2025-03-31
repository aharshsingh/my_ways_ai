"use client"
import React, { use } from 'react'
import { useState, useEffect} from "react"
import { Iinput } from "@/components/ui/number-input"
import { Input } from "@/components/ui/input";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTags } from "@/components/hooks/use-tags";
import { Button } from "@/components/ui/button";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

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

  const DEMO_SUGGESTIONS = [
    { id: "next", label: "Next.js" },
    { id: "react", label: "React" },
    { id: "tailwind", label: "Tailwind" },
    { id: "typescript", label: "TypeScript" },
    { id: "ui", label: "UI" },
  ];

  const [inputValue, setInputValue] = useState("");
  const { tags, addTag, removeTag, removeLastTag, hasReachedMax } = useTags({
    maxTags: 5,
    onChange: (tags) => console.log("Tags updated:", tags),
  });

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !inputValue) {
      e.preventDefault();
      removeLastTag();
    }
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag({ id: inputValue.toLowerCase(), label: inputValue });
      setInputValue("");
    }
  };
  useEffect(() => { 
    setTotalMark(accuracyMark + completenessMark + explainationMark + practicalRelevanceMark + concisenessMark);
  }, 
  [testName, testDuration, totalMark, accuracyMark, completenessMark, explainationMark, practicalRelevanceMark, concisenessMark])


  return (
    <div className="flex-grow h-screen bg-black ">
     <div className='flex items-center justify-center overflow-hidden w-full h-[8%]'>
     <img
            src="/appLogo3.png" 
            alt="Logo"
            className="h-14 w-auto overflow-hidden"
          /> 
     </div>
     <div className='flex w-full  p-4 h-auto bg-black'>
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
      <div className=' gap-10 flex flex-col items-center  w-[65%]'>
        <div className=" w-[70%] h-[50%]">
          <Label htmlFor={id}>Textarea with error</Label>
          <Textarea
            id={id}
            className="border-destructive/80 h-[90%] text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20"
            placeholder="Enter Detailed description of test"
            defaultValue=""
          />
          <p className="pt-2 text-md text-destructive" role="alert" aria-live="polite">
            Test details should be at least 50 characters
          </p>
      </div>

      <div className="  w-[100%] flex flex-col justify-center items-center space-y-4">
      <div className="space-y-2 flex w-[100%] items-center justify-center gap-5">
        <label className="font-medium text-white text-xl">Tags</label>
        <div className="rounded-lg border w-[55%] border-input bg-background p-1">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm",
                  tag.color || "bg-primary/10 text-primary"
                )}
              >
                {tag.label}
                <button
                  onClick={() => removeTag(tag.id)}
                  className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasReachedMax ? "Max tags reached" : "Add tag..."}
              disabled={hasReachedMax}
              className="flex-1  bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
      
      <div className=" flex flex-col w-[50%] space-y-2">
        <label className="text-sm font-medium text-white">Suggestions</label>
        <div className="flex flex-wrap gap-2">
          {DEMO_SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion.id}
              variant="outline"
              size="sm"
              onClick={() => {
                if (!tags.find(t => t.id === suggestion.id)) {
                  addTag(suggestion);
                }
              }}
              disabled={hasReachedMax || tags.find(t => t.id === suggestion.id)}
            >
              {suggestion.label}
            </Button>
          ))}
        </div>
      </div>
    </div>

    <div className='buttons w-[55%] p-5 flex justify-between items-center gap-5'>
    <AnimatedSubscribeButton className="w-fit-content">
      <span className="group inline-flex items-center">
        Create Test
        <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="group inline-flex items-center">
        <CheckIcon className="mr-2 size-4" />
        Test Created
      </span>
    </AnimatedSubscribeButton>

    <AnimatedSubscribeButton className="w-fit-content">
      <span className="group inline-flex items-center">
        Publish Test
        <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="group inline-flex items-center">
        <CheckIcon className="mr-2 size-4" />
        Test Published
      </span>
    </AnimatedSubscribeButton>
    </div>
      </div>
     </div>
    </div>
  )
}
