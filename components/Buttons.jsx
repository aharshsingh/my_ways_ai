"use client";  
import React from 'react';
import { useRouter } from "next/router";

export function DemoButton() {
    const router = useRouter();

    const navigateToPermission = async () => {    
     
    };

    return (
        <div>
            <button 
                onClick={navigateToPermission} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Start
            </button>
        </div>
    );
}
export function TestButton()
{
  return (
    <div>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Start</button>
    </div>
  )
} 