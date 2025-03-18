import Link from 'next/link'
import React from 'react'

const home = () => {
  return (
    <div className='flex gap-3 mt-2 '>

      <Link href="/signup" className='bg-gray-500 px-10 rounded-full '>signup</Link>
      <Link href="/login" className='bg-gray-500 px-10 rounded-full'>Login</Link>
    </div>
  )
}

export default home