import { useEffect, useState } from 'react'
import { fetchWeatherData } from '../servicesAPI/weatherData';
import SearchBar from './SearchBar';
import { BsCloudFill, BsCloudFog2Fill, BsFillCloudDrizzleFill, BsFillCloudRainFill, BsFillCloudSnowFill, BsFillSunFill, BsFillThunderboltFill } from 'react-icons/bs';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { WiHumidity } from 'react-icons/wi';
import { SiTailwindcss } from 'react-icons/si';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


// Defining the structure of the weather data object
interface WeatherDataTypes {
  cod: string | number;
  coord: {
    lon: number;
    lat: number;
  };
  message: string;
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;  // Weather condition (e.g., 'Clear', 'Rain')
    icon: string;  // Icon code (e.g., '01d', '02d')
  }[];
  wind: {
    speed: number;
  };
  dt: number;
  timezone: number;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherDataTypes | null>(null);
  const [search, setSearch] = useState<string>("");
  const [serchError, setSearchError] = useState<string>("");
  const [load, setLoad] = useState<string>("");
  const [time, setTime] = useState<number>(600);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [info, setInfo] = useState<boolean>(true);

  // Effect hook to get user's geolocation on component mount and fetch weather based on coordinates
  useEffect(() => {
    console.log("geolocation");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchLatLongData(latitude, longitude);
        console.log("geolocation");
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);


  // Effect hook to load previous search suggestions from localStorage
  useEffect(() => {
    const suggestArr = localStorage.getItem("suggestions");
    const arr: string[] = suggestArr ? JSON.parse(suggestArr) : [];
    arr.reverse();
    let capitalizedArr: string[] = [];
    arr.forEach(value => {
      capitalizedArr.push((value.charAt(0).toUpperCase() + value.slice(1)));
    })
    setSuggestions(capitalizedArr);
  }, []);

  // Effect hook to set a timer for auto-refresh of weather data
  useEffect(() => {
    if (weather !== null && Object.keys(weather).length > 2) {

      setTime(600);
      let timer = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setWeather(null);
            const { lat, lon } = weather.coord;
            fetchLatLongData(lat, lon);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }

  }, [weather]);

  // Function to determine the background styles based on weather condition
  const getBackground = (weather: string) => {
    switch (weather) {
      case 'Clear':
        return {
          setSuggestColor: 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600',
          container: 'bg-blue-100 dark:bg-blue-900' // Clear weather: light blue container, dark blue button
        };
      case 'Rain':
        return {
          setSuggestColor: 'bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700',
          container: 'bg-blue-300 dark:bg-blue-800' // Rain: darker button for contrast
        };
      case 'Clouds':
        return {
          setSuggestColor: 'bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-900',
          container: 'bg-gray-300 dark:bg-gray-700' // Clouds: light container, dark button for contrast
        };
      case 'Snow':
        return {
          setSuggestColor: 'bg-blue-800 text-white hover:bg-blue-900 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700',
          container: 'bg-white dark:bg-gray-900' // Snow: white container, blue button
        };
      case 'Thunderstorm':
        return {
          setSuggestColor: 'bg-yellow-600 text-black hover:bg-yellow-700 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600',
          container: 'bg-yellow-300 dark:bg-yellow-700' // Thunderstorm: yellow for contrast
        };
      case 'Drizzle':
        return {
          setSuggestColor: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-500',
          container: 'bg-blue-200 dark:bg-blue-600' // Drizzle: lighter blue container, dark button
        };
      case 'Mist':
        return {
          setSuggestColor: 'bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-400 dark:text-white dark:hover:bg-gray-700',
          container: 'bg-gray-200 dark:bg-gray-600' // Mist: soft gray container, dark button
        };
      default:
        return {
          setSuggestColor: 'bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700',
          container: 'bg-gray-200 dark:bg-gray-800' // Default: gray button for visibility
        };
    }
  };

  // Function to render weather icons based on the condition (e.g., Thunderstorm, Rain, Clear)
  function weatherConditions(condition: string) {
    let iconImage: React.ReactNode;

    switch (condition) {
      case "Thunderstorm":
        iconImage = <BsFillThunderboltFill size={60} className="text-yellow-500 dark:text-yellow-400" />;
        break;

      case "Drizzle":
        iconImage = <BsFillCloudDrizzleFill size={60} className="text-blue-400 dark:text-blue-300" />;
        break;

      case "Rain":
        iconImage = <BsFillCloudRainFill size={60} className="text-blue-500 dark:text-blue-300" />;
        break;

      case "Snow":
        iconImage = <BsFillCloudSnowFill size={60} className="text-blue-400 dark:text-blue-300" />;
        break;

      case "Clear":
        iconImage = <BsFillSunFill size={60} className="text-yellow-500 dark:text-yellow-400" />;
        break;

      case "Clouds":
        iconImage = <BsCloudFill size={60} className="text-gray-700 dark:text-gray-300" />;
        break;

      case "Mist":
        iconImage = <BsCloudFog2Fill size={60} className="text-gray-500 dark:text-gray-300" />;
        break;

      default:
        iconImage = <TiWeatherPartlySunny size={60} className="text-gray-500 dark:text-gray-300" />;
    }

    return <span className="text-5xl font-bold">{iconImage}</span>;
  }

  // Function to fetch weather data based on city name
  const weatherDetails = async (value: string) => {
    setLoad("Loading...");
    try {
      const data = await fetchWeatherData(value);
      setWeather(data);
      const suggestArr = localStorage.getItem("suggestions");
      const arr: string[] = suggestArr ? JSON.parse(suggestArr) : [];

      while (arr.length > 9) {
        //console.log(arr);
        arr.splice(0, 1);
      }

      if (!arr.includes(search) && Object.keys(data).length > 2) {
        search && arr.push(search);
        localStorage.setItem("suggestions", JSON.stringify(arr));
      }
    } catch (e) {
      console.log(e);
      setSearchError("Failed to fetch!");
    } finally {
      setSearch("");
      setLoad("");
    }

  }

  // Function to fetch weather data based on latitude and longitude
  async function fetchLatLongData(lat: number, lon: number) {
    const apiKey: string = "3d735c169cd8481b1c8153c9753f5971";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric`;
    setLoad("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
      setSearchError("Failed to fetch!");
    } finally {
      setLoad("");
    }
  }

  // Function to refresh the current weather data
  function refreshCurrentWeather() {
    if (weather !== null && Object.keys(weather).length > 2) {
      setSearch(weather.name);
      setWeather(null);
      const { lat, lon } = weather.coord;
      fetchLatLongData(lat, lon);
    }
  }

  // Function to convert city timestamp to local time
  function cityTimezone() {
    if (weather !== null && Object.keys(weather).length > 2) {
      const { dt, timezone } = weather;
      // Get the user's timezone offset (in minutes) , timezone 
      //let offset = new Date().getTimezoneOffset();
      //const localTime = new Date().getTime() || Date.now()
      const localTime: number = dt * 1000;
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const currentUtcTime = localOffset + localTime
      const currentCityTime = currentUtcTime + 1000 * timezone;
      const cityTime = new Date(currentCityTime);
      return cityTime.toLocaleString();
    }
  }

  // Form submission handler for weather search
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchError("");
    setWeather(null);
    if (search === "") {
      setSearchError("Please enter a search term");
    } else {
      weatherDetails(search);
    }

  }

  // Function to determine the number of slides to show based on the number of suggestions
  const getSlidesToShow = (numSuggestions: number): number => {
    if (numSuggestions <= 1) return 1;  // Show 1 slide if there's only 1 suggestion
    if (numSuggestions === 2) return 2;  // Show 2 slides if there are 2 suggestions
    return 3;  // Default: Show 3 slides for 3 or more suggestions
  };

  // Slick carousel settings for displaying city suggestions
  const settings = {
    centerMode: true,                // Center the active slide
    infinite: true,                  // Infinite scrolling
    centerPadding: '0',              // No padding on the sides
    focusOnSelect: true,             // Allows focus on select
    slidesToShow: getSlidesToShow(suggestions.length), // Dynamic slidesToShow
    slidesToScroll: 1,               // Scroll 1 slide at a time
    adaptiveHeight: true,            // Automatically adjusts the height
    responsive: [
      {
        breakpoint: 1024,            // For tablets and larger screens
        settings: {
          slidesToShow: 3,           // Show 3 slides
          slidesToScroll: 1,         // Scroll 1 slide at a time
          centerPadding: '20px',     // Add some padding on the sides
        },
      },
      {
        breakpoint: 768,             // For mobile devices in landscape mode
        settings: {
          slidesToShow: 2,           // Show 2 slides
          slidesToScroll: 1,         // Scroll 1 slide at a time
          centerPadding: '10px',     // Add some padding on the sides
        },
      },
      {
        breakpoint: 480,             // For mobile devices in portrait mode
        settings: {
          slidesToShow: 1,           // Show 1 slide
          slidesToScroll: 1,         // Scroll 1 slide at a time
          centerPadding: '5px',      // Minimal padding on the sides
        },
      },
    ],
  };

  return (
    <div
      className={`${weather !== null && Object.keys(weather).length > 2 && getBackground(weather?.weather[0].main || 'Clear').container}
       w-full max-w-xl mx-auto rounded-lg p-4 max-sm:p-2
       shadow-lg transition-all dark:text-white text-gray-900`}
    >
      <div className="flex justify-between items-center w-full max-w-96 mx-auto mb-3">
        {/* Search Bar */}
        <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />

        {/* Refresh Button */}
        {
          weather !== null && Object.keys(weather).length > 2 && (
            <button
              onClick={refreshCurrentWeather}
              className="max-sm:text-[12px] ml-2 p-1 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600
             dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center transition-colors duration-300"
            >
              Refresh
            </button>
          )
        }
      </div>

      {/* Error Message */}
      {serchError && <p className="text-red-500 text-center mt-2">{serchError}</p>}

      {load ? <p className='text-center mt-3 text-gray-500'>{load}</p> : (
        weather !== null && Object.keys(weather).length > 2 ? (
          <div className="flex flex-col gap-4">
            {/* Suggestions  */}
            <div className="w-[90%] mx-auto my-1 bg-slate-600">
              {suggestions.length > 0 && (
                <Slider {...settings} className={getBackground(weather?.weather[0].main || 'Clear').container}>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => weatherDetails(suggestion)}
                      className={`${getBackground(weather?.weather[0].main || 'Clear').setSuggestColor} rounded-lg text-[12px] 
                      font-semibold p-1 transition-all hover:scale-105 shadow-md hover:shadow-xl focus:outline-none focus:ring 
                      focus:ring-blue-500 active:scale-95
                     `}
                    >
                      {suggestion}
                    </button>
                  ))}
                </Slider>
              )}
            </div>

            {/* Time */}
            {<p className="text-center text-sm mt-1 font-semibold">{cityTimezone()}</p>}

            {/* Weather Information */}
            <div className="flex flex-col items-center mb-3">
              <h2 className="text-3xl max-sm:text-xl font-bold">{weather.name}, {weather.sys.country}</h2>
              <p className="text-lg">{weatherConditions(weather.weather[0].main)}</p>
              <p className="text-xl max-sm:text-lg mt-4 font-semibold">{weather.main.temp.toFixed(1)}°C</p>
              <p className="text-xl max-sm:text-lg">{weather.weather[0].main}</p>
            </div>

            {/* Weather Details */}
            <div className="flex gap-6 max-sm:gap-2 p-3 max-sm:p-2 justify-center bg-slate-200 dark:bg-slate-700 rounded-md shadow-md">
              <div className="flex flex-row items-center gap-2 max-sm:gap-1">
                <WiHumidity size={30} className="text-blue-500 dark:text-blue-300" />
                <p className="flex flex-col text-center">
                  <span className="text-2xl max-sm:text-sm font-semibold">{weather.main.humidity}%</span>
                  <span className='text-xl max-sm:text-sm'>Humidity</span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-2 max-sm:gap-1">
                <SiTailwindcss size={30} className="text-green-500 dark:text-green-300" />
                <p className="flex flex-col text-center">
                  <span className="text-2xl max-sm:text-sm font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</span>
                  <span className='text-xl max-sm:text-sm'>Wind Speed</span>
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center relative">
              <IoMdInformationCircleOutline
                onClick={() => setInfo(prev => !prev)}
                size={20}
                className="font-bold cursor-pointer text-violet-700 hover:text-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-full dark:text-white dark:hover:text-violet-300"
              />

              <p
                className={`text-center text-stone-700 text-sm font-semibold p-2 absolute top-[120%] w-36 bg-white rounded-lg shadow-lg transition-opacity duration-300 ${info && "hidden"}`}
              >
                <span>Auto-update in: </span>
                <span>
                  {(Math.floor((time / 60)) % 60).toString().padStart(2, "0")}:
                  {(time % 60).toString().padStart(2, "0")}
                </span>
              </p>
            </div>

          </div>
        ) : (
          <p className="text-center mt-4">{weather !== null && weather.message}</p>)
      )}
    </div>

  );
}
