var express = require("express");
var bodyParser = require("body-parser");
var Event = require("./event.js")
var _ = require("underscore");
var app = express();
var PORT = process.env.PORT || 3000;
var events = []; //Event objects
var eventNextId = 1;
var personID = 1;

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Event API Root");
});

app.post("/api/events/create", function (req, res) {
  console.log("create: " + req.body.name)
  var body = _.pick(req.body, "name");
  if((!_.isString(body.name)) || (body.name.trim().length === 0)) {
    return res.status(400).send();
  }

  body.name = body.name.trim(); // no spaces
  body.id = eventNextId++;
  var e = new Event(body.name, body.id);
  events.push(e);
  res.json(body);
});

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


app.listen(PORT, function () {
  console.log("Express listening on Port "+PORT);
});
