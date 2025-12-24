import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Link } from "react-router-dom";


function ActivityCardItem({ activity }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    activity && getPhoto();
  }, [activity]);

 const getPhoto = async () => {
  try {
    const queries = [
      `${activity.name} landmark`,
      `${activity.name} tourist attraction`,
      `${activity.name} outdoor`,
      `${activity.name} panoramic view`,
      activity.name,
    ];

    for (const q of queries) {
      const result = await GetPlaceDetails({ textQuery: q });
      const photoName = result?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoName));
        break;
      }
    }
  } catch {
    console.log("No photo found for activity:", activity.name);
  }
};

  return (
    <Link
    to={
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(activity.name + " " + activity.location)
    }
    target="_blank"
  >
    <div
      className="group
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <img
        src={photoUrl || "/placeholder2.jpg"}
        className="h-[240px] w-full object-cover"
        alt={activity.name}
      />

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {activity.name}
          </h3>

          {activity.relatedToPreferences && (
            <span
              className="
                shrink-0
                text-xs
                px-3 py-1
                rounded-full
                bg-emerald-50
                text-emerald-600
                font-medium
              "
            >
              Match
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {activity.category} • {activity.estimatedDuration}
        </p>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:line-clamp-none">
          {activity.description}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          📍 {activity.location} • {activity.distanceFromCity}
        </p>
      </div>
    </div>
    </Link>
  );
}

export default ActivityCardItem;
