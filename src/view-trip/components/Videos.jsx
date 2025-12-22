import React from "react";

function Videos({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-5">
        Travel Videos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {trip?.tripData?.videos?.map((video, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {video.title}
              </h3>

              <p className="text-sm text-gray-500">
                {video.channelName}
              </p>

              <p className="text-xs mt-2 text-gray-600">
                {video.description}
              </p>
            </div>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                video.searchQuery
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-blue-600 font-medium underline"
            >
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;
