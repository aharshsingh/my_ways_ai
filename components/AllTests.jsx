"use client"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
// import { useState } from "react"
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
// import { useState, useMemo } from "react";
import MarksBreakupDialog from './marksBreakupDialog/MarksBreakupDialog';
import AlertDialogBox from './alertDialog/AlertDialog';
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

export default function AllTests() {
    const [tests, setTests] = useState([]);
    const [userAttemptedTests, setUserAttemptedTests] = useState([]);
    const [userTests, setuserTests] = useState([]);
    const [delTestId,setDelTestId]=useState();
    const [isLoading,setIsLoading]=useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
    const [isOpen, setIsOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
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

  
const handleDelete=(testId)=>{
  setDelTestId(testId);
  setIsAlertOpen(true)
}

const handlePublishTest=async(testId)=>{
  try {
    const response = await axios.patch(`http://localhost:3000/api/admin/publishTest/${testId}`)
    if(response.status === 200)
    {
      toast.success("Test Published")
      fetchTests();
      return
    }
  } catch (error) {
      toast.error("Couldn't Publsih test! Try again")
      return
  }
}


const fetchTests = async (token) => {
  try {
    const response1 = await axios.get("http://localhost:3000/api/test", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTests(response1.data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  const token = localStorage.getItem("authToken");
    if (!token) return;
  fetchTests(token);

  const fetchAttemptedTests = async () => {
    try {
      const response2 = await axios.patch("http://localhost:3000/api/user",{
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserAttemptedTests(response2.data.attemptedTest);
    } catch (err) {
      console.log(err);
    }
  };

  fetchAttemptedTests();

},[]);
  return (
    <div className='flex flex-col h-screen items-center '>
      <div className='flex items-center justify-between p-4 w-full h-12 mt-2'>
        <h1 className='text-4xl font-bold'>Admin Portal</h1>
     <img
          src="/appLogo3.png" 
          alt="Logo"
          className="h-14 w-auto overflow-hidden"
        /> 
     </div>
    <Toaster richColors position="top-center" />
     <div className=' w-full h-full flex flex-col items-center justify-center'>
     {isLoading ? (<div className="mx-auto my-2 w-full z-20 max-w-6xl rounded border">
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
         <div className="mx-auto  my-2 z-30 overflow-auto w-[100%]  max-w-6xl rounded border-2" >
         <div className="flex flex-wrap items-center justify-between gap-4  p-4 md:py-2" >
           <h1 className="text-xl  font-bold">All Tests</h1>
           <Input
             placeholder="Search tests..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="md:w-96  border-2 " 
           />
         </div>
         <Table>
           <TableHeader>
           <TableRow>
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
                 Max Score
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
                 Published on
                 {sortColumn === "createdAt" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead   className="cursor-pointer"
                 onClick={() => handleSort("status")}>
                 Status  {sortColumn === "status" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
                 </TableHead>
                 <TableHead>Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {sortedTests.map((test) => (
                 <TableRow key={test.id || test.testName}>
                 <TableCell className="font-medium">{test.testName}</TableCell>
                 <TableCell className="flex flex-wrap gap-1">
                   {test.keyWord.map((keyword, index) => (
                     <Badge variant="outline" key={index}>
                       {keyword}
                     </Badge>
                   ))}
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
                 <TableCell  className="cursor-pointer" onClick={()=>
                  {
                    setMarksBreakup({
                      accuracy:test.accuracy,
                      completeness:test.completeness,
                      explaination:test.explanation,
                      practicalRelevance:test.practicalRelevance,
                      consiceness:test.conciseness,
                      total:test.score});
                      setIsOpen(true); 
                  } 
                  }>{test.score}</TableCell>
                 <TableCell>{test.score}</TableCell>
                 <TableCell>
                   {new Date(test.createdAt).toLocaleDateString("en-GB", {
                       day: "2-digit",
                       month: "2-digit",
                       year: "numeric",
                     })}

                 </TableCell>
                 <TableCell className="flex gap-1 items-center justify-center">
                 <Badge variant="outline" onClick={!test.isPublished ? ()=>handlePublishTest(test._id) : undefined } className={test.isPublished  ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800 cursor-pointer text-nowrap"}>
                 {test.isPublished ? "Publsihed" : "Publsih"}
                 </Badge>
                 </TableCell>
                 <TableCell className="gap-2">
                     <Button variant="ghost" size="icon">
                       <Trash2 onClick={() => handleDelete(test._id)} className="size-3.5" />
                     </Button>
                  </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
         {isAlertOpen && <AlertDialogBox fetchTests={fetchTests} testId={delTestId} isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />}
          {isOpen && <MarksBreakupDialog isOpen={isOpen} setIsOpen={setIsOpen} marksBreakup={marksBreakup} /> }
       </div>}
       </div>
       </div>
  )
}
