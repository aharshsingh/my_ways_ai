import { useEffect, useRef, useState } from "react";
export default function TestPage() {
      const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);

useEffect( {
    const showVideo =async()=>{
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    }
},[])

const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.start();

      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    };
    
  
  const handleSubmitAnswer = async () => {
    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'test_audio.webm');

      try {
        const response = await fetch('http://localhost:5000/upload-audio', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log('Audio uploaded:', result);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    };

    setIsRecording(false);
  };

  return (
    <div>
      
    </div>
  )
}
