import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div>
      <div className='h-16
       p-3 shadow-sm flex justify-between items-center px-5'>
              <img src='/logo3.svg' className="h-8 w-auto" />
              
      </div>
    
    <div className=" flex flex-col justify-end items-center min-h-[calc(100vh-4rem)] pb-32 mx-4 md:mx-12 lg:mx-32 gap-3 text-center">
      <h1 className=" font-extrabold text-[clamp(1.4rem,3vw,2.2rem)]">
        Make your next vacation unforgettable with{" "}
        <span className=" inline-block bg-gradient-to-r
      from-[#2aa7c9]
    via-[#5fd3e6]
    to-[#2aa7c9]
      bg-[length:200%_100%]
      bg-clip-text
      text-transparent
      animate-[text-shine_6s_ease-in-out_infinite] ">Trip-Planner</span>
        
      </h1>

      {/*<p className="text-base text-gray-600 max-w-xl">
        Your personal planner creates travel itineraries based on your preferences
      </p>*/}

      <Link to="/create-trip">
        <Button
          className="relative overflow-hidden mt-10 px-20 py-6 rounded-xl font-semibold text-white 
                     bg-[url('/fundal-apa.png')] bg-cover bg-center
                     transition-all duration-300
                     hover:scale-105 active:scale-95
                     shadow-lg group"
        >
          <span className="relative z-10">Get Started</span>
          <span
            className="absolute inset-0 bg-white/20 translate-x-[-100%] 
                       group-hover:translate-x-[100%] 
                       transition-transform duration-700 skew-x-12"
          />
        </Button>
      </Link>
    </div>
    </div>
    
  )
}
export default Hero