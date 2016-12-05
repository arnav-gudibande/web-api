var name;
var artist;
var id;
var boostRating;
var urlAlbumArt;

function Song(name, artist, id, boostRating, urlAlbumArt) {
  this.name = name;
  this.artist = artist;
  this.id = id;
  this.boostRating = boostRating;
  this.urlAlbumArt = urlAlbumArt;

  this.incrementBoost = function() {
    this.boostRating+=1;
  }
}

module.exports = Song
