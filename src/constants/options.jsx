export const SelectTravelesList=[
 {
    id:1,
    title:'Just Me',
    desc:'A sole travels in exploration',
    icon:'🧍',
    people:'1',
 },
 {
    id:2,
    title:'A Couple',
    desc:'Two traveles in tandem',
    icon:'👫',
    people:'2 People'
 },
 {
    id:3,
    title:'Family',
    desc:'A group of fun loving adv',
    icon:'👨‍👩‍👧',
    people:'3 to 5 People'
 },
 {
    id:4,
    title:'Friends',
    desc:'A bunch of thrill-seekes',
    icon:'👯',
    people:'5 to 10 People'
 },
]

export const SelectBudgetOptions=[
 {
    id:1,
    title:'Cheap',
    desc:'Stay conscious of costs',
    icon:'💵',
 },
 {
    id:2,
    title:'Moderate',
    desc:'Keep cost on the average side',
    icon:'💰',
 },
 {
    id:3,
    title:'Luxury',
    desc:'Dont worry about cost',
    icon:'💸',
 },
]

export const SelectTransportMode = [
  {
    id: 1,
    value: "car",
    title: "Car",
    desc: "Access locations inside the city and destinations up to 2–3 hours away by car",
    icon: "🚗",
    aiHint: "Include both city attractions and nearby destinations reachable within 2–3 hours by car."
  },
  {
    id: 2,
    value: "public_transport",
    title: "Bus / Train",
    desc: "Reach places accessible by public transport from the city",
    icon: "🚌",
    aiHint: "Recommend places reachable by public transport from the city, including nearby towns."
  },
  {
    id: 3,
    value: "walking",
    title: "Walking",
    desc: "Focus only on attractions within walking distance",
    icon: "🚶",
    aiHint: "Focus only on attractions located within walking distance inside the city."
  },
  {
    id: 4,
    value: "mixed",
    title: "Mixed",
    desc: "Combine walking and public transport for flexibility",
    icon: "🔁",
    aiHint: "Combine walking and public transport to reach attractions."
  }
];

export const SelectPreference = [
  {
    id: 1,
    value: "history",
    title: "History",
    desc: "Museums, historical landmarks, old towns",
    icon: "🏛️"
  },
  {
    id: 2,
    value: "art",
    title: "Art & Culture",
    desc: "Art galleries, cultural centers, exhibitions",
    icon: "🎨"
  },
  {
    id: 3,
    value: "nature",
    title: "Nature",
    desc: "Parks, lakes, scenic views, green areas",
    icon: "🌿"
  },
  {
    id: 4,
    value: "hiking",
    title: "Hiking",
    desc: "Mountain trails, hiking routes, outdoor adventures",
    icon: "🥾"
  },
  {
    id: 5,
    value: "food",
    title: "Food",
    desc: "Local cuisine, restaurants, street food",
    icon: "🍽️"
  },
  {
    id: 6,
    value: "nightlife",
    title: "Nightlife",
    desc: "Bars, clubs, nightlife areas",
    icon: "🎶"
  },
  {
    id: 7,
    value: "relax",
    title: "Relaxation",
    desc: "Spas, beaches, calm places",
    icon: "🧘"
  },
  {
    id: 8,
    value: "family",
    title: "Family Friendly",
    desc: "Activities suitable for families and children",
    icon: "👨‍👩‍👧‍👦"
  }
];

export const SelectTravelPace = [
  {
    id: 1,
    value: "relaxed",
    title: "Relaxed",
    desc: "Slow pace with plenty of free time and few activities per day",
    icon: "🐢",
    aiHint:
      "The travel pace should be relaxed, with plenty of free time and no more than 2–3 activities per day."
  },
  {
    id: 2,
    value: "balanced",
    title: "Balanced",
    desc: "A mix of sightseeing and free time",
    icon: "⚖️",
    aiHint:
      "The travel pace should be balanced, combining sightseeing with free time."
  },
  {
    id: 3,
    value: "fast",
    title: "Fast-paced",
    desc: "Packed schedule with many activities each day",
    icon: "⚡",
    aiHint:
      "The travel pace should be fast-paced, with a full schedule and multiple activities per day."
  }
];

export const SelectTravelerType = [
  {
    id: 1,
    value: "solo",
    title: "Solo Traveler",
    desc: "Independent travel focused on flexibility and personal interests",
    icon: "🧍",
    aiHint:
      "The trip is for a solo traveler, focusing on flexible and individual-friendly activities."
  },
  {
    id: 2,
    value: "couple",
    title: "Couple",
    desc: "Romantic experiences and activities for two",
    icon: "💑",
    aiHint:
      "The trip is for a couple and should include romantic and intimate experiences."
  },
  {
    id: 3,
    value: "friends",
    title: "Friends",
    desc: "Fun, social activities suitable for groups",
    icon: "👫",
    aiHint:
      "The trip is for a group of friends and should include fun and social activities."
  },
  {
    id: 4,
    value: "family",
    title: "Family",
    desc: "Family-friendly activities suitable for children",
    icon: "👨‍👩‍👧‍👦",
    aiHint:
      "The trip is for a family and should focus on family-friendly and child-safe activities."
  }
];


