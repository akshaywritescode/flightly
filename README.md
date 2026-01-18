# ✈️ Flightly — Modern Flight Search Engine

![Background Image](https://github.com/akshaywritescode/flightly/blob/main/app/assets/background.png?raw=true)

Flightly is a modern, responsive flight search engine built as part of a frontend engineering assignment.  
It focuses on clean architecture, real-time data handling, and a polished user experience inspired by real-world products like Google Flights.

---

## 🚀 Features

- 🔍 **Flight Search**
  - Search flights by origin, destination, and dates
  - Supports **One-way** and **Round-trip** selection

- 🧠 **Smart Location Autocomplete**
  - City & airport suggestions powered by **Amadeus Location API**
  - Debounced search with clean UI

- 💸 **Live Flight Results**
  - Real-time flight offers using **Amadeus Flight Offers API**
  - Displays price, airline, flight number, duration, baggage & meal info

- 🍽️ **Meal & Baggage Detection**
  - Automatically detects:
    - Free vs paid meals
    - Cabin & check-in baggage allowances

- 🕒 **Accurate Duration Parsing**
  - Parses ISO 8601 durations (e.g. `PT2H15M`)
  - Displays human-readable flight duration

- 🏙️ **City-aware Results**
  - Uses selected city data for consistent display
  - Avoids unnecessary API calls

- 📱 **Fully Responsive**
  - Optimized for desktop and mobile screens

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Icons:** lucide-react
- **API:** Amadeus Self-Service APIs
- **Hosting:** Vercel (recommended)

---

## 🧩 Architecture Overview

```txt
Home (page.tsx)
 ├─ owns search + results state
 ├─ handles API requests
 │
 ├─ FlightSearchCard
 │   ├─ FromLocationInput
 │   ├─ ToLocationInput
 │   ├─ Date Pickers
 │   └─ Trip Type Selector
 │
 └─ FlightsResultSection
     └─ FlightResultCard
```

## 🔐 Environment Variables
Create a .env.local file in the root:
```
AMADEUS_API_KEY=your_api_key
AMADEUS_API_SECRET=your_api_secret
```

## ▶️ Getting Started
```
npm install
npm run dev
```

## 📄 License
This project is built for evaluation and learning purposes.
