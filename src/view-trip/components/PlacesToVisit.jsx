import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import AnimatedItem from "./AnimatedItem";


function PlacesToVisit({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-8">
        Places to visit
      </h2>

      {trip?.tripData?.itinerary?.map((item, dayIndex) => (
        <AnimatedItem key={dayIndex}>
          <h2 className="font-medium text-lg mb-4">
            {item.day}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {item.plan.map((place, index) => (
              <AnimatedItem key={index} delay={index * 80}>
                <h2 className="font-medium text-sm text-orange-600">
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
