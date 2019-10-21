var Promise = require('promise');

try { var config = require('./config.json');
	console.log('Loaded config.json');
} catch (e) {
	console.log('Critical failure while loading config.json');
	console.log((e == null ? "-" : e.stack));
	process.exit(1);
}
try { var logger = require('./logger.js');
	logger.log(logger.Severity.Info, `Loaded logger.js with uuid4: ${logger.id}`);
} catch (e) {
	console.log('Critical failure while loading logger.js');
	console.log((e == null ? "-" : e.stack));
	process.exit(1);
}
try { var YouTube = require('./YouTube.js');
	logger.log(logger.Severity.Info, `Loaded YouTube.js`);
} catch (e) {
	logger.log(logger.Severity.Critical, 'Critical failure while loading YouTube.js');
	logger.log(logger.Severity.Critical, (e == null ? "-" : e.stack));
	process.exit(1);
}

function main( ) {
	var userID;

	YouTube.GetChannelIDFromUsername(config.YouTubeAPIKey, "GoogleDevelopers")
	.then(function(result) {
		logger.debug(`Retrieved userID ${userID}`);
		userID = result.items[0].id;
		return YouTube.GetChannelPlaylistsFromID(config.YouTubeAPIKey, userID);
    }, function(err) {
		logger.error(err);
	})
	.then(function(result) {
		logger.debug(`Retrieved playlists;\n${JSON.stringify(result, null, 2)}`);
	});
}

main();
