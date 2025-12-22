import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

export default function RestaurantCardItem({ restaurant }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    restaurant && getPhoto();
  }, [restaurant]);

  const getPhoto = async () => {
    try {
      const data = {
        textQuery: restaurant.name,
      };

      const result = await GetPlaceDetails(data);
      const photoName =
        result?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {
        const url = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(url);
      }
    } catch (err) {
      console.log("No photo found for restaurant:", restaurant.name);
    }
  };

  return (
    <div className="border rounded-xl hover:scale-105 transition-all cursor-pointer overflow-hidden">
      <img
        src={photoUrl || "/placeholder2.jpg"}
        className="h-[220px] w-full object-cover"
      />

      <div className="p-3">
        <h2 className="font-semibold text-lg">
          {restaurant.name}
        </h2>

        <p className="text-xs text-gray-500">
          {restaurant.type}
        </p>

        <p className="text-sm mt-2">
          {restaurant.description}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          📍 {restaurant.location}
        </p>

        <p className="text-sm font-medium text-green-600 mt-2">
          💲 {restaurant.priceRange}
        </p>
      </div>
    </div>
  );
}
