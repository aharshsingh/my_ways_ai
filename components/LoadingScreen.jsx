"use client"
export default function LoadingScreen() {
    return (
        <div className="bg-black h-screen flex items-center justify-center">
            <div className="p-6">
  
                <video
                    className="w-64 h-64 object-cover ml-6"
                    src="/loading1.mp4" 
                    loop
                    autoPlay
                    muted
                    playsInline
                ></video>
         
                <div className="text-center text-white mt-4">
                    <p className="text-2xl text-white">Evaluating and Sending answer....</p></div>
        </div>
            </div>
            
    );
}
