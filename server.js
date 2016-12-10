/*jshint esversion: 6 */
/* jshint node: true */
"use strict";

var PORT = process.env.PORT || 3000;

const Event = require("./event.js");

const bodyParser = require("body-parser");
const _ = require("underscore");
const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));

// Run server to listen on port 3000.
const server = app.listen(PORT, () => {
  console.log('listening on *:3000');
});

const io = require('socket.io')(server);

var events = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinEvent', function(event_id) {
    if(Object.keys(socket.rooms).length > 1) {
      socket.emit("error", {"message": "User is already part of an event", "event": "joinEvent"});

      return;
    }

    if(parseInt(event_id) === undefined) {
      socket.emit("error", {"message": "Event does not exist", "event": "joinEvent"});

      return;
    }

    console.log("User (" + socket.id + ") joining event: " + event_id);

      socket.join(parseInt(event_id));
      events[parseInt(event_id)].addPerson(socket.id);

      socket.emit("eventInfo", events[parseInt(event_id)].json());
  });

  socket.on('getCurrentSong', () => {
    socket.emit("currentSong", {"song": events[socket.rooms[Object.keys(socket.rooms)[0]]].currentSong});
  });

  socket.on('getEventSongs', () => {
    console.log('Get songs: ' + socket.rooms[Object.keys(socket.rooms)[0]]);

    socket.emit("eventSongs", events[socket.rooms[Object.keys(socket.rooms)[0]]].getSongs());
  });

  socket.on('addSong', function(song) {
    console.log("Adding Song: " + song.name + " to event " + socket.rooms[Object.keys(socket.rooms)[0]] + " of events " + Object.keys(socket.rooms));

    events[socket.rooms[Object.keys(socket.rooms)[0]]].addSong(song.name, song.artist, song.id, 0, song.urlAlbumArt);

    io.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit('newSong', events[socket.rooms[Object.keys(socket.rooms)[0]]].getSongs()[events[Object.keys(socket.rooms)[0]].getSongs().length-1]);
  });

  socket.on('boostSong', function(song_id) {
    console.log("Boost song");

    io.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit('songBoosted', events[socket.rooms[Object.keys(socket.rooms)[0]]].boostSong(song_id));
    io.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit("eventSongs", events[socket.rooms[Object.keys(socket.rooms)[0]]].getSongs());
  });

  socket.on('popSong', () => {
    console.log("Popping song");

    io.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit('popped', events[socket.rooms[Object.keys(socket.rooms)[0]]].pop());
    io.to(socket.rooms[Object.keys(socket.rooms)[0]]).emit("eventSongs", events[socket.rooms[Object.keys(socket.rooms)[0]]].getSongs());
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// POST {{apiUrl}}/api/events/create
app.post("/api/events/create", function (req, res) {
  console.log("Create new event");

  var body = _.pick(req.body, "name");

  if((!_.isString(body.name)) || (body.name.trim().length === 0)) {
    return res.status(400).send();
  }

  var event = new Event(body.name.trim(), events.length);
  events.push(event);

  res.json(event.json());
});
