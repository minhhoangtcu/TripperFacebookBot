var fetch = require('node-fetch');
var express = require('express');
var Promise = require('bluebird');
var request = require('request');

var app = express();

// Mark: Request GET coordinates from Google Map

// function getCoordinates(location) {
// 	return new Promise(function(resolve, reject){
// 		var query = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + location + '&key=AIzaSyAGgyJhfn84IWt7Dxhjn4F3PQaW_9KrAwg'
// 		request(query, function handleApiLocationSearchResult(error, response, body) {
// 			if(error) {
// 				return reject(error);
// 			}
// 			if (response.statusCode == 200) {
// 				var info = JSON.parse(body);
// 				var lat = info.results[0].geometry.location.lat;
// 				var lon = info.results[0].geometry.location.lng;
// 				resolve({
// 					lat: lat,
// 					lon: lon
// 				});
// 			}
// 		});
// 	});
// }

function getCoordinates(location) {
	var query = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + location + '&key=AIzaSyDRtomspJIjIxyoiS0rU8ZIwq2CPOUDjKE';
	return fetch(query)
	.then(function(res) {
		return res.json();
	}).then(function(json) {
		var results = json.results;
		
		return [
			results[0].geometry.location.lat,
			results[0].geometry.location.lng
		];
	});	
}

const urlToWebServer = 'http://66.228.42.210:4994/directions/'
// const urlToWebServer = 'http://localhost:4994/directions/'

function postResults(results){
	return new Promise(function(resolve, reject){
		var options = { 
			method: 'POST',
			url: urlToWebServer,
			headers: {
				'postman-token': '6b53859c-8aac-461f-612a-3f96b7c30243',
				'cache-control': 'no-cache',
				'content-type': 'application/x-www-form-urlencoded'
			},
			form: {
				start: results[0],
				end: results[1]
			} 
		};

		request(options, function (error, response, body) {
			if (error) return reject(error);
			console.log('Request POST to server')
			resolve(body);
		});
	});
}

Promise.all([
	getCoordinates('masonic temple detroit'),
	getCoordinates('cass technical high school detroit')
	])
.then(postResults)
.then(function(result){
	console.log('Post request finished!')
})
.catch(console.log);

// Mark: Init the server

app.listen(3000, function() {
	console.log('Node app is running on port', 3000);
});