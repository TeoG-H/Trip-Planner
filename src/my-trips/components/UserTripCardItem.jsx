import React from 'react'

function UserTripCardItem({trip}) {
  return (
    <div>
        <img src='/placeholder2.jpg' className='object-cover rounded-2xl px-3'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        </div>
    </div>
  )
}

export default UserTripCardItem