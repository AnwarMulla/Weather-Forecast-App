import React, { useEffect, useRef, useState } from 'react'
import Search_Icon from '../assets/search.png'
import Humidity_Icon from '../assets/humidity.png'
import Wind_Icon from '../assets/wind.png'
// import Clear_Icon from '../assets/clear.png'
// import Cloud_Icon from '../assets/cloud.png'
// import Drizzle_Icon from '../assets/drizzle.png'
// import Rain_Icon from '../assets/rain.png'
// import Snow_Icon from '../assets/snow.png'
import './weather.css'

const Weather = () => {

  const API_KEY_ID = "4a6bd49c80fb8438de5b70808ff45a60";
  const inputRef = useRef()
  const [weatherData, setWeatherdata] = useState(false);

  const search = async (city) => {
    if(city === "")
    {
      alert('Enter City Name')
      return
    }
    try{
      const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY_ID}`;
      const response = await fetch(base_url);
      const data = await response.json();
      if(!response.ok){
        alert('city not found');
      }
      console.log(data);
      setWeatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature:data.main.temp,
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })

    } catch (error) {
      setWeatherdata(false);
      console.error("Error  in fetching weather  data");

    }
  }

  useEffect(() => {
    search("Bengaluru");
  },[])


  return (
    <div className='weather'>
        <div className='search-bar'> 
        <input ref={inputRef} type='text' placeholder='Search' />
        <img src={Search_Icon} alt='Search Icon' onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt='Clear Icon' className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={Humidity_Icon} alt='Humidity Icon' />
            <div>
              <p>{weatherData.humidity} %</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className='col'>
            <img src={Wind_Icon} alt='Wind Icon' />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather;