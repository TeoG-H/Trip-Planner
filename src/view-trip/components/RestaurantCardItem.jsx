import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

export default function RestaurantCardItem({ restaurant }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    restaurant && getPhoto();
  }, [restaurant]);

 const getPhoto = async () => {
  try {
    const base = `${restaurant.name} ${restaurant.location || ""}`;

    const queries = [
      `${base} restaurant exterior`,
      `${base} restaurant facade`,
      `${base} food`,
      `${base} dining`,
      base,
    ];

    for (const q of queries) {
      const result = await GetPlaceDetails({ textQuery: q });
      const photos = result?.data?.places?.[0]?.photos;
      const photoName = photos?.[1]?.name || photos?.[0]?.name;

      if (photoName) {
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoName));
        break;
      }
    }
  } catch {
    console.log("No photo found for restaurant:", restaurant.name);
  }
};


  return (
    <div
      className="
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
        alt={restaurant.name}
      />

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-base line-clamp-2">
          {restaurant.name}
        </h3>

        <p className="text-sm text-gray-500">
          {restaurant.type}
        </p>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {restaurant.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            📍 {restaurant.location}
          </span>

          <span className="text-sm font-medium text-emerald-600">
            {restaurant.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}
