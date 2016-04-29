'use strict';

/**
 * Module dependencies.
 */
 var express = require('express'),
 path = require('path');


module.exports.start = function start() {
		// Initialize express
	  var app = express();

    // Start the app by listening on <port> at <host>
    var port = 5000;
    var host = 'localhost';

    app.use(express.static('../../bower_components'));

    // Send requests to angular for routing
    app.get('*', function (req, res) {
  		res.sendFile(path.resolve('./modules/core/core.index.html'));
		});


    app.listen(5000, function () {
      // Create server URL
      var server = 'http://' + host + ':' + 5000;
      
      // Logging initialization
      console.log('Listening...');
      console.log('Server:          ' + server);
      console.log('--');

    });

};
