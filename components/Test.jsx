"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen"; 
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CountdownTimer from "./ui/timerClock";
import Orb from './ui/Orb'; 
import { GemniLoader } from "./ui/gemni-loader";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import dayjs from 'dayjs';
import RouteAuthCheck from "@/lib/routeAuthCheck";
export default function Test() {
    const [currentQuestion, setCurrentQuestion] = useState({ audioURL: "" , text: "" });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const[testData,setTestData]=useState();
    const[userReady,setUserReady]=useState(false);
    const[answerParams,setAnswerParams]=useState({submissionId:"", answerId:""});
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]); 
    const router = useRouter();
    const totalQuestions = testData?.numOfQuestion || 0;
    const duration = testData?.duration || 0;
    const userId=localStorage.getItem("userId");
   
    useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();       // Cancel default refresh
      event.returnValue = "";       // Chrome requires this to show the prompt
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

    useEffect(()=>{
        const testInfo = JSON.parse(localStorage.getItem('test')); 
        setTestData(testInfo)
    },[])
 
    const handleStartInterview=()=>{
        createSubmission();
        fetchQuestion();
    }
        const fetchQuestion = async () => {
        const testId=testData._id;
        const {testDescription, difficulty} = testData;
        console.log(testId, testDescription, difficulty);
        const questionIndex= currentQuestionIndex + 1; 
        try {
            const res = await axios.get(`http://localhost:3000/api/question/${testId}/${testDescription}/${difficulty} `);
            console.log(res);
            setCurrentQuestion({audioURL: res.data.audioURL, text: res.data.audioURL});
            setUserReady(true);
            setIsAudioPlaying(true);
            setIsAnswering(false);
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };
    const createSubmission= async()=>{
        try {
            const formatted = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
            const res=await axios.post(`http://localhost:3000/api/submission`, {
            testId: testData._id,
            userId: userId,
            startedAt: formatted,
        })
        if(res.status===200){
            console.log("Submission created successfully");
            console.log(res);
            setAnswerParams({
                submissionId: res.data._id,
                questionId: ""
            });
        }
        } catch (error) {
            toast.error("Something went wrong! try again");
        }

    }

    const submitTest=async()=>{
        try {
            const formatted = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
            const res=await axios.patch(`http://localhost:3000/api/updateSubmission`, {
                submissionId: answerParams.submissionId,
                userId: userId,
                testId: testData._id,
                completedAt: formatted,
            });
        } catch (error) {
            console.error("Error submitting test:", error);
        }
    }


    
    useEffect(() => {
        if (isAudioPlaying && currentQuestion?.audioURL) {
            const audio = new Audio(currentQuestion.audioURL);
            audio.play();
            audio.onended = () => {
                setIsAudioPlaying(false);
                setIsAnswering(true);
                startRecording(); 
            };
        }
    }, [isAudioPlaying, currentQuestion]);


    useEffect(() => {
        if (isAnswering && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    streamRef.current = stream;
                    videoRef.current.srcObject = stream;  
                    startRecording(stream);
                })
                .catch((error) => {
                    console.error("Error accessing media devices: ", error);
                    alert("Please grant access to camera and microphone");
                });
        }    
    }, [isAnswering]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            recordedChunks.current = [];
        
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
        
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };
        
            mediaRecorder.start();
        } catch (err) {
            console.error("Microphone permission denied:", err);
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const sendAudioToBackend = async () => {
        const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", blob, "response.webm");
        formData.append("questionId", currentQuestion._id); // send meta if needed

        try {
            await axios.post(`http://localhost:3000/api/answer/${testId}/${testDescription}/${difficulty} `,{
                method: "POST",
                body: formData,
            });
            console.log("Audio sent successfully");
        } catch (err) {
            console.error("Failed to send audio:", err);
        }
    };


    const handleNextQuestion = async () => {
        stopRecording();
        mediaRecorderRef.current.onstop = async () => {
            await sendAudioToBackend();
            setCurrentQuestionIndex(prev => prev + 1); 
        };
    };

    if (isLoading) {
        return <LoadingScreen />; 
    }

    return (
        <RouteAuthCheck userRole="user">
            <>
        {userReady ? ( <div className="bg-black h-screen flex flex-col items-center justify-between p-5"> 
          <h1 className="text-white text-4xl">| {testData.testName} |</h1>  
            {!isAnswering && (
                <div className=" flex flex-col items-center justify-center h-full w-full p-5">
                    <div className="flex justify-center items-center  h-[50%] w-[50%]">
                        <Orb
                           hoverIntensity={0.3}
                           rotateOnHover={false}
                           hue={0}
                           forceHoverState={true}
                           className="w-full h-full object-contain -scale-x-100"
                         />
                    </div>
                </div>
            )}

          
            {isAnswering && (
                <div className=" relative w-full h-full flex flex-col items-center justify-between">
                    <div className="absolute right-0 flex justify-between items-center w-[52%] p-2 pr-15">
                    <h2 className="center text-3xl text-white font-bold mb-4">
                        {currentQuestionIndex+1}/<span className="text-[#606dd3]">{totalQuestions}</span>
                    </h2>
                        <CountdownTimer initialMinutes={duration} initialSeconds={0} /> 
                    </div>
                   <div className="w-full h-full flex flex-col items-center justify-between mt-24">
                    <p className="text-white text-xl text-center w-[60%] font-normal">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam modi sunt beatae doloribus tenetur cumque libero cum blanditiis, eos sit totam explicabo iure qui nulla a ducimus mollitia sequi. Culpa?
                        {/* {currentQuestion.text} */}
                    </p>
                    <div className="flex justify-center items-center h-[50%] w-[25%]">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full border-2 border-white-300 rounded-3xl overflow-hidden -scale-x-100"
                    />
                    </div>
                    <div className="h-6 w-64 flex items-center justify-center gap-0.5">
                          {[...Array(48)].map((_, i) => (
                            <div
                              key={i}
                              className=
                                "w-0.5 rounded-full transition-all duration-700 bg-white/50 animate-pulse"                           
                              style={
                                {
                                      height: `${20 + Math.random() * 80}%`,
                                      animationDelay: `${i * 0.05}s`,
                                    }
                              }
                            />
                          ))}
                        </div>
                        <p className="h-4 text-lg text-white/70 ">
                          Listening...
                        </p>
                    <div className="flex justify-between items-center w-[28%] p-5">
                           <Button
                            // onClick={handleNextQuestion}
                            className=" h-full bg-[#606dd3] text-white rounded w-[30%] hover:bg-[#5862b2]"
                        >
                            Finish Test
                        </Button>
                        <Button
                            onClick={handleNextQuestion}
                            className=" h-full bg-[#606dd3] group text-white w-[30%] rounded hover:bg-[#5862b2]"
                        >   Save & Next
                            <ArrowRight
                              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                        </Button>
                    </div>
                   </div>
                 
                </div>
            )}
        </div>) :(
                <GemniLoader handleStartInterview={handleStartInterview} />
    )}
        <Toaster richColors position="top-center" />
        </>
       </RouteAuthCheck>
    );
}
