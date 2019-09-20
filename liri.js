//require("dotenv").config();
var fs = require("fs");
//Use node inquirer to get user input
//var inquirer = require('inquirer');

var axios = require("axios");

//Create variables to get user input
var command = process.argv[2];
var search = process.argv[3];

    switch (command) {
        case "concert-this":
            concertThis(search);
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis();
            break;       
    }

function concertThis (search) {
    
axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
.then(function (response) {
    //console.log(response);
    console.log("**************************************************");
    console.log("Name of the venue:", response.data[0].venue.name);
    console.log("Venue location:", response.data[0].venue.city); 
    console.log("Date of the Event:", response.data[0].venue.date);
    console.log("**************************************************");
  })
  .catch(function (error) {
    console.log(error);
  });
}