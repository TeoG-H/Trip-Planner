import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';



function PlaceCardItem({place}) {

     const[photoUrl, setPhotoUrl]=useState();
          
              useEffect(()=>{place&&GetPlacePhoto()},[place])
              {/*aici pot sa adau mai multe inf ca sa obtin un rasp mai bun*/}
              const GetPlacePhoto = async () => {
  try {
    const base = place.placeName;

    const queries = [
      `${base} landmark`,
      `${base} tourist attraction`,
      `${base} panorama`,
      `${base} historic site`,
      base,
    ];

    for (const q of queries) {
      const result = await GetPlaceDetails({ textQuery: q });
      const photos = result?.data?.places?.[0]?.photos;
      const photoName = photos?.[1]?.name || photos?.[0]?.name;

      if (photoName) {
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoName));
        break;
      }
    }
  } catch {
    console.log("No photo found for place:", place.placeName);
  }
};

  
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
    
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:'/placeholder2.jpg' /*daca are poza o pune daca nu o inlocuieste*/} className=' w-[130px] h-[130px] rounded '/>
        <div className='object-cover'>
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