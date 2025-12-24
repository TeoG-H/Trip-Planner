import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import AnimatedItem from "./AnimatedItem";


function PlacesToVisit({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-4xl my-8 font-extrabold bg-gradient-to-r from-blue-400 to-purple-500  bg-clip-text text-transparent">
        Places to visit
      </h2>

      {trip?.tripData?.itinerary?.map((item, dayIndex) => (
        <AnimatedItem key={dayIndex}>
          <h2 className="font-medium text-xl my-5">
            {item.day}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {item.plan.map((place, index) => (
              <AnimatedItem key={index} delay={index * 80}>
                <h2 className="font-medium text-sm mb-4">
                  {place.time}
                </h2>
                <PlaceCardItem place={place} />
              </AnimatedItem>
            ))}
          </div>
        </AnimatedItem>
      ))}
    </div>
  );
}

export default PlacesToVisit;
