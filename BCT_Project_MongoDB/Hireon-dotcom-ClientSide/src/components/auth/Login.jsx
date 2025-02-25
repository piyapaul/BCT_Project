import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/authSlice'
import store from '@/store/store'
import { Loader2 } from 'lucide-react'
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  })
  const {loading} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='text-black w-1/2 bg-white p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'> Log <span className='text-purple-700'> In </span> </h1>
          <div className='items-center pl-4 flex my-2 border-2 border-slate-400'>
           <FaEnvelope className=" text-black" /> 
            <Input 
            className='border-transparent rounded-full' 
            type='email' 
            value={input.email}
            name='email'
            onChange={changeEventHandler}
            placeholder='E-mail' 
            />
          </div>
          <div className='items-center pl-4 flex my-2 border-2 border-slate-400'>
            <FaLock className=" text-black"/>
            <Input 
            className='border-transparent rounded-full' 
            type='password' 
            value={input.password}
            name='password'
            onChange={changeEventHandler}
            placeholder='Password' 
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className='flex items-center space-x-2'>
              <Input 
                type='radio' 
                name='role' 
                value='student' 
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className='cursor-pointer' 
                />
                <Label htmlFor='r1'> Student </Label>
              </div>
              <div className='flex items-center space-x-2'>
              <Input 
                type='radio' 
                name='role' 
                value='recruiter'
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className='cursor-pointer' 
                />
                <Label htmlFor='r2'> Recruiter </Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className='bg-purple-700 rounded-full hover:bg-purple-500 w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type='submit' className='bg-purple-700 rounded-full hover:bg-purple-500 w-full my-4'> Log In </Button>
          }
          <span> Already have an account? <Link to='/signup' className='text-sm font-bold text-purple-700 hover:text-purple-400'> Signup </Link> </span>
        </form>
      </div>
    </div>
  )
}

export default Login