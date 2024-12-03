"use client";
import React from 'react'
import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/outline';
import { useState,useRef} from 'react';
export default function Permissions() {
    const[video,setVideo]=useState(false);
    const[audio,setAudio]=useState(false);
    const[screenShare,setScreenShare]=useState(false); 
    const[canHear,setCanHear]=useState(false);
    const videoRef = useRef(null);

    // useEffect(() => {
    //     if (video && videoRef.current) {
    //         // Handle any additional actions here if necessary, like cleanup or post-processing
    //         console.log("Video stream is active");
    //     }
    // }, [video]);

    const videoPermission=async()=>{
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true});
           
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setVideo(true);
        } catch (error) {
            alert("Please grant access to camera ");
            console.log(error);
        }
    }
    
    const audioPermission=async()=>
    {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true});
            setAudio(true);
            // mediaStream.getTracks().forEach(track => track.stop());
        } catch (error) {
            alert("Please grant access to microphone ");
            console.log(error);
        }
    }
    const handleAudioPlay=async()=>{
        const sampleAudio= new Audio("/audioSample.mp3");
        sampleAudio.play();
        setCanHear(true);
        // setAudioPlayed(true);
    }
    const screenSharing=async()=>{
        try {
            const screenShare=await navigator.mediaDevices.getDisplayMedia({video:true});
            setScreenShare(true);
            alert("Screem Share Started");
        } catch (error) {
            alert("Screen Sharing is not Available");
            console.log(error);
        }
    }
    return(
        <>
    <div className="check-permission-screen">
        <h1>Grant Permissions</h1>

        <div>
            <label>
                <input type="checkbox" checked={video} onChange={videoPermission}/>
                    Allow Camera (Video)
            </label>
        </div>

        <div>
            <label>
                <input type="checkbox" checked={audio} onChange={audioPermission}/>
                    Allow Microphone (Audio)
            </label>
        </div>

        <div>
            <label><input type="checkbox" disabled={!canHear} />
                    Can you hear the Audio
            </label>

            <div onClick={handleAudioPlay}  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <PlayIcon className="w-8 h-8 text-white" />
            </div>
        </div>

        <div>
            <label><input  type="checkbox"  checked={screenShare}  onChange={screenSharing}/>
                Allow Screen Sharing
            </label>
        </div>
   <div>
   <Link href="/test" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-60">Start</Link>
   </div>
  </div>
  <div className="w-1/2 p-4 flex justify-center items-center">
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
  </>
  
);
}
