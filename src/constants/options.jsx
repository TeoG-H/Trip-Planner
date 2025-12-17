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

export const AI_PROMPT = `
Generate a Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget.

Give me a Hotels options list with:
- HotelName
- HotelAddress
- Price
- HotelImageUrl
- GeoCoordinates
- Rating
- Description

Also suggest a detailed itinerary for each day.

For the itinerary include:
- Day (Day 1, Day 2, ...)
- Time slots
- PlaceName
- PlaceDetails
- PlaceImageUrl
- GeoCoordinates
- TicketPricing
- TimeToTravel

Return the result STRICTLY in JSON format using EXACTLY this structure:

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

Rules:
- Include at least 4 hotel options.
- Include plans for all {totalDays} days.
- Each day must contain multiple places and time slots.
- Use realistic places, prices, and coordinates.
- Do NOT add or remove fields.
- Do NOT include explanations, markdown, or text outside the JSON.
`;
