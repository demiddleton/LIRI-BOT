//require("dotenv").config();
var fs = require("fs");
//Use node inquirer to get user input
//var inquirer = require('inquirer');

var axios = require("axios");

var Spotify = require('node-spotify-api');

//Create variables to get user input
var command = process.argv[2];
var search = process.argv[3];

    switch (command) {
        case "concert-this":
            concertThis(search);
            break;
        case "spotify-this-song":
            spotifyThisSong(search);
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis();
            break;       
    }

//Create function to handle the concert-this command
function concertThis (search) {
    
axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
.then(function (response) {
   for (var i = 0; i < response.data.length; i++) {
  
    console.log("**************************************************");
    console.log("Name of the venue:", response.data[i].venue.name);
    console.log("Venue location:", response.data[i].venue.city); 
    console.log("Date of the Event:", response.data[i].datetime);
    console.log("**************************************************");
   }
  // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

//Create function to handle the spotify-this-song command
function spotifyThisSong (search) {
var spotify = new Spotify({
    id: ("f7ac5bf4d99e4229a5d7c8e02d2361e9"),
    secret: ("99508fdcd0724ca68e51025bb2416a22")
  });
  spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
//   .catch(function (error) {
//     console.log(error);
//   });
  }