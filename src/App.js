import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

// top banner
import Logo from './Logo/Logo';
import SearchBar from './Search/Search';
import Login from './Login/Login';
// city-banner
import CurrGeolocation from './CurrGeolocation/CurrGeolocation';
import NewGeolocation from './NewGeolocation/NewGeolocation';
// weather details
import WeatherDetail from './WeatherDetail/WeatherDetail';

function App() {
  const [newGeolocations, setNewGeolocations] = useState([]);

  const addNewGeo = (id) => {
    setNewGeolocations([...newGeolocations, <NewGeolocation cityId={id} key={id}/>]);
  }

  return (
    <div className="App">
      <div className="top-banner">
        <Logo />
        <SearchBar addClicked={addNewGeo}/>
        <Login />
      </div>
      <div className="city-banner scroll-menu">
        <CurrGeolocation />
        {newGeolocations}
      </div>
      <div className="weather-details">
        <WeatherDetail />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
