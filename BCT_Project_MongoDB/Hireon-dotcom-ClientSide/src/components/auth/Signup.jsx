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
import store from '@/store/store'
import { setLoading } from '@/store/authSlice'
import { Loader2 } from 'lucide-react'
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

function Signup() {
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  })
  const {loading} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispath = useDispatch()
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0]
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullName', input.fullName)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password', input.password)
    formData.append('role', input.role)
    if (input.file) {
      formData.append('file', input.file)
    }
    try {
      dispath(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispath(setLoading(false))
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='text-black w-1/2 bg-white p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'> Sign <span className='text-purple-700'> Up </span> </h1>
          <div className='my-2 items-center pl-4 flex border-2 border-slate-400'>
          <FaUser className=" text-black" />
            <Input 
            className='border-transparent rounded-full' 
            type='text' 
            value={input.fullName}
            name='fullName'
            onChange={changeEventHandler}
            placeholder='Name' 
            />
          </div>
          <div className='items-center pl-4 flex my-2 border-2 border-slate-400'>
           
           <FaEnvelope className=" text-black" />
            <Input 
            className=' rounded-full border-transparent' 
            type='email' 
            value={input.email}
            name='email'
            onChange={changeEventHandler}
            placeholder='E-mail' 
            />
          </div>
          <div className='items-center pl-4 flex my-2 border-2 border-slate-400'>
           <FaPhone className=" text-black" />
            <Input 
            className='border-transparent rounded-full' 
            type='number' 
            value={input.phoneNumber}
            name='phoneNumber'
            onChange={changeEventHandler}
            placeholder='Phone' 
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
            <div className='flex items-center gap-2'>
              <Label> Profile </Label>
              <Input 
              accept='image/*' 
              type='file' 
              onChange={changeFileHandler}
              className='cursor-pointer border-none' />
            </div>
          </div>
          {
            loading ? <Button className='bg-purple-700 hover:bg-purple-500 w-full my-4 rounded-full'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type='submit' className='bg-purple-700 hover:bg-purple-500 w-full my-4 rounded-full'> Sign Up </Button>
          }
          <span> Already have an account? <Link to='/login' className='text-sm font-bold text-purple-700 hover:text-purple-500'> Login </Link> </span>
        </form>
      </div>
    </div>
  )
}

export default Signup