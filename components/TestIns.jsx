"use client";
import React from 'react';
import{useEffect, useState,useRef} from 'react'
import {TestButton} from './Buttons'
import Link from 'next/link'

export default function TestIns() {
const [video, setVideo] = useState(false);    
const videoRef = useRef(null);   
useEffect(() => {
    videoPermission();
}, []);

    const videoPermission=async()=>{
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true});
           
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setVideo(true);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex h-screen bg-gray-50'>
        <div className='w-7/12 flex items-center justify-center border-r-2 border-gray-500 bg-black'>
              <div className='w-10/12 h-5/6 bg-gray-900 flex items-center justify-center text-white'>
              { (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-auto border-2 border-black"
                    />
                )}
              </div>
        </div>
        {/* //right side */}
        <div>
          <h1 className='text-3xl font-bold mb-6'>Test Instruction</h1>
          <div>
              <ul className="list-disc pl-5 space-y-4 text-gray-700" >
                  <li>Ensure stable Internet and choose a clean, quiet location</li>
                  <li>Permission for access of camera, microphone, entire screen sharing is required.</li>
                  <li>Be in professional attire and avoid distractions.</li>
                  <li>Give a detailed response, providing as much information as you can.</li>
                  <li>Answer the question with examples and projects you've worked on.</li>
              </ul>
              
          </div>
          <div >
          <Link href="/permissions" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-60">Start</Link>
          </div>
        </div>
      </div>
      )
    
}
