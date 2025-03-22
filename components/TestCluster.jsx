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
import { useMemo, useState } from "react"


export default function TestCluster() {
    const [tests, setTests] = useState([]);
    const [userAttemptedTests, setUserAttemptedTests] = useState([]);
    const [userTests, setuserTests] = useState([]);
    const[isLoading,setIsLoading]=useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

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
 
  return (
    <div>
    
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
            Duration
            {/* {sortColumn === "createdAt" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "\u2191" : "\u2193"}
              </span>
            )} */}
          </TableHead>
          <TableHead
            className="cursor-pointer"
          >
            Max Score
            {/* {sortColumn === "createdAt" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "\u2191" : "\u2193"}
              </span>
            )} */}
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
          <TableHead></TableHead>
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
            <TableCell>{test.duration}</TableCell>
            <TableCell>{test.score}</TableCell>
            <TableCell>
              {new Date(test.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
            </TableCell>
            <TableCell className="flex gap-1">
            <Badge variant="outline" className={userAttemptedTests.includes(test.id)  ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {userAttemptedTests.includes(test.id) ? "Attempted" : "Not Attempted"}
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
</div>
   )
 }
   
