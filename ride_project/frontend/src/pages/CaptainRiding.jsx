import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen'>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <h1 className='absolute ml-5 mt-3 text-2xl text-black font-bold'>Ride Sharing</h1>
        <Link to='/captain-home' className='fixed h-10 w-10 right-3 top-3 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <LiveTracking />
      </div>

      <div className='h=1/5 p-6 pt-10 flex items-center justify-between relative bg-yellow-400 ' onClick={() => {
        setFinishRidePanel(true)
      }}>
        <h5 className='p-1 text-center absolute top-0 w-[95%]' onClick={() => {

        }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-fill"></i></h5>

        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button className='bg-green-500 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='bg-white w-full translate-y-full fixed z-10 bottom-0 px-3 py-10 pt-12'>
        <FinishRide 
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}/>
      </div>

    </div>
  )
}

export default CaptainRiding