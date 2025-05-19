"use client"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import AttemptedUsersDialog from './attemptedUsersDialog/AttemptedUsersDialog';
import { Badge } from "@/components/ui/badge"
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

export default function Results() {
    const [tests, setTests] = useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("title");
    const[testName,setTestName]=useState("");
    const[testId,setTestId]=useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [isOpen, setIsOpen] = useState(false);
    const [marksBreakup, setMarksBreakup] = useState({});
  const filteredTests = useMemo(() => {
    return tests.filter((test) => 
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()));
   },[tests, searchTerm]);
  const sortedTests = useMemo(() => {
    return [...filteredTests].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTests, sortColumn, sortDirection]);


  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
};

const fetchTests = async (token) => {
  try {
    // const response1 = await axios.get("https://intervu-ai-beige.vercel.app/api/test", {
      const response1 = await axios.get("http://localhost:3000/api/test", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response1.data);
    setTests(response1.data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchTests();
},[]);
  return (
    <div className='flex flex-col h-screen items-center '>
      <div className='flex items-center justify-between p-4 w-full h-12 mt-2'>
        <h1 className='text-3xl text-[#5862b2] font-bold'>Admin Portal</h1>
        <h1 className="text-3xl  font-semibold text-[#5862b2]">Results</h1>
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
             placeholder="Search tests..."
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
                 Test Name
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
                 Topics
                 {sortColumn === "keyWord" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
                 Difficulty
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
                 Duration
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
               >
                Total Score
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
               >
                 Users Attempted
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
                 onClick={() => handleSort("createdAt")}
               >
                 Created on
                 {sortColumn === "createdAt" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
            {sortedTests.length > 0 ? (sortedTests.map((test) => (
                 <TableRow  key={test._id} onClick={() => {
                  setMarksBreakup({
                    accuracy:test.accuracy,
                    completeness:test.completeness,
                    explaination:test.explanation,
                    practicalRelevance:test.practicalRelevance,
                    consiceness:test.conciseness,
                    total:test.score});
                  setTestName(test.testName);
                  setTestId(test._id);
                  setIsOpen(true);
                }} className="cursor-pointer">
                 <TableCell  className="font-medium">{test.testName}</TableCell>
                 <TableCell className="flex flex-wrap gap-1">
                    {test.keyWord.map((keyword, index) => {
      
                      const colorClass =
                        index % 3 === 0
                          ? "bg-blue-100 text-blue-800"
                          : index % 3 === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800";
                    
                      return (
                        <Badge variant="outline" key={index} className={colorClass}>
                          {keyword}
                        </Badge>
                      );
                    })}
                  </TableCell>
                 {/* <TableCell>{bookmark.description}</TableCell> */}
                 <TableCell >
                    <Badge variant="outline" className={
                    test.difficulty === "hard"
                      ? "bg-red-100 text-red-800"
                      : test.difficulty === "medium"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }> {test.difficulty}</Badge>
                  </TableCell>
                 <TableCell>{test.duration} min</TableCell>
                 <TableCell>{test.score}</TableCell>
                 <TableCell>{test.totalAttempts}</TableCell>
                 <TableCell>
                   {new Date(test.createdAt).toLocaleDateString("en-GB", {
                       day: "2-digit",
                       month: "2-digit",
                       year: "numeric",
                     })}

                 </TableCell>
               </TableRow>
             ))) : (<TableRow>
                             <TableCell colSpan={10} className="text-center py-6 text-lg">
                               No Results Found.
                             </TableCell>
                           </TableRow>)}
             
           </TableBody>
         </Table>
          {isOpen && <AttemptedUsersDialog testId={testId} isOpen={isOpen} setIsOpen={setIsOpen} testname={testName} marksBreakup={marksBreakup} /> }
       </div>}
       </div>
       </div>
  )
}
