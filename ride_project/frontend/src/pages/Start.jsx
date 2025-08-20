import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1585393948915-011d724d4c2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)]   h-screen pt-8 flex justify-between flex-col w-full'>
            <h1 className='ml-5 text-3xl text-white font-bold'>Ride Sharing</h1>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-2xl font-bold'>Getting Started with Ride Sharing</h2>
                <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start