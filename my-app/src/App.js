// import logo from './logo.svg';
import { useState, useEffect } from "react"
import axios from 'axios';
import './App.css';

function App() {
  const getMode = () => {
    return JSON.parse(localStorage.getItem("Mode") || false)
  }
  const [dark, setMode] = useState(getMode());

  useEffect(() => {
    localStorage.setItem("Mode", JSON.stringify(dark))
  }, [dark])
  const [weather, setweather] = useState(null)
  const [city, setcity] = useState("Karachi")

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5137cb42808b5da95b37e2cfa94517a4&units=metric`)

      .then(res => {
        const newWeather = res.data;
        console.log(newWeather);

        setweather(newWeather);

      });

  }, [city]);

  return (
    <div className={dark ? "dark-mode" : ""}>
      <div style={{fontFamily:"fantasy",fontSize:"53px"}}>
        WEATHER
      </div>
      <br/>
      <div>
        <input
          type="text"
          className = "input"
          onChange={(event) => { setcity(event.target.value) }}
        />
      </div>
      <div className="content">
        {
          (weather !== null) ?
            <>
              <h1>{city} Weather</h1>
              <h2 style={{position:"relative",right:"10px",top:'10px'}}>{weather?.weather[0].description}</h2>
              <h1 style={{fontFamily:'fantasy',fontSize:"100px",position:"relative",top:'-50px'}}>{weather?.main?.temp}</h1>
              {/* <h2 style={{fontSize:"50px",position:"relative",top:'-300px',right:'100px',left:"0px"}}>℃</h2> */}
              <h2 style={{position:"relative",top:'-70px'}}>Feels Like: {weather?.main?.feels_like}</h2>
              <h2 style={{position:"relative",top:'-60px'}}>Wind Speed: {weather?.wind.speed}</h2>
            </>
            :
            <h1>Loading...</h1>
        }

      </div>
      <div className="nav">
        <label class="switch">
          <input type="checkbox"
            checked={dark}
            onChange={() => setMode(!dark)}
          />
          <span class="slider round"></span>
        </label>
      </div>
      
    </div>
  );
}


export default App;
