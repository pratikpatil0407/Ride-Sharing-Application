import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  // Emit socket join only when captain is available
  useEffect(() => {
    if (socket && captain?._id) {
      socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
      })

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {

            console.log({userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }});
            

            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          })
        }
      }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()

      // return () => clearInterval(locationInterval)
    }
  })

  socket.on('new-ride',(data)=>{
    console.log(data);
    setRide(data)
    setRidePopUpPanel(true)
    
  })

  async function confirmRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId: ride._id,
      captainId: captain._id,
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
  }

  // Animate RidePopUp panel
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  // Animate ConfirmRidePopUp panel
  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className='h-screen'>
      <div>
        <h1 className='absolute ml-5 mt-1 text-2xl text-black font-bold'>Ride Sharing</h1>
        <Link to='/captain-logout' className='fixed h-10 w-10 right-3 top-3 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img
          className='h-full w-screen object-cover'
          src="https://www.rentallscript.com/resources/content/images/2021/10/Create-an-app-like-Uber.png"
          alt="Ride Sharing"
        />
      </div>

      <div className='h=2/5 p-6'>
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className='bg-white w-full translate-y-full fixed z-10 bottom-0 px-3 py-10 pt-12'
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopUpPanelRef}
        className='bg-white w-full h-screen translate-y-full fixed z-10 bottom-0 px-3 py-10 pt-12'
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
