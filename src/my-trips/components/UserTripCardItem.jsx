import React from 'react'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
  const[photoUrl, setPhotoUrl]=useState();
  
  useEffect(()=>{trip&&GetPlacePhoto()},[trip]);

  const GetPlacePhoto = async () => {
    try {
      const location = trip?.userSelection?.location?.label;
  
      const queries = [
        `${location} old town`,
        `${location} panorama`,
        `${location} landmark`
      ];
  
      for (const q of queries) {
        const result = await GetPlaceDetails({ textQuery: q });
        const photoName = result?.data?.places?.[0]?.photos?.[0]?.name;
  
        if (photoName) {
          setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoName));
          break;
        }
      }
    } catch {
      console.log("No image found");
    }
  }; 
  
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all my-6 mx-4'>
        <img src={photoUrl? photoUrl: '/placeholder2.jpg'} className='object-cover rounded-2xl w-full h-[180px]'/>
        <div>
            <h2 className='font-bold text-cardT'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-cardD text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem