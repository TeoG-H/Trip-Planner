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
import RevealOnScroll from '@/create-trip/RevealOnScroll';
import Header from '@/components/custom/Header';

function Viewtrip() {

  const {tripId}=useParams();
  const [trip, setTrip]=useState();

  const infoRef = RevealOnScroll();
  const activitiesRef = RevealOnScroll();
  const restaurantsRef = RevealOnScroll();
  const hotelsRef = RevealOnScroll();
  const placesRef = RevealOnScroll();
  const videosRef = RevealOnScroll();
  const footerRef = RevealOnScroll();


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
      toast("NO, trip found")
    }
  }
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="pointer-events-none absolute inset-0 -z-10"style={{
          background: `radial-gradient(circle at center, #ffffff 0%, #ffffff 45%, #eaf7fb 60%, #dff2f8 100%)`}}
      />
      <div className="pointer-events-none absolute -top-48 -left-48 w-[600px] h-[600px] bg-[#5fd3e6]/20 rounded-full blur-[120px] -z-10" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 w-[600px] h-[600px]  bg-[#5fd3e6]/20 rounded-full blur-[120px] -z-10" />

     <div className="p-10 md:px-20 lg:px-44">

        <div >
          <InfoSection trip={trip} />
        </div>

        <div ref={activitiesRef}>
          <Activities trip={trip} />
        </div>

        <div ref={restaurantsRef}>
          <Restaurants trip={trip} />
        </div>

        <div ref={hotelsRef}>
          <Hotels trip={trip} />
        </div>

        <div ref={placesRef}>
          <PlacesToVisit trip={trip} />
        </div>

        <div ref={videosRef}>
          <Videos trip={trip} />
        </div>

        <div ref={footerRef}>
          <Footer trip={trip} />
        </div>
      </div>   
    </div>

  )
}

export default Viewtrip