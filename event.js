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
      return sort();
    }
    this.sort = function () {
      var old = songs[];
      var ratings = [];
      for(var i = 0; i < songs.length; i++) {
        ratings.push(songs[i].boostRating);
      }
      ratings.sort(function(a, b){return b-a});
      var newSongs = [];
      for(var i = 0; i < ratings.length; i++) {
        for(var j = 0; j <old.length; j++) {
          if(ratings[i] === old[j].boostRating) {
            newSongs.push(old[j]);
            old.splice(j,1);
          }
        }
      }
      songs = newSongs;

      return songs;
    }


}



module.exports = Event
