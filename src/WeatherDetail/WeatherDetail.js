import React, {useState} from 'react';
import * as V from 'victory';
import {VictoryBar, VictoryChart, VictoryAxis, 
	VictoryTheme, VictoryStack} from 'victory';
import './WeatherDetail.css';

const WeatherDetail = () => {

	async function fetchData() {
		const apiKey = process.env.WEATHER_API_KEY;
		const urlString = "https://api.openweathermap.org/data/2.5/onecall?lat=18&lon=-180" + "&appid=" + apiKey;
		fetch(urlString)
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => console.log(err))
	}

	const data = [
		{quarter: 1, earnings: 13000},
		{quarter: 2, earnings: 16500},
		{quarter: 3, earnings: 14250},
		{quarter: 4, earnings: 19000}
	];

	const data2012 = [
		{quarter: 1, earnings: 13000},
		{quarter: 2, earnings: 16500},
		{quarter: 3, earnings: 14250},
		{quarter: 4, earnings: 19000}
	];
	
	const data2013 = [
		{quarter: 1, earnings: 15000},
		{quarter: 2, earnings: 12500},
		{quarter: 3, earnings: 19500},
		{quarter: 4, earnings: 13000}
	];
	
	const data2014 = [
		{quarter: 1, earnings: 11500},
		{quarter: 2, earnings: 13250},
		{quarter: 3, earnings: 20000},
		{quarter: 4, earnings: 15500}
	];
	
	const data2015 = [
		{quarter: 1, earnings: 18000},
		{quarter: 2, earnings: 13250},
		{quarter: 3, earnings: 15000},
		{quarter: 4, earnings: 12000}
	];

	return (
		<div>
			<VictoryChart domainPadding={20} theme={VictoryTheme.material}>
				<VictoryAxis
					tickValues = {[1, 2, 3, 4]}
					tickFormat = {["quarter1", "quarter2", "quarter3", "quarter4"]}
				/>
				<VictoryAxis 
					dependentAxis
					tickFormat={(x) => (`$${x / 1000}k`)}
				/>
				<VictoryStack colorScale={"warm"}>
					<VictoryBar 
						data = {data2012}
						x = "quarter"
						y = "earnings"
					/>
					<VictoryBar 
						data = {data2013}
						x = "quarter"
						y = "earnings"
					/>
					<VictoryBar 
						data = {data2014}
						x = "quarter"
						y = "earnings"
					/>
					<VictoryBar 
						data = {data2015}
						x = "quarter"
						y = "earnings"
					/>
				</VictoryStack>
				
			</VictoryChart>
		</div>
	);
}

export default WeatherDetail;