import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';


function App() {
  const [weather, setWeather]= useState(null) 
  const [temp, setTemp]= useState()
  const[unit, setUnit]= useState("C°")
  const handleTemp=()=>{
    if (unit==="C°") {
     setUnit("F°")
     setTemp(temp+32)      
    } else if (unit==="F°") {
      setUnit("C°")
      setTemp(temp-32)
    }
}
  useEffect(()=>{
    const handleError=()=>{
      console.log("No permitio acceder a la Ubicación")
    }
    const success=position=>{
      const lat = position.coords.latitude
      const lon= position.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a5a87624955220e76576e95ee858d367`)
      .then(res=>{
        setWeather(res.data)
        let celsius = res.data.main.temp -274.15
        celsius = Math.round(celsius)
        setTemp(celsius)
      })
    }
    navigator.geolocation.getCurrentPosition(success,handleError)
  },[])
  
  return (
    <>
    <div className="weather">
      <h1>Weather App</h1>
      <h2>{weather?.name} {weather?.sys.country}</h2>
      <div className='contain-weather'>
        <div className='weather-icon'>
          <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
          <p>{temp}{unit}</p>
          <button onClick={handleTemp}>Change F°/C°</button>
        </div>
        <div className='weather-specs'>
          <p><b>Speed of the wind:  </b>{weather?.wind.speed} hPA </p>
          <p><b>Pression:  </b> {weather?.main.pressure} hPA </p>
          <p><b>Humidity:  </b>{weather?.main.humidity} % </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;
