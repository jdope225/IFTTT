// server.js
// where your node app starts

// init project
var express = require('express');
var request = require('request');
var app = express();
var IFTTT_Id = "b2VEhXWJLP3BbSObeqzqT7";
var baseURL = "https://maker.ifttt.com/trigger/";
var withKey = "/with/key/";
var IFTTT_Event_Names = ["bluetooth_on", "play_song"];

// Show the homepage
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

// Handle requests from IFTTT
app.post("/", function (request, response) {
  for(var i=0; i < IFTTT_Event_Names.length; i++){
    triggerIFTTTEvent(IFTTT_Event_Names[i]);
  }
  response.end();
}); 

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function triggerIFTTTEvent(triggerName){IFTTT_Id
    // Make a request to baseURL + triggerName + withKey + iftttId, which is the complete IFTTT Maker Request URL
    request(baseURL + triggerName + withKey + IFTTT_Id, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the response from IFTTT
      }
    });
}