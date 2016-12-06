var express = require("express");
var bodyParser = require("body-parser");
var Event = require("./event.js");
var _ = require("underscore");

var app = express();
var PORT = process.env.PORT || 3000;

var events = [];

app.use(bodyParser.urlencoded());

app.get("/", function (req, res) {
  res.send("Events API Root");
});


// POST {{apiUrl}}/api/events/create
app.post("/api/events/create", function (req, res) {
  var body = _.pick(req.body, "name");

  if((!_.isString(body.name)) || (body.name.trim().length === 0)) {
    return res.status(400).send();
  }

  body.name = body.name.trim();
  body.id = events.length;
  events.push(new Event(body.name, body.id));
  res.json(body);
});

// GET {{apiUrl}}/api/events/:id
app.get("/api/events/:id", function (req, res) {
  console.log(events);
  if (events[req.params.id] !== undefined) {
    res.json(events[req.params.id]);
  } else {
    res.status(404).send();
  }
});

// POST {{apiUrl}}/api/events/:id/join
app.post("/api/events/:id/join", function (req, res) {
  var body = _.pick(req.body, "fullname");

  console.log("Join Request for Event: " + eventID);

  if((!_.isString(body.fullname)) || (body.fullname.trim().length === 0)) {
    return res.status(400).send();
  }

  events[req.params.id].addPerson(body.fullname);

  res.json(body);
});

// GET {{apiUrl}}/api/events/:id/songs
app.get("/api/events/:id/songs", function (req, res) {
  console.log("Retrieving list of songs");

  if (events[req.params.id] === undefined) {
    res.status(404).send();
    return;
  }

  res.json(events[req.params.id].getSongs());
});

// POST {{apiUrl}}/api/events/:id/songs
app.post("/api/events/:id/songs", function (req, res) {
  //TODO: validate these values

  req.body.name = req.body.name.trim();
  req.body.artist = req.body.artist.trim();
  req.body.id = req.body.id.trim();
  req.body.urlAlbumArt = req.body.urlAlbumArt.trim();

  events[req.params.id].addSong(req.body.name, req.body.artist, req.body.id, 0, req.body.urlAlbumArt);

  res.json(req.body);
});


// PUT {{apiUrl}}/api/events/:id/songs/:id/boost
app.put("/api/events/:id/songs/:song_id/boost", function (req, res) {
  if (events[req.params.id] === undefined) {
    res.status(404).send();
    return;
  }

  console.log("Boosting " + req.params.song_id);

  events[req.params.id].boostSong(req.params.song_id);
  res.json(events[req.params.id].getSongs());
});

//GET {{apiUrl}}/api/events/:id/pop
app.get("/api/events/:id/pop", function (req, res) {
  if (events[req.params.id] === undefined) {
    res.status(404).send();
    return;
  }

  res.json(events[req.params.id].getSongs()[0]);
  events[req.params.id].setCurrentSong(events[req.params.id].getSongs()[0]);
  events[req.params.id].getSongs().splice(0,1);
});

app.get("/api/events/:id/currentSong", function(req, res) {
  if (events[req.params.id] === undefined) {
    res.status(404).send();
    return;
  }

  res.json(events[req.params.id].getCurrentSong());
});

app.listen(PORT, function () {
  console.log("Express listening on Port "+PORT);
});
