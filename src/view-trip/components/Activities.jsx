import React from "react";
import ActivityCardItem from "./ActivityCardItem";

function Activities({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-5">
        Things to Do & Explore
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.activities?.map((activity, index) => (
          <ActivityCardItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default Activities;
