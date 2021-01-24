import React, {useState, useEffect} from 'react';


const getLocalTime = (offset) => {
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let UTC = new Date().getTime();
	let now = new Date(UTC + offset);
	console.log(UTC + offset);
	console.log(UTC);
	let currMonth = months[now.getMonth()];
	let currWeekday = weeks[now.getDay()];
	let hour = now.getHours();
	let ampm = hour >= 12 ? "pm" : "am";
	hour = hour % 12;
	hour = hour ? hour : 12;
	let timeString = currWeekday + " " + hour + ampm;
	return timeString;
}

const NewGeolocation = (props) => {
	const [city, setCity] = useState();
	const [time, setTime] = useState();
	const [temp, setTemp] = useState();
	const [description, setDescription] = useState();
	const [icon, setIcon] = useState();
	async function fetchData() {
		const apiKey = process.env.WEATHER_API_KEY;
		const urlString = "https://api.openweathermap.org/data/2.5/weather?id=" + props.cityId + "&appid=" + apiKey + "&units=imperial";
		//const urlString = "https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=" + lat + "&lon=" + lon + "&units=imperial";
		fetch(urlString)
			.then(res => res.json())
			.then((data) => {
					//console.log(data);
					setCity(data.name);
					console.log(data.timezone);
					setTime(getLocalTime(data.timezone));
					setTemp(Math.round(data.main.temp));
					setDescription(data.weather[0].description);
					let icon = data.weather[0].icon.substring(0, 2);
					setIcon(process.env.PUBLIC_URL + "/WeatherIcons/" + icon + ".svg");
			})
			.catch(err => console.log(err));
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

export default NewGeolocation;