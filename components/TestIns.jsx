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
            <div></div>
        <div className='w-7/12 flex items-center justify-center  border-gray-500  bg-[rgb(22,29,41)]'>
              <div className='w-10/12 h-5/6  bg-[rgb(22,29,41)] flex items-center justify-center text-white'>
              { (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-auto rounded  bg-[rgb(22,29,41)]"
                    />
                )}
              </div>
        </div>
        {/* //right side */}
        <div className=' bg-[rgb(22,29,41)]'>
          <h1 className='text-2xl font-bold mb-6 mt-20 text-white'>Test Instructions</h1>
          <div>
              <ul className="list-disc w-4/5 pl-5 space-y-4 text-white" >
                  <li>Ensure stable Internet and choose a clean, quiet location</li>
                  <li>Permission for access of camera, microphone, entire screen sharing is required.</li>
                  <li>Be in professional attire and avoid distractions.</li>
                  <li>Give a detailed response, providing as much information as you can.</li>
                  <li>Answer the question with examples and projects you've worked on.</li>
              </ul>
              
          </div>
          <div className="w-11/12 p-2 mt-14 items-center">
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
