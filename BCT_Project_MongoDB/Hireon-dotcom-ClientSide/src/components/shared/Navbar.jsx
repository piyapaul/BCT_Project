import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { User2, LogOut } from 'lucide-react'
import logo from '../../assets/hireon.png'

function Navbar() {
  const user = false

  return (
    <div className='bg-slate-700'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-20'>
        {/* <div>
          <h1 className='text-2xl font-bold text-white'> Hire<span className='text-blue-400'>on </span> </h1>
        </div> */}
        <div>
          <img className='w-20' src={logo} alt='Logo' />
        </div>
        <div className='flex items-center gap-10'>
          <ul className='flex font-medium items-center gap-5 text-white'>
            <li> Home </li>
            <li> Jobs </li>
            <li> Browse </li>
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2 text-white'>
                <Link to='/login'> <Button> Login </Button> </Link>
                <Link to='/signup'> <Button className='bg-purple-700 hover:bg-purple-500 rounded-full'> Signup </Button> </Link>   
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_VWfnn-Og-PDMer1tvNSM4U2T_r3zjb5OA&s" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='bg-black border-none text-white'>
                  <div className='flex gap-4 space-y-2'>
                    <Avatar className='cursor-pointer mt-3'>
                      <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_VWfnn-Og-PDMer1tvNSM4U2T_r3zjb5OA&s" alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h3 className='font-medium'> Alyvia Biswas </h3>
                      <p className='text-sm text-gray-400'> Web Developer </p>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='text-white flex items-center'>
                      <User2 className='text-purple-700' />
                      <Button variant='link'> View Profile </Button>
                    </div>
                    <div className='text-white flex items-center'>
                      <LogOut className='text-purple-700' />
                      <Button variant='link'> Logout </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar