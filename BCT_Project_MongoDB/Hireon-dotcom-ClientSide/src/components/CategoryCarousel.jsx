import React from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

const category = [
  'Web Developer',
  'App Developer',
  'ML Developer',
  'AI Developer',
  'Cloud Developer',
  'Cyber Developer',
]

function CategoryCarousel() {
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem className='text-white md:basis-1/2 lg:basis-1/4'>
                <Button className='rounded-full bg-slate-800 hover:bg-slate-900'> {cat} </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className='text-white bg-blue-500 hover:text-white hover:bg-blue-600' />
        <CarouselNext className='text-white bg-blue-500 hover:text-white hover:bg-blue-600' />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel