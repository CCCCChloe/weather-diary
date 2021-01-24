import React, {useState, useEffect} from 'react';
import './CurrGeolocation.css';

const getTime = () => { 
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let now = new Date();
	let currMonth = months[now.getMonth()];
	let currWeekday = weeks[now.getDay()];
	let hour = now.getHours();
	let ampm = hour >= 12 ? "pm" : "am";
	hour = hour % 12;
	hour = hour ? hour : 12;
	let timeString = currWeekday + " " + hour + ampm;
	return timeString;
}

const CurrGeolocation = () => {
	const [city, setCity] = useState();
	const [time, setTime] = useState(getTime());
	const [temp, setTemp] = useState();
	const [description, setDescription] = useState();
	const [icon, setIcon] = useState();

	async function fetchData() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				const apiKey = process.env.WEATHER_API_KEY;
				const urlString = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
				//const urlString = "https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=" + lat + "&lon=" + lon + "&units=imperial";
				fetch(urlString)
					.then(res => res.json())
					.then((data) => {
							//console.log(data);
							setCity(data.name);
							setTemp(Math.round(data.main.temp));
							setDescription(data.weather[0].description);
							let icon = data.weather[0].icon.substring(0, 2);
							setIcon(process.env.PUBLIC_URL + "/WeatherIcons/" + icon + ".svg");
					})
					.catch(err => console.log(err));
			});
		} else {
			console.log("Geolocation not available");
		}
	}

	useEffect(() => {
		fetchData();
	}, []);
	

	return (
		<div className="city">
			<p className="city-name">{city}</p>
			<p className="time">{time}</p>
			<p className="temp-unit">
				<span className="temp">{temp}</span>
				<span className="unit">°F</span>
			</p>
			<img className="icon" src={icon} alt="weather icon"/>
			<p className="description">{description}</p>
		</div>
	);
}

export default CurrGeolocation;