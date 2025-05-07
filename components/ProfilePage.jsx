"use client"
import React from 'react';
import { ProjectStatusCard } from "@/components/ui/expandable-card";
export default function ProfilePage() {
  return (
    <div className='w-full h-[100vh] pt-20 flex bg-white'>
      <div className='w-[30%] h-[100%] flex flex-col items-center bg-black-200'>
        <div className='w-[70%] h-[75%] items-center flex flex-col gap-4'>
          <div className=' w-[60%] h-[40%] mt-4 border-2 overflow-hidden  rounded-full border-blue-900'>
          <img
              src="/profile_img2.png" 
              alt="Logo"
              className="w-full h-full object-contain"
            /> 
          </div>
          <h2 className='text-lg md:text-xl max-w-[600px]'>ADMIN</h2>
          <p>admin@gmail.com</p>
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
  )
}
