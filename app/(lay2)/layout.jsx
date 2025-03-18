"use client";
import React, { useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles"
import {
    Activity,
    Component,
    HomeIcon,
    Mail,
    Package,
    ScrollText,
    SunMoon,
  } from 'lucide-react';
  
  import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dockAdmin';
  import { useRouter } from 'next/navigation';
    
export default function Layout({ children }) {
  const router = useRouter();
  const data = [
    {
      title: 'Home',
      icon: (
        <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      link: '/admin',
    },
    {
      title: 'Create Test',
      icon: (
        <Package className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      link: '/createTest',
    },
    {
      title: 'All Tests',
      icon: (
        <Component className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      link: '/createTest',
    },
    {
      title: 'Results',
      icon: (
        <Activity className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      link: '/createTest',
    },
    {
      title: 'Users',
      icon: (
        <ScrollText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      link: '/createTest',
    },

  ];
  
   
  return (
    <div className="flex">
        <div className='flex flex-1 items-center w-[10%] bg-black'>
          <Dock className=' flex flex-10 items-center justify-center p-4'>
            {data.map((item, idx) => (
              <DockItem
                key={idx}
                className='aspect-square  rounded-full bg-gray-200 dark:bg-neutral-800'
                onClick={() => router.push(item.link)}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>
      {/* Main Content */}
      <main className="w-[91.5%] h-screen">
        {children}
      </main>
    </div>
  );
}
