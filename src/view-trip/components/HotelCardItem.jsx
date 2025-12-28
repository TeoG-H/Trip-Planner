import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';


function HotelCardItem({hotel}) {

    const[photoUrl, setPhotoUrl]=useState();
    
    useEffect(()=>{hotel&&GetPlacePhoto()},[hotel])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:hotel?.hotelName
        }
        const result=await GetPlaceDetails(data);
        console.log(result.data.places[0].photos[1].name);
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[1].name );
        console.log(PhotoUrl);
        setPhotoUrl(PhotoUrl);
    
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel?.hotelAddress} target='_blank'>
        <div className='hover:scale-110 transition-all cursor-pointer'>
            <img src={photoUrl?photoUrl:'/placeholder2.jpg'} className='h-[340px] w-full object-cover rounded-xl'/>
            <div className='my-3'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500 '> 📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>{hotel?.price}</h2>
                <h2 className='text-sm'> ⭐ {hotel?.rating}</h2>
            </div>
        
        </div>
    </Link>
  )
}

export default HotelCardItem