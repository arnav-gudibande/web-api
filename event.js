var Song = require("./song.js")

function Event(name, id) {
    this.name = name;
    this.id = id;
    this.songs = [];
    this.currentSong = undefined;
    this.persons = [];


    this.addPerson = function (name) {
      this.persons.push(name);
    };

    this.addSong = function(name, artist, id, boostRating, urlAlbumArt) {
      this.songs.push(new Song(name, artist, id, boostRating, urlAlbumArt));
    };

    this.getSongs = function() {
      return this.sort();
    }

    this.setCurrentSong = function(song) {
      this.currentSong = song;
    }

    this.getCurrentSong = function() {
      return this.currentSong;
    }

    this.boostSong = function(songID) {
      for (var i = 0; i < this.songs.length; i++) {
        if(this.songs[i].id === songID) {
          this.songs[i].incrementBoost();
        }
      }

    }

    this.sort = function () {
      var shouldSort = false;
      for(var i = 1; i < this.songs.length; i++) {
        if(this.songs[i].boostRating > this.songs[i-1].boostRating) {
          shouldSort = true;
        }
      }
      if(shouldSort === true) {
        var old = this.songs;
        var ratings = [];
        for(var i = 0; i < this.songs.length; i++) {
          ratings.push(this.songs[i].boostRating);
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
        this.songs = newSongs;
    }
      return this.songs;
    }


}



module.exports = Event
