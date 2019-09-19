//require("dotenv").config();

//Use node inquirer to get user input
var inquirer = require('inquirer');

var axios = require("axios");

inquirer
  .prompt([
    // Prompt the user to select an option from the list
    {
      type: "list",      
      message: "Which command do you want?",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "command"      
    },
        
  ])
  .then(function(inquirerResponse) {
    console.log(inquirerResponse);
    
  

//   function userPrompt(command, userSearch) {
    // make a decision based on the command
    switch (command) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis();
            break;       
    }
// }
})

function concertThis () {

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
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