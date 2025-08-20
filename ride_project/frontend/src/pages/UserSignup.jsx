import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify'

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault()
    const newUser = {
      fullname:{ 
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

    if(response.status === 201){
      const data = response.data

      setUser(data.user) 
      localStorage.setItem('token', data.token)
      toast.success("Registered Successfully!")
      navigate('/user-home')
    }
    
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <h1 className=' mb-10 text-3xl text-black font-bold'>Ride Sharing</h1>
      
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>

        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-4 mb-6'>
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
        
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        
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
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create account</button>
      </form>

        <p className='text-center'>Already have account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Term of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup