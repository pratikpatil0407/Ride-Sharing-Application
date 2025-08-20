// import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { UserDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom' 
// import axios from 'axios'

// const UserLogin = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [userData, setUserData] = useState({})

//   const { user, setUser } = useContext(UserDataContext)
//   const navigate = useNavigate()

//   const submitHandler = async (e) => {
//     e.preventDefault();
    
//     const userData = {
//       email: email,
//       password: password
//     }

//     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

//     if(response.status === 200){
//       const data = response.data
//       setUser(data.user)
//       localStorage.setItem('token', data.token)
//       navigate('/user-home') 
//     }
    
//     setEmail('');
//     setPassword('');
//   }

//   return (
//     <div className='p-7 h-screen flex flex-col justify-between'>
//       <div>
//       <h1 className=' mb-10 text-3xl text-black font-bold'>Ride Sharing</h1>
      
//       <form onSubmit={(e) => {
//         submitHandler(e)
//       }}>
        
//         <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        
//         <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
//         required
//         value={email}
//         onChange={(e)=>{
//           setEmail(e.target.value)
//         }}
//         type="email" placeholder='example@email.com' />
        
//         <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        
//         <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
//         required 
//         value={password}
//         onChange={(e)=>{
//           setPassword(e.target.value)
//         }}
//         type="password" placeholder='password' />
//         <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'><Link to='/user-home
        
//         ' className='text-blue-600'>login</Link></button>
//       </form>

//         <p className='text-center'>New here?<Link to='/user-home' className='text-blue-600'> Create new Account</Link></p>
//       </div>

//       <div>
//         <Link
//         to='/captain-login'
//         className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
//       </div>
//     </div>
//   )
// }

// export default UserLogin




import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = { email, password }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if(response.status === 200){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/user-home') // ✅ Corrected from '/Home' to '/user-home'
      }
    } catch (error) {
      console.error("Login failed:", error)
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h1 className='mb-10 text-3xl text-black font-bold'>Ride Sharing</h1>
      
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='example@email.com'
          />
        
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='password'
          />

          {/* ✅ Corrected: Button should submit the form */}
          <button type="submit" className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
            Login
          </button>
        </form>

        {/* ✅ Corrected: Changed `/user-home` to `/user-signup` for new users */}
        <p className='text-center'>
          New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link>
        </p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
