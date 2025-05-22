"use client";
import React from "react";
import { Analytics } from '@vercel/analytics/next';
import {
  LayoutDashboard,
  FilePlus,
  ListChecks,
  BarChart2,
  Users,
  LogOut,
} from 'lucide-react';
  
  import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dockAdmin';
  import { useRouter } from 'next/navigation';
    
export default function Layout({ children }) {
  const router = useRouter();
  const data = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
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
    <div className="flex ">
        <div className='flex flex-1 items-center w-[10%] bg-white'>
          <Dock className=' flex flex-10 border-2 items-center justify-center p-4'>
            {data.map((item, idx) => (
              <DockItem
                key={idx}
                className='aspect-square  rounded-full bg-gray-200 dark:bg-neutral-800'
                 onClick={() => {
                  if (item.onClick) {
                    item.onClick(); // Logout logic
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
      {/* Main Content */}
      <main className="w-[91.5%] h-screen">
        {children}
        <Analytics />
      </main>
    </div>
  );
}
