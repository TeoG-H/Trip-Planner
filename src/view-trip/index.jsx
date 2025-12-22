import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';
import Activities from "./components/Activities";
import Restaurants from './components/Restaurants';
import Videos from './components/Videos';

function Viewtrip() {

  const {tripId}=useParams();
  const [trip, setTrip]=useState();

  //se excuta getTripData doar cand exista tripId
  useEffect(()=>{tripId&&GetTripData()},[tripId])

  const GetTripData=async()=>{
    const docRef=doc(db, 'AITrips', tripId);
    const docSnap=await getDoc(docRef);

     
    if(docSnap.exists()){
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    }
    else{

      console.log("no such document");
      toast("NO, trip found")
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px'>
      <InfoSection trip={trip}/>
      <Activities trip={trip} />
      <Restaurants trip={trip} />
      <Hotels trip={trip}/>
      <PlacesToVisit trip={trip}/>
      <Videos trip={trip} />
      <Footer trip={trip}/>


    </div>
  )
}

export default Viewtrip