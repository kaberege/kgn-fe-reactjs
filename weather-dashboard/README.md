# Weather Dashboard - React & TypeScript

This project is a real-time **Weather Dashboard** built as part of the ALX Frontend Development journey. It provides users with live weather updates using geolocation or city searches, featuring a dynamic UI that adapts to current weather conditions.

---

## Features

- **Real-time Data:** Fetches live weather information (temperature, humidity, wind speed) via the OpenWeatherMap API.
- **Geolocation Support:** Automatically detects user location on startup to show local weather.
- **Dynamic UI:** Background colors and weather icons change dynamically based on the weather (e.g., Clear, Rain, Snow, Thunderstorm).
- **Search History:** Uses `localStorage` to save and display a carousel of recently searched cities.
- **Auto-Refresh:** Features a built-in timer that automatically updates weather data every 10 minutes.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views using Tailwind CSS.

---

## Tech Stack

- **Core:** React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** React Icons
- **Carousel:** React Slick & Slick Carousel
- **Build Tool:** Vite

---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/kaberege/kgn-fe-reactjs.git
cd kgn-fe-reactjs/weather-dashboard

```

2. **Install dependencies:**

```bash
npm install

```

3. **Environment Variables:**
   Create a `.env` file in the root and add your OpenWeatherMap API key:

```env
VITE_API_KEY=your_api_key_here

```

4. **Run the development server:**

```bash
npm run dev

```
