/*jshint esversion: 6 */
/* jshint node: true */

var request = require('request');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_CALLBACK_URL = "discoparty://returnAfterLogin";
const AUTH_HEADER = "Basic " + new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64');
const SPOTIFY_ACCOUNTS_ENDPOINT = "https://accounts.spotify.com";

function swap(req, res) {
  var options = {
    url: SPOTIFY_ACCOUNTS_ENDPOINT+'/api/token',
    headers: { "Authorization": AUTH_HEADER, 'content-type' : 'application/x-www-form-urlencoded' },
    body:    "code=" + req.body.code + "&grant_type=authorization_code&redirect_uri=" + CLIENT_CALLBACK_URL
  };

  function callback(error, response, body) {
    var info = JSON.parse(body);
    res.json(info);
  }

  request.post(options, callback);
}

module.exports.swap = swap;

function refresh(req, res) {
  var options = {
    url: SPOTIFY_ACCOUNTS_ENDPOINT+'/api/token',
    headers: { "Authorization": AUTH_HEADER, 'content-type' : 'application/x-www-form-urlencoded' },
    body:    "refresh_token=" + req.body.refresh_token + "&grant_type=refresh_token"
  };

  function callback(error, response, body) {
    var info = JSON.parse(body);
    res.json(info);
  }

  request.post(options, callback);
}

module.exports.refresh = refresh;
