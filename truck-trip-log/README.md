# Truck Trip Log - ReactJS

This repository contains the **Truck Trip Log** application, a sophisticated logistics tracking tool developed as part of the **ALX Frontend ReactJS Journey**. The app enables drivers and dispatchers to manage trip data, visualize routes on an interactive map, and monitor compliance with driving cycles.

---

## Features

- **User Authentication:** Secure Login and Registration with JWT-based session management and automatic token expiration checks.
- **Interactive Mapping:** Real-time route visualization using **Leaflet** and **OSRM API**.
- **Logistics Logic:** \* Automatic calculation of route distance and duration.
- Smart fueling station placement (every 1,000 miles).
- Pick-up and drop-off location tracking with break-time logic.

- **Data Management:** Persistent state using **Zustand** and `localStorage` for trip history.
- **Modern UI:** Responsive design with **Tailwind CSS 4**, featuring a seamless Dark/Light mode toggle.
- **Reporting:** Ability to export trip details using `html2canvas` and `html2pdf.js`.

---

## Tech Stack

### Frontend Core

- **React 19** & **TypeScript**
- **Vite** (Build Tool)
- **React Router 7** (Navigation)

### State & APIs

- **Zustand:** Lightweight state management.
- **Axios:** Backend communication.
- **Leaflet & @react-google-maps/api:** Map rendering and geospatial data.

### Styling

- **Tailwind CSS 4:** Utility-first styling.
- **React Icons:** Material Design, GiTruck, and more.

---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/kaberege/kgn-fe-reactjs.git
cd kgn-fe-reactjs/truck-trip-log

```

2. **Install dependencies:**

```bash
npm install

```

3. **Environment Variables:**
   Create a `.env` file in the root and add your backend URL:

```env
VITE_OPEN_CAGE_API_KEY=your_api_key
VITE_BACKEND_BASE_URL=your_backend_api_url

```

4. **Run Development Server:**

```bash
npm run dev

```

---

## Authentication Flow

The application implements a strict security layer. Before accessing the `MapView`, the system checks for a valid `access_token`.

- **Registration:** Validates email format and password complexity (8-30 chars, uppercase, lowercase, numbers, and symbols).
- **Session Guard:** The `checkTokenExpiration` utility decodes the JWT and redirects the user to login if the `exp` timestamp has passed.
