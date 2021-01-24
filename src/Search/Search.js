import React, { useState } from 'react';
import './Search.css';



const SearchBar = (props) => {
	const [userInput, setUserInput] = useState("");
	const [newGeolocationID, setNewGeolocationID] = useState("");
	const [suggestionsListComponent, setSuggestionsListComponent] = useState();

	let cityData = require('./city.list.json');

	const suggestionEntry = (suggestion) => {
		var entry = suggestion.name;
		if (suggestion.state !== "") {
			entry = entry + ", " + suggestion.state;
		}
		if (suggestion.country !== "") {
			entry = entry + ", " + suggestion.country;
		}
		return entry;
	}
	
	const autocomplete = (event) => {
		setUserInput(event.target.value);
		if (event.target.value.length >= 3) {
			console.log(userInput);
			console.log("hit autocomplete");
			console.log(event.target.value);
			//const filteredSuggestions = cities.filter(word => (word.substring(0, event.target.value.length).toUpperCase() === event.target.value.toUpperCase()));
			const filteredSuggestions = cityData.filter(city => (city.name.substring(0, event.target.value.length).toUpperCase() === event.target.value.toUpperCase()));
			if (filteredSuggestions.length !== 0) {
				setSuggestionsListComponent(
					<ul className="autocomplete-items">
						{filteredSuggestions.map((suggestion, index) => {
							return (
								<li key={suggestion.id}  onClick={() => clickNewGeolocation(suggestion)}
									className="autocomplete-item">
									{suggestionEntry(suggestion)}
									{/* {suggestion.name}, {suggestion.state}, {suggestion.country} */}
								</li>
							);
						})}
					</ul>
				);
			} else {
				setSuggestionsListComponent(
					<p>no results</p>
				);
			}
		} else if (event.target.value.length > 0){
			const filtered = cityData.filter(city => (city.name.toUpperCase() === event.target.value.toUpperCase()));
			if (filtered.length !== 0) {
				setSuggestionsListComponent(
					<ul className="autocomplete-items">
						{filtered.map((suggestion, index) => {
							return (
								<li key={suggestion.id}  onClick={() => clickNewGeolocation(suggestion)}
									className="autocomplete-item">
									{suggestion.name}, {suggestion.state}, {suggestion.country}
								</li>
							);
						})}
					</ul>
				);
			} else {
				setSuggestionsListComponent();
			}
		} else {
			setSuggestionsListComponent();
		}
	}

	const clickNewGeolocation = (suggestion) => {
		console.log("clicked!!!");
		setUserInput(suggestion.name + suggestion.state + suggestion.country);
		setNewGeolocationID(suggestion.id);
	}

	const addNewGeolocation = (e) => {
		e.preventDefault();
		console.log("add new geolocation is called");
	}

	return (
		<div>
			<form>
				<input id="userInput" placeholder="search for a city" onChange={autocomplete} value={userInput}/>
				<button type="button" onClick={() => props.addClicked(newGeolocationID)}>+</button>
				{suggestionsListComponent}
			</form>
		</div>
	)
}

export default SearchBar;