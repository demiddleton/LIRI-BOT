require("dotenv").config();
var fs = require("fs");
//Use node inquirer to get user input
//var inquirer = require('inquirer');

var axios = require("axios");

var keys = require("./keys");
// console.log(keys.spotify);

var Spotify = require('node-spotify-api');

//Create variables to get user input
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

checkCommand(command, search);

function checkCommand (command, search){
switch (command) {
  case "concert-this":
    concertThis(search);
    break;
  case "spotify-this-song":
    spotifyThisSong(search);
    break;
  case "movie-this":
    movieThis(search);
    break;
  case "do-what-it-says":
    doThis();
    break;
  default:
      console.log("Please enter a command.");
      break;
}
}
//Create function to handle the concert-this command
function concertThis(search) {

  axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {

        console.log("**************************************************");
        console.log("Name of the venue: ", response.data[i].venue.name);
        console.log("Venue location: ", response.data[i].venue.city);
        console.log("Date of the Event: ", response.data[i].datetime);
      }
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Create function to handle the spotify-this-song command
function spotifyThisSong(search) {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: search }, function (err, data) {
    if (!err) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var spotifyData = data.tracks.items[i];
        //console.log(spotifyData);
        console.log("**************************************************");
        console.log("Artist(s): " + spotifyData.artists[0].name);
        console.log("Name of song: " + spotifyData.name);
        console.log("Preview Link: " + spotifyData.preview_url);
        console.log("Album: " + spotifyData.album.name);

        //Create function to add spotifyData to log.txt
        // fs.readFile("random.txt", "utf8", function (error, data) {
        //   if (error) {
        //     return console.log(red("ERROR" + error));
        //   }
        //   else {
        //     fs.appendFile('log.txt', "***************************************************");
        //     fs.appendFile('log.txt', spotifyData.artists[0].name);
        //     fs.appendFile('log.txt', spotifyData.name);
        //     fs.appendFile('log.txt', spotifyData.preview_url);
        //     fs.appendFile('log.txt', spotifyData.album.name);
        //     fs.appendFile('log.txt', "***************************************************");

        //   }
        // });

      }
    }

  });
}

//Create function to handle the movie-this command
function movieThis(search) {

  if (search === "") {
    movieThis("Mr. Nobody");
  }

  axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      //console.log(response.data);

      console.log("*******************************************************");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

//Create a function to handle the do-what-it-says command
function doThis() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(red("ERROR" + error));
    }
    else {
      var randomArray = data.split(',');
      //console.log(randomArray);
      command = randomArray[0];
      search = randomArray[1];
      checkCommand (command, search);
    }
  });
}