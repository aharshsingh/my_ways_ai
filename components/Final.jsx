"use client";
import Link from 'next/link'; 

export default function Final() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[rgb(22,29,41)]">
        
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
         
          <image
            src="/tickMark.png" 
            alt="Submission Successful"
            className="w-24 h-24 mx-auto mb-4"
          />
      
          <h1 className="text-xl font-semibold text-gray-800">
            Your submission has been received!
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for completing the test. You will hear from us soon.
          </p>
         
          <Link href="/" className="mt-6 inline-block px-6 py-2 bg-[rgb(22,29,41)] text-white rounded-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
