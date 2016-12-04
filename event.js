var Song = require("./song.js")
var name;
var id;
var persons = [];
var songs = [];

function Event(name, id) {
    this.name = name;
    this.id = id;

    this.addPerson = function (name) {
      persons.push(name);
    }

    this.addSong = function(name, artist, id, boostRating, urlAlbumArt) {
      songs.push(new Song(name, artist, id, boostRating, urlAlbumArt));
    }

    this.getSongs = function() {
      return songs;
    }


}



module.exports = Event
