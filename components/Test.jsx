"use client";
import React, { useState, useEffect, useRef } from "react";
import questions from "./questions";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen"; 

export default function Test() {
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]); 
    const totalQuestions = questions.length;
    const router = useRouter();

    useEffect(() => {
        if (isAudioPlaying) {
            const audio = new Audio(currentQuestion.audioSrc);
            audio.play();
            audio.onended = () => {
                setIsAudioPlaying(false); 
                setIsAnswering(true); 
            };
        }
    }, [isAudioPlaying, currentQuestionIndex]);

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

    const startRecording = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data); 
            }
        };

      
        mediaRecorder.start(1000);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const sendMediaToAPI = async () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" }); 
        const formData = new FormData();
        formData.append("file", blob, "recorded-video.webm");

        try {
            await fetch("https://server-01-w7cr.onrender.com/*", {
                method: "POST",
                body: formData,
            });
            console.log("Media sent successfully!");
        } catch (error) {
            console.error("Error sending media:", error);
        }
    };

    const handleNextQuestion = async () => {
        setIsLoading(true); 
        stopRecording(); 
        // await sendMediaToAPI(); 

        setTimeout(() => {
            setIsLoading(false); 

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
                setIsAudioPlaying(true); 
                setIsAnswering(false); 
                // recordedChunks.current = []; 
            } else {
               
                router.push('/submit');
            }
        }, 1000); 
    };

    if (isLoading) {
        return <LoadingScreen />; 
    }

    return (
        <div className="bg-black h-screen flex items-center justify-center">
           
            {!isAnswering && (
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                    
                        <video
                            className="w-1/3 h-1/3 object-cover -scale-x-100"
                            src="/Animation.mp4"
                            loop
                            autoPlay
                            muted
                            playsInline
                        ></video>
                    </div>
                    <div className="text-white mb-6">
                        <p className="text-lg">{currentQuestion.text}</p>
                    </div>
                </div>
            )}

          
            {isAnswering && (
                <div className="answer-section flex flex-col items-center mb-6">
                    <h2 className="center text-2xl text-white font-bold mb-4">
                        {currentQuestionIndex + 1}/{totalQuestions}
                    </h2>
                    <div className="text-white text-xl font-bold mb-4">
                        {currentQuestion.text}
                    </div>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-3/4 h-3/4 border-2 border-gray-400 rounded-3xl mb-4 -scale-x-100"
                    />
                    <div className="grid place-items-center mt-6">
                        <button
                            onClick={handleNextQuestion}
                            className="ml-5.5 mt-6 px-6 py-2 bg-[#606dd3] text-white rounded hover:bg-[#5862b2"
                        >
                            Save & Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
