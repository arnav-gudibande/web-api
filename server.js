var express = require("express");
var bodyParser = require("body-parser");
var Event = require("./event.js")
var _ = require("underscore");
var app = express();
var PORT = process.env.PORT || 3000;
var events = [];
var eventNextId = 1;
var personID = 1;
var songNextID = 0;
app.use(bodyParser.urlencoded());

app.get("/", function (req, res) {
  res.send("Event API Root");
});


// POST {{apiUrl}}/api/events/:id/join

app.post("/api/events/create", function (req, res) {
  console.log("create: " + req.body.name)
  var body = _.pick(req.body, "name");
  if((!_.isString(body.name)) || (body.name.trim().length === 0)) {
    return res.status(400).send();
  }

  body.name = body.name.trim();
  body.id = eventNextId++;
  var e = new Event(body.name, body.id);
  events.push(e);
  res.json(body);
});

// GET {{apiUrl}}/api/events/:id

app.get("/api/events/:id", function (req, res) {
  var eventID = parseInt(req.params.id, 10);
  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }
  if(matchedEvent) {
    res.json(matchedEvent);
  } else {
    res.status(404).send();
  }
});

// POST {{apiUrl}}/api/events/:id/join

app.post("/api/events/:id/join", function (req, res) {
  var eventID = parseInt(req.params.id, 10);
  var body = _.pick(req.body, "fullname");
  var matchedEvent;
  if((!_.isString(body.fullname)) || (body.fullname.trim().length === 0)) {
    return res.status(400).send();
  }
  body.fullname = body.fullname.trim(); // no spaces
  body.id = personID++;

  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }
  matchedEvent.addPerson(body.fullname);
  res.json(body);
});

// GET {{apiUrl}}/api/events/:id/songs

app.get("/api/events/:id/songs", function (req, res) {
  var eventID = parseInt(req.params.id, 10);
  var matchedEvent;

  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }
  res.json(matchedEvent.getSongs());
});

// POST {{apiUrl}}/api/events/:id/songs

app.post("/api/events/:id/songs", function (req, res) {
  var eventID = parseInt(req.params.id, 10);
  var matchedEvent;

  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }
  req.body.name = req.body.name.trim();
  req.body.artist = req.body.artist.trim();
  req.body.id = req.body.id.trim();
  req.body.urlAlbumArt = req.body.urlAlbumArt.trim();
  req.body.boostRating = req.body.boostRating.trim();

  req.body.boostRating = parseInt(req.body.boostRating, 10);

  matchedEvent.addSong(req.body.name, req.body.artist, req.body.id, req.body.boostRating, req.body.urlAlbumArt);
  res.json(req.body);
});


// PUT {{apiUrl}}/api/events/:id/songs/:id/boost

app.put("/api/events/:id/songs/:sid/boost", function (req, res) {
  var eventID = parseInt(req.params.id, 10);
  var songID = req.params.sid;
  var matchedEvent;

  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }
  console.log(songID);
  matchedEvent.boostSong(songID);
  res.json(matchedEvent.getSongs());
});

//GET {{apiUrl}}/api/events/:id/pop

app.get("/api/events/:id/pop", function (req, res) {
  var eventID = parseInt(req.params.id, 10);
  var matchedEvent;
  console.log("Got called POP");

  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }

  res.json(matchedEvent.getSongs()[0]);
  matchedEvent.setCurrentSong(matchedEvent.getSongs()[0]);
  matchedEvent.getSongs().splice(0,1);

});

app.get("/api/events/:id/currentSong", function(req, res) {
  var eventID = parseInt(req.params.id, 10);
  var matchedEvent;

  for(var i=0; i<events.length; i++) {
    if(eventID===events[i].id) {
      matchedEvent = events[i];
    }
  }

  res.json(matchedEvent.getCurrentSong());

})

app.listen(PORT, function () {
  console.log("Express listening on Port "+PORT);
});
