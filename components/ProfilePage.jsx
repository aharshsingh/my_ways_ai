"use client"
import React, { useEffect } from 'react';
import { ProjectStatusCard } from "@/components/ui/expandable-card";
import RouteAuthCheck from '@/lib/routeAuthCheck';
import axios from "axios";
import { AvatarPicker } from "@/components/ui/avatar-picker"
export default function ProfilePage() {
const userInfo=JSON.parse(localStorage.getItem('user'));
const attemptedTests = userInfo?.attemptedTest || [];
const attemptedTestId=attemptedTests.map(item => item._id || item._id);
  useEffect(()=>{
    fetchTestRes();
  },[])
    const fetchTestRes=async()=>{
    try {
      const res= await axios.post(`http://localhost:3000/api/attemptedTest/`,{
        testIdArray:attemptedTestId
      }) 
      if(res.status===200){
        console.log("your data")
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
    }
    

  return (
    <RouteAuthCheck userRole="user">
    <div className='w-full h-[100vh] pt-20 flex bg-white'>
      <div className='w-[30%] h-[100%] flex flex-col items-center bg-black-200'>
        <div className='w-[70%] h-[75%] items-center flex flex-col gap-4'>  
              <AvatarPicker username={userInfo.userName} email={userInfo.email}/>
        </div>
      </div>
      <div className='w-[70%] bg-white'>
        <div  className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
          <ProjectStatusCard
        title="Design System"
        progress={100}
        dueDate="Dec 31, 2023"
        tasks={[
          { title: "Fluency", completed: true },
          { title: "Accuracy", completed: true },
          { title: "To the Point", completed: true },
          { title: "Relevance", completed: true }
        ]}
        bestScore={256}
        timesAttempted={0}
      />
          </div>
        <div>
        <ProjectStatusCard
        title="Analytics Dashboard"
        progress={45}
        dueDate="Mar 1, 2024"
        tasks={[
          { title: "Fluency", completed: true },
          { title: "Accuracy", completed: true },
          { title: "To the Point", completed: true },
          { title: "Relevance", completed: true }
        ]}
        bestScore={256}
        timesAttempted={6}
      />
        </div>
        <div>
          <ProjectStatusCard
        title="Design System"
        progress={100}
        dueDate="Dec 31, 2023"
        tasks={[
          { title: "Fluency", completed: true },
          { title: "Accuracy", completed: true },
          { title: "To the Point", completed: true },
          { title: "Relevance", completed: true }
        ]}
        bestScore={256}
        timesAttempted={0}
      />
          </div>
        <div>
        <ProjectStatusCard
        title="Analytics Dashboard"
        progress={45}
        dueDate="Mar 1, 2024"
        tasks={[
          { title: "Fluency", completed: true },
          { title: "Accuracy", completed: true },
          { title: "To the Point", completed: true },
          { title: "Relevance", completed: true }
        ]}
        bestScore={256}
        timesAttempted={6}
      />
        </div>
        <div>
          <ProjectStatusCard
        title="Design System"
        progress={100}
        dueDate="Dec 31, 2023"
        tasks={[
          { title: "Fluency", completed: true },
          { title: "Accuracy", completed: true },
          { title: "To the Point", completed: true },
          { title: "Relevance", completed: true }
        ]}
        bestScore={256}
        timesAttempted={0}
      />
          </div>
        <div>
        <ProjectStatusCard
        title="Analytics Dashboard"
        progress={45}
        dueDate="Mar 1, 2024"
        tasks={[
          { title: "Fluency", completed: true },
          { title: "Accuracy", completed: true },
          { title: "To the Point", completed: true },
          { title: "Relevance", completed: true }
        ]}
        bestScore={256}
        timesAttempted={6}
      />
        </div>
      
        </div>
      </div>
    </div>
    </RouteAuthCheck>
  )
}
