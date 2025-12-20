import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({trip}) {
  return (
    <div>
        <img src='/placeholder2.jpg' className='h-[340px] w-full object-cover rounded-xl'/>
       <div className='flex justify-between items-center'> 
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>
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