"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { PlayIcon, CameraIcon, MicrophoneIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

export default function Permissions() {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [canHear, setCanHear] = useState(false);
  const videoRef = useRef(null);

  const videoPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setVideo(true);
    } catch (error) {
      alert("Please grant access to camera");
      console.log(error);
    }
  };

  const audioPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudio(true);
    } catch (error) {
      alert("Please grant access to microphone");
      console.log(error);
    }
  };

  const handleAudioPlay = async () => {
    const sampleAudio = new Audio("/sample.mp3");
    sampleAudio.play();
    setCanHear(true);
  };

  const screenSharing = async () => {
    try {
      const screenShare = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenShare(true);
      alert("Screen Share Started");
    } catch (error) {
      alert("Screen Sharing is not Available");
      console.log(error);
    }
  };

  const allPermissionsGranted = video && audio && screenShare && canHear;

  return (
    <div className="flex border-none border-gray-400 bg-[rgb(22,29,41)] min-h-screen">
    
      <div className="w-1/2 p-4 flex justify-center items-center border-none border-white">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto object-cover border-white border-2 rounded-3xl"
        />
      </div>

    
      <div className="w-1/2 p-4 flex flex-col justify-center items-center space-y-4 text-white">
        <h1 className="text-2xl font-semibold mb-4">Ready to Join?</h1>
        <p className="text-xl">Make sure your device is well configured.</p>

     
        <div className="w-11/12 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-white">
          <CameraIcon className="w-8 h-8 text-white" />
          <div className="flex items-center space-x-2 w-full justify-between">
            <span>Allow Camera</span>
            <input
              type="checkbox"
              checked={video}
              onChange={videoPermission}
              className="w-8 h-8 ml-auto"
            />
          </div>
        </div>

  
        <div className="w-11/12 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-white">
          <MicrophoneIcon className="w-8 h-8 text-white" />
          <div className="flex items-center space-x-2 w-full justify-between">
            <span>Allow Microphone</span>
            <input
              type="checkbox"
              checked={audio}
              onChange={audioPermission}
              className="w-8 h-8 ml-auto"
            />
          </div>
        </div>

   
        <div className="w-11/12 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-white">
          <MicrophoneIcon className="w-8 h-8 text-white" />
          <div className="flex items-center space-x-2 w-full justify-between">
            <span>Check Speaker</span>
            <div className="flex items-center space-x-2">
              <div
                onClick={handleAudioPlay}
                className="pl-3 px-1 py-3 text-white rounded-full hover:bg-purple-500 cursor-pointer flex items-center"
              >
                <PlayIcon className="w-6 h-6 text-white mr-2" />
              </div>
              <input
                type="checkbox"
                className="w-8 h-8 ml-auto"
                disabled={!canHear}
              />
            </div>
          </div>
        </div>

       
        <div className="w-11/12 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-white">
          <ComputerDesktopIcon className="w-8 h-8 text-white" />
          <div className="flex items-center space-x-2 w-full justify-between">
            <span>Enable Screen Share</span>
            <input
              type="checkbox"
              checked={screenShare}
              onChange={screenSharing}
              className="w-8 h-8 ml-auto"
            />
          </div>
        </div>


        <div className="w-11/12 p-2 items-center">
          <Link
            href={allPermissionsGranted ? "/InterviewIns" : "#"}
            className={`w-full block px-8 py-3 rounded-lg text-center text-xl font-semibold ${
              allPermissionsGranted? "bg-purple-700 text-white hover:bg-purple-900"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Start Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
