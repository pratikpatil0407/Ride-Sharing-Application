import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const CaptainSignup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext);
  
    const submitHandler = async (e)=>{
      e.preventDefault()
      const captainData = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password,
        vehicle:{
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if(response.status === 201){
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        toast.success("Registered Successfully!")
        navigate('/captain-Home')
      }

      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <h1 className=' mb-5 text-3xl text-black font-bold'>Ride Sharing</h1>
      
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>

        <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-2'>
          <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
          required
          value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
          type="text" placeholder='First name' />

          <input className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
          required
          value={lastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }}
          type="text" placeholder='Last name' />
        </div>
        
        <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
        
        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
        required
        value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        type="email" placeholder='email@example.com' />
        
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        
        <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
        required 
        value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        type="password" placeholder='password' />

        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
        <div className='flex gap-4 mb-5'>
          <input 
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            type="text" 
            placeholder='Vehicle Color' 
          />

          <input 
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            type="text" 
            placeholder='Vehicle Plate' 
          />
        </div>

        <div className='flex gap-4 mb-5'>
          <input 
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            type="number" 
            placeholder='Vehicle Capacity' 
          />

          <select 
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </div>

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create account</button>
      </form>

        <p className='text-center mb-3'>Already have account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Term of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup