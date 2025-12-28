import React from "react";
import ActivityCardItem from "./ActivityCardItem";
import AnimatedItem from "./AnimatedItem";


function Activities({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-h2 my-5 font-extrabold bg-gradient-to-r from-blue-400 to-purple-500  bg-clip-text text-transparent">
        Things to Do & Explore
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.activities?.map((activity, index) => (
          <AnimatedItem key={index} delay={index * 80}>
            <ActivityCardItem activity={activity} />
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
}

export default Activities;
