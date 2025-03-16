"use client"
import React, { useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
// import { useState } from "react"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
// import { useState, useMemo } from "react";
// import { Pencil, Trash2 } from "lucide-react";
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
import { Pencil, Trash2, Underline } from "lucide-react"
import { useMemo, useState } from "react"


export default function TestCluster() {
    const [tests, setTests] = useState([]);
    const[isLoading,setIsLoading]=useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
  
  const [bookmarks] = useState([
    {
      id: 1,
      title: "Vercel",
      tags: ["web", "deployment"],
      description: "Vercel is a cloud platform for static sites and serverless functions.",
      MaxScore: "30",
      Duration: "20 min",
      createdAt: "2023-05-01",
      status: "completed"
    },
    {
      id: 2,
      title: "Tailwind CSS",
      tags: ["css", "framework"],
      description: "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.",
      MaxScore: "30",
      Duration: "10 min",
      createdAt: "2023-04-15",
      status: "completed"
    },
    {
      id: 3,
      title: "React",
      tags: ["javascript", "library"],
      description: "React is a JavaScript library for building user interfaces.",
      MaxScore: "30",
      Duration: "20 min",
      createdAt: "2023-03-20",
      status: "Not Attempted"
    },
    {
      id: 4,
      title: "Next.js",
      tags: ["react", "framework"],
      description: "Next.js is a React framework that enables server-side rendering and more.",
      MaxScore: "20",
      Duration: "10 min",
      createdAt: "2023-02-10",
      status: "Not Attempted"
    },
    {
      id: 5,
      title: "Prisma",
      tags: ["database", "orm"],
      description: "Prisma is an open-source database toolkit that includes an ORM.",
      MaxScore: "50",
      Duration: "10 min",
      createdAt: "2023-01-01",
      status: "Not Attempted"
    },
  ]);



  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bookmark) =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bookmarks, searchTerm]);

  const sortedBookmarks = useMemo(() => {
    return [...filteredBookmarks].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredBookmarks, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
};

  
    useEffect(() => {
      const fetchTests = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;
          try {
              const response = await axios.get("http://localhost:3000/api/test",{
                headers: { Authorization: `Bearer ${token}` },
              });
              setTests(response.data);
              setIsLoading(false);
          } catch (err) {
              // setError("Failed to load tests");
              console.log(err);
          } 
      };
      const userId=localStorage.getItem("userId");
  }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      }, []);
        
  return (
<>
    {isLoading ? (<div className="mx-auto my-16 w-full max-w-6xl rounded border">
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
    <div className="mx-auto my-16 w-full max-w-6xl rounded border">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 md:py-2">
      <h1 className="text-xl font-bold">Test Cluster</h1>
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
            onClick={() => handleSort("title")}
          >
            Test Name
            {sortColumn === "title" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "\u2191" : "\u2193"}
              </span>
            )}
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("tags")}
          >
            Topics
            {sortColumn === "tags" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "\u2191" : "\u2193"}
              </span>
            )}
          </TableHead>
          <TableHead
            className="cursor-pointer"
          >
            Duration
            {sortColumn === "createdAt" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "\u2191" : "\u2193"}
              </span>
            )}
          </TableHead>
          <TableHead
            className="cursor-pointer"
          >
            Max Score
            {sortColumn === "createdAt" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "\u2191" : "\u2193"}
              </span>
            )}
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("createdAt")}
          >
            Created
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedBookmarks.map((bookmark) => (
          <TableRow key={bookmark.id}>
            <TableCell className="font-medium">{bookmark.title}</TableCell>
            <TableCell className="flex flex-wrap gap-1">
              {bookmark.tags.map((tag, index) => (
                <Badge variant="outline" key={index}>
                  {tag}
                </Badge>
              ))}
            </TableCell>
            {/* <TableCell>{bookmark.description}</TableCell> */}
            <TableCell>{bookmark.Duration}</TableCell>
            <TableCell>{bookmark.MaxScore}</TableCell>
            <TableCell>{bookmark.createdAt}</TableCell>
            <TableCell className="flex gap-1">
            <Badge variant="outline" className={bookmark.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {bookmark.status}
                </Badge>
            </TableCell>
            <TableCell className="hover:underline cursor-pointer">  
              Take Test <FontAwesomeIcon icon={faArrowRight} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>}
</>
   )
 }
   {/* <div className='w-full flex items-center justify-center '> */}
   {/*{isLoading ?  (<div className='h-screen w-full flex justify-start'>
        <div className='h-[70%] m w-full grid grid-cols-4 place-items-center'>
         {tests.map((test)=>(
          <div key={test.testId} className="flex flex-col space-y-3">
           <Skeleton className="h-[125px] w-[250px] rounded-xl" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
           </div>
         </div>))}
        </div>
    </div>)
    :( <div className='h-screen w-full flex items-center justify-center'>
      <div className='h-full mt-[20%]  w-[95%] grid grid-cols-4 place-item-center'>
        {tests.map((test)=>(
           <div key={test.testId} className="bg-white h-[150px] w-[250px]  flex flex-col items-center space-y-3 p-4 border rounded-xl shadow-lg hover:border-black">
           <div className='text-black h-auto w-full  flex flex-col  items-start gap-y-1'>
              <p className='first:self-center text-[1.25rem] leading-tight md:text-[1.5rem]'>{test.testName} </p>       
              <hr className='w-full' />
              <p>No of questions: {test.numOfQuestions}</p>
              <p>Duration: {test.duration} min</p>
              <p>Score: {test.score}</p>
           </div>
          </div>
        ))}
           
      </div>
   </div>)
  
  }   
   </div> */}

