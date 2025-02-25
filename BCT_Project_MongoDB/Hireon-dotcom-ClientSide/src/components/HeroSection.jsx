import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

function HeroSection() {
  return (
    <div className='text-center mt-9'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-7 text-2xl py-5 rounded-full bg-gray-800 text-blue-300 font-medium'> Find your dream workplace </span>
        <p className='text-lg text-white'> Hireon helps you find the most <br /> suitable workplace for you </p>
        <div className='mt-8 flex w-[40%] shadow-lg pl-3 rounded-full items-center mx-auto'>
          <input 
          type='text'
          placeholder='Find workplace'
          className='rounded-l-full outline-none border-none w-full text-white bg-slate-800 py-3 px-4' 
          />
          <Button className='bg-blue-500 hover:bg-blue-600 rounded-r-full py-6'>
            <Search className='h-6 w-6 text-white' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection