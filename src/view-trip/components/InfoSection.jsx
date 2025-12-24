import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({trip}) {
    const[photoUrl, setPhotoUrl]=useState();

    useEffect(()=>{trip&&GetPlacePhoto()},[trip])
    const GetPlacePhoto = async () => {
  try {
    const location = trip?.userSelection?.location?.label;

    const queries = [
      `${location} skyline`,
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
    console.log("No hero image found");
  }
};

  return (
    <div className="relative">
        
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'/>
      
       <div className='flex justify-between items-center'> 
            <div className='my-5 flex flex-col gap-2'>
                <h2 className=' mb-4 font-extrabold text-5xl'>
                    {trip?.userSelection?.location?.label}
                </h2>
                <div className='flex flex-row gap-2'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full'> {trip?.userSelection?.noOfdays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full'> {trip?.userSelection?.budget} budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full'> {trip?.userSelection?.noOfPeople} people</h2>
 
                    

                </div>
            </div>
            <Button>
                <IoIosSend />
            </Button>
        </div>
    </div>
    
  )
}

export default InfoSection