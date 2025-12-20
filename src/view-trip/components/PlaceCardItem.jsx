import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
    
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 transition-all hover:shadow-md cursor-pointer'>
        <img src='/placeholder2.jpg' className=' w-[130px] h-[130px] rounded '/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm'>{place.placeDetails}</p>
            <h2 className=' mt-2'>{place.timeToTravel}</h2>
            <Button size="sm" >
                <FaLocationDot />
            </Button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem