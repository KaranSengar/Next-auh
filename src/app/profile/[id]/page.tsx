"use client"
import React from 'react'

const page = ({params}) => {
  return (
    <div  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1>Profile page details</h1>
        <h2 className='p-3 bg-green-400 rounded text-black'>
{params.id}
        </h2>
    </div>
  )
}

export default page