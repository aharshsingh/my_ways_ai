import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
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


export default function AttemptedUsersDialog({isOpen,setIsOpen,testname,marksBreakup,testId}) {
    const [users, setUsers] = useState([]);
    const [isLoading,setIsLoading]=useState(true);
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
  //Logic to get no of uswers attepmpted test i will comapre each test id wiht the array of tests attemtpted and then for each will increment the number of users attempted by 1
  try {
    const response1 = await axios.get(`https://intervu-ai-beige.vercel.app/api/admin/getResult/${testId}`, {
      // const response1 = await axios.get(`http://localhost:3000/api/admin/getResult/${testId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response1.data);
    setUsers(response1.data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchUsers();
},[]);
  return (
 <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] w-[100%] sm:max-w-7xl ">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border text-2xl text-center px-6 py-4 text-[#606dd3]">
          Users who attempted for {testname}
          </DialogTitle>
          <div className="overflow-y-auto w-full ">
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
         <div className="mx-auto  my-2 z-30 overflow-auto w-[100%]  max-w-7xl rounded border" >
         <div className="flex flex-wrap items-center justify-between gap-4  p-4 md:py-2" >
           <Input
             placeholder="Search User..."
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
                 Username
                 {sortColumn === "testName" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
                 onClick={() => handleSort("keyWord")}
               >
                 User Email
                 {sortColumn === "keyWord" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
                 onClick={() => handleSort("createdAt")}
               >
                Started at
                 {sortColumn === "createdAt" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
                 onClick={() => handleSort("createdAt")}
               >
                Completed at
                 {sortColumn === "createdAt" && (
                   <span className="ml-1">
                     {sortDirection === "asc" ? "\u2191" : "\u2193"}
                   </span>
                 )}
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
               Accuracy({marksBreakup.accuracy})
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
               Completeness({marksBreakup.completeness})
               </TableHead>
               <TableHead
                 className="cursor-pointer"
               >
                 Explaination({marksBreakup.explaination})
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
               >
                Practical Relevance({marksBreakup.practicalRelevance})
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
               >
            Conciseness({marksBreakup.consiceness})
               </TableHead>
               <TableHead
                 className="cursor-pointer text-nowrap"
               >
                Total ({marksBreakup.total})
               </TableHead>
              
             </TableRow>
           </TableHeader>
           <TableBody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.startedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(user.completedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{user.accuracy}</TableCell>
                  <TableCell>{user.completeness}</TableCell>
                  <TableCell>{user.explanation}</TableCell>
                  <TableCell>{user.practicalRelevance}</TableCell>
                  <TableCell>{user.conciseness}</TableCell>
                  <TableCell>{user.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-6 text-lg">
                  No user attempted this test.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
         </Table>
       </div>}
          
            <DialogFooter className="px-6 pb-6 sm:justify-end mr-9">
              <DialogClose asChild>
                <Button className="bg-[#5862b2]" type="button">Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

