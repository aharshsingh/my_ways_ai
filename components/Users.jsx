"use client"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import AttemptedUsersDialog from './attemptedUsersDialog/AttemptedUsersDialog';
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemo, useState } from "react"

export default function Users() {
        const[users,setUsers]=useState([]);
        const [isLoading,setIsLoading]=useState(true);
        const [isOpen, setIsOpen] = useState(false);
        const [searchTerm, setSearchTerm] = useState("");
        const [sortColumn, setSortColumn] = useState("title");
        const [sortDirection, setSortDirection] = useState("asc");
      const filteredUsers = useMemo(() => {
        return users.filter((user) => 
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
       },[users, searchTerm]);
      const sortedUsers = useMemo(() => {
        return [...filteredUsers].sort((a, b) => {
          if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
          if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }, [filteredUsers, sortColumn, sortDirection]);
    
    
      const handleSort = (column) => {
        if (sortColumn === column) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortDirection("asc");
        }
    };
    
    const fetchUsers = async (token) => {
      try {
        // const response1 = await axios.get("https://intervu-ai-beige.vercel.app/api/test", {
          const response = await axios.get("http://localhost:3000/api/admin/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data);
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      fetchUsers();
    },[]);
  return (
    <div className='flex flex-col h-screen items-center '>
      <div className='flex items-center justify-between p-4 w-full h-12 mt-2'>
        <h1 className='text-3xl text-[#5862b2] font-bold'>Admin Portal</h1>
        <h1 className="text-3xl  font-bold text-[#5862b2]">All Users</h1>
     <img
          src="/intervuLogo2.png" 
          alt="Logo"
          className="h-8 w-auto overflow-hidden"
        /> 
     </div>
    <Toaster richColors position="top-center" />
     <div className=' w-full h-full flex flex-col items-center mt-2 '>
     {isLoading ? (<div className="mx-auto my-2 z-20 w-[95%]   max-w-8xl  rounded border">
           <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
             <Skeleton className="h-6 w-40" /> {/* Test Cluster Title */}
             <Skeleton className="h-10 w-96" /> {/* Search Input */}
           </div>
     
           <div className="w-full">
             {/* Table Header Skeleton */}
             <div className="grid grid-cols-7 gap-5 border-b p-4">
               {Array(9).fill("").map((_, index) => (
                 <Skeleton key={index} className="h-6 w-24" />
               ))}
             </div>
     
             {/* Table Rows Skeleton */}
             <div className="space-y-4 p-4">
               {Array(5).fill("").map((_, rowIndex) => (
                 <div key={rowIndex} className="grid grid-cols-7 gap-2">
                   {Array(7).fill("").map((_, colIndex) => (
                     <Skeleton key={colIndex} className="h-6 w-24" />
                   ))}
                 </div>
               ))}
             </div>
           </div>
         </div>) :
         <div className="mx-auto  my-2 z-30 overflow-auto w-[95%]   max-w-8xl rounded border" >
         <div className="flex flex-wrap items-center justify-between p-4 md:py-2" >
          
           <h1 className="text-lg  font-semibold text-[#5862b2]">{"Click on the Test to get Details"}</h1>
           <Input
             placeholder="Search Users..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="md:w-96  border-2 " 
           />
         </div>
         <Table>
           <TableHeader>
           <TableRow >
               <TableHead
                 className="cursor-pointer "
                 onClick={() => handleSort("testName")}
               >
                 Username
                 {sortColumn === "testName" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer"
                 onClick={() => handleSort("keyWord")}
               >
                 Email
                 {sortColumn === "keyWord" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
                 Tests Attempted
               </TableHead>
          
               <TableHead
                 className="cursor-pointer text-nowrap"
                 onClick={() => handleSort("createdAt")}
               >
                 Singned up on
                 {sortColumn === "createdAt" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
                 Actions
               </TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {sortedUsers.map((user) => (
                 <TableRow key={user._id} className="cursor-pointer">
                 <TableCell className="font-medium">{user.userName}</TableCell>
                 <TableCell className="flex flex-wrap">
                     {user.email}
                  </TableCell>
                 <TableCell > {10}</TableCell>
                 <TableCell>{user.totalTest}</TableCell>
                 <TableCell>
                   {new Date(user.createdAt).toLocaleDateString("en-GB", {
                       day: "2-digit",
                       month: "2-digit",
                       year: "numeric",
                     })}

                 </TableCell>
                 <TableCell className="gap-2">
                     <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)}>
                       <Trash2  className="size-3.5" />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)}>
                       <Trash2  className="size-3.5" />
                     </Button>
                  </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
          {/* {isOpen && <AttemptedUsersDialog  isOpen={isOpen} setIsOpen={setIsOpen} testname={testName} marksBreakup={marksBreakup} /> } */}
       </div>}
       </div>
       </div>
  )
}
