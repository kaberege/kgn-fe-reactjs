export async function fetchWeatherData(city: string) {
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${VITE_API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
