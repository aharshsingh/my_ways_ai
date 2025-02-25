"use client";
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <nav className="bg-neutral-200 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-bold">
            <img
              src="/logo2.png" 
              alt="Logo"
              className="h-10 w-auto"
            />
          </div>
       
          <div>
            <img
              src="/profile.png" 
              alt="Profile"
              className="h-11 w-11 rounded-full border-2 border-black"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
