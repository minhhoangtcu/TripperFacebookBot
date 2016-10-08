var fetch = require('node-fetch');
var express = require('express');
var request = require('request');

var app = express();

// Mark: Request GET coordinates from Google Map

function getCoordinates(location) {
	var query = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + location + '&key=AIzaSyAGgyJhfn84IWt7Dxhjn4F3PQaW_9KrAwg'
	request(query, callback);
}

function callback(error, response, body) {
  	if (!error && response.statusCode == 200) {
    	var info = JSON.parse(body);
    	console.log(info.results[0].geometry.location.lat);
    	console.log(info.results[0].geometry.location.lng);
  	}
}

getCoordinates('masonic temple detroit')

// Mark: Request POST to another node.js server

// const options = {
//    url: '...',
//    method: 'POST',
//    body: '${data}'
// }

// request.post('localhost:3000', function optionalCallback(err, httpResponse, body) {
// 	if (err) {
// 		console.log('error')
// 	}
//  })


app.post('/ajax/testPost', function(req, res){
	res.send({success: true});
});

fetch('http://localhost:3000/ajax/testPost', { method: 'POST', body: {test: 'test'} })
    .then(function(res) {
        return res.json();
    })
    .then(function(json) {
        console.log(json);
    })
    .catch(console.log);

// Mark: Init the server

app.listen(3000, function() {
  console.log('Node app is running on port', 3000);
});