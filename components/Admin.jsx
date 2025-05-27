"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles"
import {
  HomeIcon,
  FilePlus,
  ListChecks,
  BarChart2,
  Users,
  LogOut
} from 'lucide-react';
  import { useRouter } from 'next/navigation';
  import RouteAuthCheck from "@/lib/routeAuthCheck";
  import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

  export default function Admin() {
    const router = useRouter();
    const data = [
      {
        title: 'Home',
        icon: <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
        link: '/admin',
      },
      {
        title: 'Create Test',
        icon: <FilePlus className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
        link: '/createTest',
      },
      {
        title: 'All Tests',
        icon: <ListChecks className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
        link: '/allTests',
      },
      {
        title: 'Results',
        icon: <BarChart2 className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
        link: '/results',
      },
      {
        title: 'Users',
        icon: <Users className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
        link: '/users',
      },
        {
        title: 'Logout',
        icon: <LogOut className='h-full w-full text-red-600 dark:text-neutral-300' />,
        onClick: () => {
          localStorage.removeItem('token'); // or use cookies/session logic
          localStorage.removeItem('userId');
          router.push('/');
        },
      },
    ];
    
  return (
    <RouteAuthCheck>
    <>
    <div className="h-screen w-full bg-black flex flex-col items-center justify-between overflow-hidden">
    <div className='flex justify-center items-center max-w-full'>
    <Dock className='items-end pb-3'>
      {data.map((item, idx) => (
        <DockItem
          key={idx}
          className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
           onClick={() => {
              if (item.onClick) {
                item.onClick(); 
              } else {
                router.push(item.link);
              }
            }}
        >
          <DockLabel>{item.title}</DockLabel>
          <DockIcon>{item.icon}</DockIcon>
        </DockItem>
      ))}
    </Dock>
  </div>
  <div className="flex flex-col items-center justify-center h-full w-full">
  <h1 className="md:text-7xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20">
     Admin Portal
    </h1>
    <div className="w-[70rem] h-40 relative">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* Core component */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1600}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  </div>
   
  </div>
  </>
  </RouteAuthCheck>
  )
}
