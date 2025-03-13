"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Layout({ children }) {
   const router = useRouter();
  return (
    <div>
      <nav className="bg-black fixed top-0 w-full z-10">
        <div className="container mx-auto flex items-center justify-center gap-[85%]">
          <div className="text-white text-xl font-bold">
             <img
              src="/logo2.png" 
              alt="Logo"
              className="h-10 w-auto"
            /> 
          </div>
       
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
              <img src="/profile.png"  alt="Profile" className="h-11 w-11"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem>Results</DropdownMenuItem>
              <DropdownMenuItem className="text-red-700">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>  
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
