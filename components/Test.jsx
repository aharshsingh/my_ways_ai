"use client";
import React, { useState, useEffect, useRef } from "react";
import questions from "./questions";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen"; // Import the loading screen component

export default function Test() {
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]); // Store all recorded chunks
    const totalQuestions = questions.length;
    const router = useRouter();

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
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    streamRef.current = stream;
                    videoRef.current.srcObject = stream;

                    // Start recording the stream
                    startRecording(stream);
                })
                .catch((error) => {
                    console.error("Error accessing media devices: ", error);
                    alert("Please grant access to camera and microphone");
                });
        }

        // Clean up when component unmounts or recording ends
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
        };
    }, [isAnswering]);

    const startRecording = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        // Handle data chunks for both audio and video
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data); // Collect chunks
            }
        };

        // Start recording with a chunk every 1 second
        mediaRecorder.start(1000);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop(); // Stop recording
        }
    };

    const sendMediaToAPI = async () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" }); // Combine all chunks into a single Blob
        const formData = new FormData();
        formData.append("file", blob, "recorded-video.webm"); // Send as one file

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
        setIsLoading(true); // Show loading screen
        stopRecording(); // Stop recording
        await sendMediaToAPI(); // Send media to API

        setTimeout(() => {
            setIsLoading(false); // Hide loading screen after delay

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
                setIsAudioPlaying(true); // Reset audio playing state
                setIsAnswering(false); // Reset answering phase
                recordedChunks.current = []; // Clear recorded chunks for the next question
            } else {
                // Finish the test
                router.push('/submit');
            }
        }, 1000); 
    };

    if (isLoading) {
        return <LoadingScreen />; // Render loading screen
    }

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
                        <p className="text-lg">{currentQuestion.text}</p>
                    </div>
                </div>
            )}

            {/* Once the audio finishes and we are answering */}
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
                        className="w-2/4 h-2/3 border-2 border-gray-400 rounded-3xl mb-4"
                    />
                    <div className="grid place-items-center mt-6">
                        <button
                            onClick={handleNextQuestion}
                            className="ml-5.5 mt-6 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Save & Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
