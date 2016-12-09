# Disco-Web

- Node.js REST backend for [Disco-iOS](https://github.com/AmarJayR/DiscoParty-iOS)
- Created with Express, tested by Postman and hosted with Heroku
- Created at EVHacks II by [@nishand](https://github.com/nishand), [@arnav-gudibande](https://github.com/nishand), [@AmarJayR](https://github.com/AmarJayR) and [@wchern](https://github.com/wchern)

# API Endpoints

### POST {{url}}/api/events/create
#### Creates a new event

Request: { “name”: {{event_name}} }
Response: { “secret”: {{event_secret}}}


### GET {{url}}/api/events/{{event_id}}
#### Gets the name of an event with an event ID

Response: { “name”: {{event_name}} }


### POST {{url}}/api/events/{{event_id}}/join
#### User can join an event by specifying the event ID

Request: { “fullname”: {{full_name}} }


### GET {{url}}/api/events/{{event_id}}/songs
#### Gets a list of all songs from an event ID

Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}}


### POST {{url}}/api/events/{{events_id}}/songs
#### Add a new song to the queue

Request: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}
Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}


### PUT {{url}}/api/events/{{events_id}}/songs/{{song_id}}/boost
#### Boosts a song

Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}

### GET {{url}}/api/events/{{event_id}}/pop
#### Gets next song in queue and removes it from array

Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}


### GET {{url}}/api/events/{{event_id}}/current
#### Gets the event's current song

Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}
