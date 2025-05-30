"use client"
import React, { useEffect,useState } from 'react';
import { ProjectStatusCard } from "@/components/ui/expandable-card";
import RouteAuthCheck from '@/lib/routeAuthCheck';
import axios from "axios";
import { AvatarPicker } from "@/components/ui/avatar-picker"
export default function ProfilePage() {
const [attemptedTestId, setAttemptedTestId] =useState([]);
const[userInfo,setUserInfo]=useState({});

useEffect(() => {
  const userInfoData = JSON.parse(localStorage.getItem('user'));
  setUserInfo(userInfoData);

  const attemptedTests = userInfoData?.attemptedTest || [];
  const attemptedTestIds = attemptedTests.map(item => item._id);
  setAttemptedTestId(attemptedTestIds);
}, []);

useEffect(() => {
  if (attemptedTestId.length > 0) {
    getResult();
  }
}, [attemptedTestId]);


    // const fetchTestRes=async()=>{
    // try {
    //   const res= await axios.post(`http://localhost:3000/api/attemptedTest/`,{
    //     testIdArray:attemptedTestId
    //   }) 
    //   if(res.status===200){
    //     console.log("your data")
    //     console.log(res.data);
    //     getResult();
    //   }
    // } catch (error) {
    //   console.error("Error fetching test results:", error);
    // }
    // }
    
    const getResult = async()=>{
      console.log("get result called")
      console.log(attemptedTestId);
      console.log(localStorage.getItem('userId'));
        try {
          const res=await axios.post('http://localhost:3000/api/attemptedTest/', {
            testIdArray: attemptedTestId,
            userId:localStorage.getItem('userId')
          });
          if(res.status===200){
            console.log("your data")
            console.log(res.data);
          }
        } catch (error) {
          console.error("Error fetching test results:", error);
        }
    }

  return (
    <RouteAuthCheck userRole="user">
    <div className='w-full h-[100vh] pt-20 flex bg-white'>
      <div className='w-[30%] h-[100%] flex flex-col items-center bg-black-200'>
        <div className='w-[70%] h-[75%] items-center flex flex-col gap-4'>  
              <AvatarPicker username={userInfo.userName} email={userInfo.email}/>
        </div>
      </div>
      <div className='w-[70%] bg-white'>
        <div  className="grid gap-4 grid-cols-1 md:grid-cols-2">

        <div>
        <ProjectStatusCard
        title="FRONTEND Intern"
        progress={75}
        dueDate="May 31, 2025"
        tasks={[
          { title: "Fluency", completed: true,score :45 },
          { title: "Accuracy", completed: true,score:40 },
          { title: "Completeness", completed: true, score:60  },
          { title: "Practical Relevance", completed: true, score:50  },
          { title: "Explaination", completed: true, score:70 }
        ]}
        bestScore={75}
        timesAttempted={1}
        lastAttempted={15}
      />
      
      </div>
      <div>
      <ProjectStatusCard
        title="Frontend Intern"
        // progress={100}
        // dueDate="Dec 31, 2023"
        // tasks={[
        //   { title: "Fluency", completed: true,score :10  },
        //   { title: "Accuracy", completed: true,score:10 },
        //   { title: "Completeness", completed: true, score:10  },
        //   { title: "Practical Relevance", completed: true, score:10  },
        //   { title: "Explaination", completed: true, score:10 }
        // ]}
        // bestScore={50}
        // timesAttempted={0}
      />
      </div>
    </div>
      </div>
    </div>
    </RouteAuthCheck>
  )
}
