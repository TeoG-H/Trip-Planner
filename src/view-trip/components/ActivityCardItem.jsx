import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function ActivityCardItem({ activity }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    activity && getPhoto();
  }, [activity]);

  const getPhoto = async () => {
    try {
      const data = {
        textQuery: activity.name,
      };

      const result = await GetPlaceDetails(data);
      const photoName = result?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const url = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(url);
      }
    } catch (err) {
      console.log("No photo found for activity:", activity.name);
    }
  };

  return (
    <div className="border rounded-xl hover:scale-105 transition-all cursor-pointer overflow-hidden">
      <img
        src={photoUrl || "/placeholder2.jpg"}
        className="h-[220px] w-full object-cover"
      />

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-sm">{activity.name}</h2>

          {activity.relatedToPreferences && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Matches your interests
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {activity.category} • {activity.estimatedDuration}
        </p>

        <p className="text-xs mt-2 line-clamp-3">
          {activity.description}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          📍 {activity.location} ({activity.distanceFromCity})
        </p>
      </div>
    </div>
  );
}

export default ActivityCardItem;
