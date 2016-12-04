var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var songIDs = [];
var songVotes = [];
var PORT = process.env.PORT || 3000;
app.use(bodyparser.json());

app.get("/", function() {

})

app.listen(PORT, function() {
  console.log("Running on " + PORT);
});
