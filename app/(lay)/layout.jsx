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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function Layout({ children }) {
   const router = useRouter();
  return (
    <div>
      <nav className="bg-black fixed top-0 border-2 border-blue-900 w-screen z-10">
        <div className="flex items-center justify-between w-screen">
          <div className="text-white text-xl font-bold">
             <img
             onClick={() => router.push('/')}
              src="/appLogo3.png" 
              alt="Logo"
              className="h-10 w-auto cursor-pointer"
            /> 
          </div>
       
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
              {/* <img src="/profile.png"  alt="Profile" className="h-11 w-11"/> */}
              <span><FontAwesomeIcon className='text-white h-5 w-6 mr-5' icon={faUser}/> </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-10">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/testCluster')}>Tests</DropdownMenuItem>
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
