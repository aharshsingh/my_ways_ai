"use client";

import React, { useState, useEffect, useRef } from 'react';
import questions from './questions';

export default function Test() {
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isAnswering, setIsAnswering] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const totalQuestions = questions.length;

    useEffect(() => {
        if (isAudioPlaying) {
            const audio = new Audio(currentQuestion.audioSrc);
            audio.play();
            audio.onended = () => {
                setIsAudioPlaying(false); // Stop audio playing
                setIsAnswering(true); // Start answering phase after audio ends
            };
        }
    }, [isAudioPlaying, currentQuestionIndex]);

    useEffect(() => {
        if (isAnswering && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
            });
        }
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, [isAnswering]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setIsAudioPlaying(true); // Reset audio playing state
            setIsAnswering(false); // Reset answering phase
        } else {
            // Finish the test
            alert("Test Completed!");
        }
    };

    return (
        <div className="bg-black h-screen flex items-center justify-center">
            {/* When the question is being asked and the audio is playing */}
            {!isAnswering && (
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        {/* Display animation video while audio plays */}
                        <video
                            className="w-1/3 h-1/3 object-cover"
                            src="/Animation.mp4"
                            loop
                            autoPlay
                            muted
                            playsInline
                        ></video>
                    </div>
                    <div className="text-white mb-6">
                        <h2 className="text-2xl font-bold mb-4">Question: {currentQuestionIndex + 1}/{totalQuestions}</h2>
                        <p className="text-lg">{currentQuestion.text}</p>
                    </div>
                </div>
            )}
            
            {/* Once the audio finishes and we are answering */}
            {isAnswering && (
               <div className="answer-section flex flex-col items-center mb-6">
               {/* Display user camera feed */}
               <h2 className="center text-2xl text-white font-bold mb-4">{currentQuestionIndex + 1}/{totalQuestions}</h2>
               <div className="text-white text-xl font-bold mb-4">
                 {currentQuestion.text}
               </div>
               <video
                 ref={videoRef}
                 autoPlay
                 playsInline
                 muted
                 className="w-2/4 h-2/3 border-2 border-gray-400 rounded-3xl mb-4"
               />
               {/* Display the question text above the camera video */}
               <div className="grid place-items-center mt-6">
                     
                     <button
                         onClick={handleNextQuestion}
                         className="ml-5.5 mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                         Next Question
                     </button>
                 </div>
             </div>
            )}
        </div>
    );
}
