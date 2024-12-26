import { useEffect, useState } from 'react'
import { FetchWeatherData } from '../servicesAPI/weatherData';
import SearchBar from './SearchBar';
import { BsCloudFill, BsCloudFog2Fill, BsFillCloudDrizzleFill, BsFillCloudRainFill, BsFillCloudSnowFill, BsFillSunFill, BsFillThunderboltFill } from 'react-icons/bs';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { WiHumidity } from 'react-icons/wi';
import { SiTailwindcss } from 'react-icons/si';

interface WeatherDataTypes {
  cod: string | number;
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
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherDataTypes | null>(null);
  const [search, setSearch] = useState<string>("");
  const [serchError, setSearchError] = useState<string>("");
  const [load, setLoad] = useState<string>("");
  const [time, setTime] = useState<number>(30);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        FetchLatLongData(latitude, longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    setTime(30);
    let timer = setInterval(() => {
      setTime(prev => {
        if (prev > 1) {
          return prev - 1
        } else {
          return 30;
        }
      });
    }, 1000);
    return () => clearInterval(timer);

  }, []);

  function weatherConditions(condition: string) {
    let iconImage: React.ReactNode;
    let iconColor: string;

    switch (condition) {
      case "Thunderstorm":
        iconImage = <BsFillThunderboltFill />;
        iconColor = "";
        break;

      case "Drizzle":
        iconImage = <BsFillCloudDrizzleFill />;
        iconColor = "";
        break;

      case "Rain":
        iconImage = <BsFillCloudRainFill />;
        iconColor = "";
        break;

      case "Snow":
        iconImage = <BsFillCloudSnowFill />;
        iconColor = "";
        break;

      case "Clear":
        iconImage = <BsFillSunFill />;
        iconColor = "";
        break;

      case "Clouds":
        iconImage = <BsCloudFill />;
        iconColor = "";
        break;

      case "Mist":
        iconImage = <BsCloudFog2Fill />;
        iconColor = "";
        break;

      default:
        iconImage = <TiWeatherPartlySunny />;
        iconColor = "";
    }

    return <span className={`${iconColor} text-5xl font-bold`}>{iconImage}</span>;
  }

  const weatherDetails = async () => {
    setLoad("Loading...");
    try {
      const data = await FetchWeatherData(search);
      console.log(data);
      setWeather(data);
    } catch (e) {
      console.log(e);
      setSearchError("Failed to fetch!");
    } finally {
      setSearch("");
      setLoad("");
    }

  }

  async function FetchLatLongData(lat: number, lon: number) {
    const id: string = "3d735c169cd8481b1c8153c9753f5971";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${id}&units=metric`;
    setLoad("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error(error);
      setSearchError("Failed to fetch!");
    } finally {
      setLoad("");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchError("");
    setWeather(null);
    if (search === "") {
      setSearchError("Please enter a search term")
    } else {
      weatherDetails();
    }

  }

  return (
    <div className='bg-slate-300 max-w-96 mx-auto rounded-md p-2'>
      <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
      {<p>{time}</p>}
      {serchError && <p>{serchError}</p>}
      {load && <p className='text-center mt-3'>{load}</p>}
      {
        weather !== null && Object.keys(weather).length > 2 ? (
          <div className='flex flex-col gap-4 justify-center'>
            <div className='flex flex-row items-center justify-center mt-7 gap-1'>
              <h2 className='text-2xl font-bold'>{weather.name},</h2>
              <h3>{weather.sys.country}</h3>
            </div>
            <div className='flex flex-col justify-center text-center mt-3'>
              <p className='flex justify-center text-2xl'>{weatherConditions(weather.weather[0].main)}</p>
              <p className='mt-6 text-2xl font-bold'>{weather.main.temp}°C</p>
              <p className='text-2xl font-bold'>{weather.weather[0].main}</p>
            </div>
            <div className='flex flex-row gap-6 w-full p-3 justify-center bg-slate-200 rounded-md'>
              <div className='flex flex-row items-center gap-1'><WiHumidity size={30} /><p className='flex flex-col'><span className='text-2xl font-semibold'>{weather.main.humidity}%</span><span>Humidity</span></p></div>
              <div className='flex flex-row items-center gap-1'><SiTailwindcss size={30} /><p className='flex flex-col'><span className='text-2xl font-semibold'>{Math.round((weather.wind.speed) * 3.6)}km/h</span><span>Wind Speed</span></p></div>
            </div>
          </div>
        ) : (<p>{weather !== null && weather.message}</p>)
      }
    </div>
  );
}
