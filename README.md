# DiscoParty-Web
- NodeJS and ExpressJS REST backend for DiscoParty
- Created at EVHacks II by [@nishand](https://github.com/nishand), [@arnav-gudibande](https://github.com/nishand), [@AmarJayR](https://github.com/AmarJayR), [@wchern](https://github.com/wchern)
# Endpoints

### POST {{url}}/api/events/create
//Returns a secret event id called {{event_secret}}
Request: { “name”: {{event_name}} }
Response: { “secret”: {{event_secret}}}


### GET {{url}}/api/events/{{event_id}}
Response: { “name”: {{event_name}} }


### POST {{url}}/api/events/{{event_id}}/join
Request: { “fullname”: {{full_name}} }


### GET {{url}}/api/events/{{event_id}}/songs
Get a list of all songs 
Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}}


### POST {{url}}/api/events/{{events_id}}/songs
Add a new song to the queue
Request: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}
Response: { “name”: {{song_name}}, “artist”: {{song_artist}}, “id”, {{spotify_id}}, “urlAlbumArt”: {{url_album_art}}, “boostRating”: {{boost_rating}}}


### PUT {{url}}/api/events/{{events_id}}/songs/{{song_id}}/boost
Boost a song


### GET {{url}}/api/events/{{event_id}}/pop
Gets next song in queue and removes it from array
//Must include {{event_secret}} in the header


### GET {{url}}/api/events/{{event_id}}/current
