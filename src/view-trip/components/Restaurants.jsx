import React from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import AnimatedItem from "./AnimatedItem";


function Restaurants({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-4xl my-5 font-extrabold bg-gradient-to-r from-blue-400 to-purple-500  bg-clip-text text-transparent">
        Recommended Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.restaurants?.map((restaurant, index) => (
          <AnimatedItem key={index} delay={index * 80}>
            <RestaurantCardItem restaurant={restaurant} />
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
