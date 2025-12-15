import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex justify-center flex-col items-center mx-35 gap-3'>
      <h1 className='font-extrabold text-[30px] text-center mt-10'>
      Make your next vacation unforgettable with <span className='text-[#48cae4]'>Trip-Planner</span></h1>
      <p className=' text-base text-g'> Your personal planner creates travel itineraries based on your preferences </p>
    <Link to={ '/create-trip'}>
      <Button> Get Started </Button>
    </Link>
   
    </div>
   
  )
}

export default Hero