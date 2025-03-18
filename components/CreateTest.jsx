import React from 'react'
export default function CreateTest() {
  return (
    <div className="flex-grow h-screen  bg-black border-2 border-red-700">
     <div className='flex items-center justify-between w-full h-[8%] border-2 border-green-700'>
     <img
            src="/appLogo3.png" 
            alt="Logo"
            className="h-14 w-auto"
          /> 
        <h1 className='text-white text-3xl mr-7'>New Test</h1>
     </div>
     <div className='flex w-full border-2 h-[92%] border-blue-700'>
      <div className='border-2 w-[35%] border-yellow-500'>

      </div>
      <div className='border-2 w-[65%] border-white-900'>

      </div>
     </div>
    </div>
  )
}
