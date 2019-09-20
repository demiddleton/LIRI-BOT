//require("dotenv").config();
var fs = require("fs");
//Use node inquirer to get user input
var inquirer = require('inquirer');

var axios = require("axios");

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

function concertThis (band) {
    
axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
  function (response) {
    console.log(response);
    // console.log("Name of the venue:", response.data?);
    // console.log("Venue location:", response.data?); 
    // console.log("Date of the Event:", response.data?);
  })
  .catch(function (error) {
    console.log(error);
  });
}