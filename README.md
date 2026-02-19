# ✈️ Tripify – AI Travel Planner

🔗 **Live demo:** https://tripplanner-vert.vercel.app/

---

##  About the Project

**Tripify** is a web application that generates **personalized travel itineraries** based on user preferences such as destination, budget, travel style, and group type.

The app helps users quickly plan spontaneous or well-structured trips by providing:
- day-by-day itineraries
- recommended activities
- restaurants
- accommodation options  
—all tailored to the user’s inputs.

This project was built both out of **real personal need** for spontaneous travel planning and as a way to deepen my skills in **React, Tailwind CSS, UI/UX design, JavaScript**, and overall **web application architecture**.

---

## 🚀 Features

-  **Destination selection**
  - City / country / locality
  - Google Places Autocomplete API
-  **Trip customization**
  - Number of days
  - Budget level
  - Number of travelers (solo, couple, small group, large group)
  - Travel type (couple, family, friends)
  - Transportation mode
  - Travel pace (relax / balanced / fast)
  - Preferred activities
-  **AI-generated travel plan**
  - Personalized itinerary
  - Activities
  - Restaurants
  - Hotel recommendations
-  **Google Authentication**
  - Sign in with Google
-  **Saved trips**
  - Trips are stored in Firebase
  - Accessible anytime from the user account
-  **Cloud deployment**
  - Frontend on Vercel
  - AI server on Render

---

## 🧠 AI Integration

Tripify uses **Generative AI** to create personalized travel plans.

- A dynamic prompt is generated based on user inputs
- The AI returns:
  - day-by-day itineraries
  - activities aligned with preferences
  - restaurant and hotel suggestions
- The AI logic runs on a **separate Node.js server**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- shadcn/ui
- JavaScript

### Backend & Services
- Node.js (AI server)
- Firebase
  - Authentication (Google Sign-In)
  - Firestore Database
- Google Places Autocomplete API
- Generative AI (GenAI)

### Deployment
- Vercel – frontend
- Render – backend / AI server

---

## 📊 Project Status

- ✅ Completed
- 🟡 Beginner → Intermediate level

---

## 🔮 Future Improvements

-  Map view for itinerary locations
-  Mobile-first optimizations


---

## 📌 Live Application

👉 https://tripplanner-vert.vercel.app/
