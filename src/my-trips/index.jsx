import { collection, query, where, getDocs} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';


function MyTrips() {

  const navigation=useNavigation();
  const [userTrips, setUserTrips]=useState([]);

  useEffect(()=>{ GetUserTrips() }, [])

  const GetUserTrips=async()=>{

    const user=JSON.parse(localStorage.getItem('user'));
        
    if(!user)
    {
      navigation('/');
      return;
    }
        
    const q=query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    setUserTrips(p=>[...p, doc.data()])
    });
  }
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="pointer-events-none absolute inset-0 -z-10"style={{
          background: `radial-gradient(circle at center, #ffffff 0%, #ffffff 45%, #eaf7fb 60%, #dff2f8 100%)`}}
      />
      <div className="pointer-events-none absolute -top-48 -left-48 w-[600px] h-[600px] bg-[#5fd3e6]/20 rounded-full blur-[120px] -z-10" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 w-[600px] h-[600px]  bg-[#5fd3e6]/20 rounded-full blur-[120px] -z-10" />
       
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 flex flex-col items-center '>
        <h2 className='font-bold text-5xl'>My trips</h2>
        <div className='grid grid-cols-2 lg:grid-cols-3 mt-20'>
          {userTrips.map((trip, index)=>(
            <UserTripCardItem trip={trip} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyTrips