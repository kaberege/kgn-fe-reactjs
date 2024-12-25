
export async function FetchWeatherData(city:string){
    const id:string = "3d735c169cd8481b1c8153c9753f5971";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${id}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

