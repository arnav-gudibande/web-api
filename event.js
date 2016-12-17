var Song = require("./song.js");

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
      //return this.sort();
      return this.songs;
    };

    this.getCurrentSong = function() {
      return this.currentSong;
    };

    this.isDuplicate = function(songID) {
        for(var i = 0; i < this.songs.length; i++) {
            if(songID === this.songs[i].id) {
                return true;
            }
        }

        return false;
    };

    this.returnLastSong = function() {
        return this.songs[this.songs.length-1];
    }

    this.boostSong = function(songID) {
      for (var i = 0; i < this.songs.length; i++) {
        if(this.songs[i].id === songID) {
          this.songs[i].incrementBoost();


          if(i >= 1 && this.songs[i].boostRating > this.songs[i-1].boostRating) {
            this.songs.swap(i, i-1);

            var flag = true;
            var movedUp = 1;
            while (flag) {
              if (i-movedUp-1 < 0) {
                flag = false;
                break;
              }

              if (this.songs[i-movedUp].boostRating > this.songs[i-movedUp-1].boostRating) {
                this.songs.swap(i-movedUp, i-movedUp-1);
                movedUp += 1;
              } else {
                flag = false;
              }
            }


            return {"data": this.songs[i-movedUp], "oldIndex":i, "newIndex": i-movedUp};

          } else {
            return {"data": this.songs[i], "oldIndex":i, "newIndex": i};
          }

          break;
        }
      }
    };

    this.pop = function() {
      this.currentSong = this.songs.shift();

      return this.currentSong;
    };

    this.json = function() {
      return {"name": this.name, "id": this.id+"", "songs": this.getSongs(), "currentSong": this.currentSong};
    };
}

Array.prototype.swap = function(indexA, indexB) {
   swapArrayElements(this, indexA, indexB);
};

var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

module.exports = Event;
