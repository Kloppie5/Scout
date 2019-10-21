var Promise = require('promise');
var Request = require("request");

// Quota: 10000 units per day

function GetChannelIDFromUsername ( key, username ) { // Quota cost: 1
	return new Promise(function(resolve, reject) {
		Request.get({
			url:
				`https://www.googleapis.com/youtube/v3/channels?`+
				`part=id&`+
				`forUsername=${username}&`+
				`key=${key}`
		}, function(err, resp, body) {
			if (err) reject(err);
			else resolve(JSON.parse(body));
		})
	})
}
function GetChannelPlaylistsFromID ( key, id ) { // Quota cost: 5
	return new Promise(function(resolve, reject) {
		Request.get({
			url:
				`https://www.googleapis.com/youtube/v3/playlists?`+
				`part=snippet,contentDetails&`+
				`channelId=${id}&`+
				`key=${key}`
		}, function(err, resp, body) {
			if (err) reject(err);
			else resolve(JSON.parse(body));
		})
	})
}

module.exports.GetChannelIDFromUsername = GetChannelIDFromUsername;
module.exports.GetChannelPlaylistsFromID = GetChannelPlaylistsFromID;
