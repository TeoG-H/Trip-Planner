import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center mx-4 md:mx-12 lg:mx-32 gap-3 text-center">
      <h1 className="font-extrabold text-[30px]">
        Make your next vacation unforgettable with{" "}
        <span className="text-[#48cae4]">Trip-Planner</span>
      </h1>

      <p className="text-base text-gray-600 max-w-xl">
        Your personal planner creates travel itineraries based on your preferences
      </p>

      <Link to="/create-trip">
        <Button
          className="relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white 
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
  )
}
export default Hero