export const AI_PROMPT = `
You are a professional travel planner with strong local and regional knowledge.

Generate a Travel Plan based on the following details:

Location: {location}
Total Days: {totalDays}
Number of Travelers: {traveler}
Budget Level: {budget}

Transportation Mode:
{transportMode}

Travel Pace:
{travelPace}

Traveler Type:
{travelerType}

User Preferences:
The user enjoys the following types of experiences:
{travelPreference}

==============================
CRITICAL DISCOVERY RULES
==============================

1. ACTIVITIES DISCOVERY:
- Return a LARGE list of activities and places to explore.
- If the destination is large or touristic, return between 25 and 35 activities.
- If the destination is small, return as many REAL activities as realistically exist.
- NEVER invent places.

2. PREFERENCE BALANCE:
- At least 50% (ideally up to 65%) of the activities MUST match the user's preferences.
- The remaining activities should provide variety and discovery.
- Clearly mark which activities match the preferences.

3. SURROUNDING AREAS:
- If transportation allows (especially CAR), actively search beyond the city.
- Include nearby mountains, villages, natural parks, landmarks, and trails up to 2–3 hours away.
- Do NOT limit results to the city center.

4. REALISM:
- Use REAL places only.
- Use realistic distances, travel times, and locations.
==============================
QUALITY & AUTHORITY FILTER
==============================

When selecting activities and places, prioritize locations that are:
- Widely recognized and frequently recommended by well-known travel guides.
- Popular among experienced travelers and locals.
- Commonly featured in reputable travel blogs and destination rankings.
- Considered iconic, must-see, or highly rated for the destination.

Avoid obscure or low-value attractions unless they are genuinely unique or exceptional.
Prefer quality and relevance over random or generic places.

==============================
RESTAURANT DISCOVERY RULES
==============================

Provide a curated list of up to 12 real restaurants for the destination.
- Only include restaurants that actually exist and are known or frequently recommended.
- Do NOT invent restaurant names or locations.
- Prioritize restaurants that are:
  * Well-rated by travelers and locals
  * Popular in travel guides, food blogs, or review platforms
  * A good match for the user's selected budget
- If a budget level is "cheap" or "moderate", emphasize affordable local favorites.
- If the budget level is "luxury", include upscale dining options as well.
- Provide a variety of cuisines and experiences (local specialties, classic favorites, etc.).
- Do NOT repeat the same restaurant twice.
- If fewer than 12 real restaurants are found, return as many as exist.

For each restaurant include:
- Name
- Primary cuisine type
- Short descriptive sentence
- Price range that matches the user's budget
- Address or general location description
- GeoCoordinates of the restaurant location


==============================
ITINERARY RULES
==============================

- Build a detailed itinerary using the discovered activities.
- Distribute activities logically across all days.
- Adjust daily intensity based on travel pace.
- Avoid repeating the same activity type on consecutive days.

==============================
SPATIAL & ROUTE OPTIMIZATION
==============================

When building the itinerary:
- Group activities that are geographically close on the same day.
- Avoid unnecessary backtracking between distant locations.
- Prefer one-direction routes (progressive movement) instead of going back and forth.
- Optimize each day so that travel time between places is minimized.
- Ensure the route for each day makes geographical sense.
-Do NOT plan routes that require returning to the same area later in the same day
unless it is unavoidable.

If transportation mode is CAR:
- Plan routes that move progressively away from the city and return only once.
- Do not alternate between city and distant locations multiple times in the same day.
- Prefer circular or linear routes when possible.
Ensure that total daily travel time is reasonable and realistic.
Avoid schedules that feel rushed or inefficient.

==============================
YOUTUBE TRAVEL VIDEOS
==============================

Provide up to 3 popular YouTube travel videos related to the destination.

IMPORTANT:
- Do NOT provide direct YouTube URLs.
- Instead, provide a realistic search query that can be used to find the video on YouTube.
- Videos must be real travel vlogs or city guides by well-known creators.
- Prefer videos with high views and strong engagement.
- Do NOT invent obscure or unrealistic titles.

For each video include:
- Video title
- Channel name
- YouTube search query (to locate the video reliably)


==============================
OUTPUT FORMAT (STRICT JSON)
==============================

Return STRICTLY JSON using EXACTLY this structure:

{
  "hotels": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "hotelImageUrl": "",
      "geoCoordinates": "lat, lng",
      "rating": "",
      "description": ""
    }
  ],
  "activities": [
    {
      "name": "",
      "category": "",
      "description": "",
      "location": "",
      "geoCoordinates": "lat, lng",
      "estimatedDuration": "",
      "distanceFromCity": "",
      "relatedToPreferences": true
    }
  ],
  "restaurants": [
    {
      "name": "",
      "type": "",
      "description": "",
      "priceRange": "",
      "location": "",
      "geoCoordinates": "lat, lng"
    }
  ],
  "videos": [
  {
    "title": "",
    "channelName": "",
    "description": "",
    "searchQuery": ""
  }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "plan": [
        {
          "time": "",
          "placeName": "",
          "placeDetails": "",
          "placeImageUrl": "",
          "geoCoordinates": "lat, lng",
          "ticketPricing": "",
          "timeToTravel": ""
        }
      ]
    }
  ]
}

==============================
FINAL RULES (MANDATORY)
==============================
- Include at least 4 hotel options.
- Include activities and restaurants BEFORE building the itinerary.
- Include plans for ALL {totalDays} days.
- Do NOT add, remove, or rename fields.
- Do NOT include explanations or text outside the JSON.
`;