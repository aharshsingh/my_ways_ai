"use client"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
// import { useState } from "react"
import axios from "axios";
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
    const [isLoading,setIsLoading]=useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
    const [isOpen, setIsOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [marksBreakup, setMarksBreakup] = useState({});
    
  const filteredTests = useMemo(() => {
    return tests.filter((test) =>
      test.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tests, searchTerm]);

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

  
useEffect(() => {
  const token = localStorage.getItem("authToken");
    if (!token) return;
  const fetchTests = async () => {
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
  fetchTests();


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

  // const usersTests=userAttemptedTests.filter((test)=>{tests.})

}, []);
      const tags = [
        {
          name: "React",
          bookmarks: 1234,
          description: "A JavaScript library for building user interfaces",
          relatedTags: ["JavaScript", "Frontend", "UI"],
        },
        {
          name: "Node.js",
          bookmarks: 2345,
          description:
            "A JavaScript runtime built on Chrome's V8 JavaScript engine",
          relatedTags: ["JavaScript", "Backend", "Server"],
        },
        {
          name: "Python",
          bookmarks: 3456,
          description:
            "A high-level programming language known for its readability and versatility",
          relatedTags: ["Programming", "Data Science", "Machine Learning"],
        },
        {
          name: "Vue.js",
          bookmarks: 1567,
          description:
            "A progressive JavaScript framework for building user interfaces",
          relatedTags: ["JavaScript", "Frontend", "UI"],
        },
        {
          name: "Ruby on Rails",
          bookmarks: 2678,
          description: "A server-side web application framework written in Ruby",
          relatedTags: ["Ruby", "Backend", "Web Development"],
        },
        {
          name: "Angular",
          bookmarks: 3789,
          description:
            "A TypeScript-based web application framework for building single-page applications",
          relatedTags: ["TypeScript", "Frontend", "SPA"],
        },
      ]
      
      
  return (
    <div className='flex flex-col h-screen items-center bg-black '>
      <div className='flex items-center justify-center overflow-hidden w-full h-[8%]'>
     <img
            src="/appLogo3.png" 
            alt="Logo"
            className="h-14 w-auto overflow-hidden"
          /> 
     </div>
     <div className=' w-full h-full flex flex-col items-center justify-center'>
     {isLoading ? (<div className="mx-auto my-2 bg-white w-full z-20 max-w-6xl rounded border">
           <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
             <Skeleton className="h-6 w-40" /> {/* Test Cluster Title */}
             <Skeleton className="h-10 w-96" /> {/* Search Input */}
           </div>
     
           <div className="w-full">
             {/* Table Header Skeleton */}
             <div className="grid grid-cols-7 gap-2 border-b p-4">
               {Array(7).fill("").map((_, index) => (
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
         <div className="mx-auto my-2 z-30 overflow-auto w-[90%] bg-white max-w-6xl rounded border">
         <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
           <h1 className="text-xl font-bold">All Tests</h1>
           <Input
             placeholder="Search tests..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="md:w-96"
           />
         </div>
         <Table>
           <TableHeader>
           <TableRow>
               <TableHead
                 className="cursor-pointer"
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
                 className="cursor-pointer"
               >
                 Max Score
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
                 Users Attempted
               </TableHead>
               <TableHead
                 className="cursor-pointer"
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
                 <Badge variant="outline" className={userAttemptedTests.includes(test.id)  ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800 cursor-pointer "}>
                 {userAttemptedTests.includes(test.id) ? "Publsihed" : "Publsih"}
                     </Badge>
                 </TableCell>
                 <TableCell className="gap-2">
                     <Button variant="ghost" size="icon">
                       <Trash2 onClick={() => setIsAlertOpen(true)} className="size-3.5" />
                     </Button>
                  </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
         {isAlertOpen && <AlertDialogBox isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />}
          {isOpen && <MarksBreakupDialog isOpen={isOpen} setIsOpen={setIsOpen} marksBreakup={marksBreakup} /> }
       </div>}
       </div>
       </div>
  )
}
