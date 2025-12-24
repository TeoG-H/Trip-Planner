import React from "react";
import HotelCardItem from "./HotelCardItem";
import AnimatedItem from "./AnimatedItem";


function Hotels({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-4xl my-8 font-extrabold bg-gradient-to-r from-blue-400 to-purple-500  bg-clip-text text-transparent">
        Hotel recommendations
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <AnimatedItem key={index} delay={index * 80}>
            <HotelCardItem hotel={hotel} />
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
