'use strict';

/**
 * Module dependencies.
 */
 var express = require('express'),
 		 bodyParser = require('body-parser'),
	   morgan = require('morgan'),
	   methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
     path = require('path');


module.exports.start = function start() {
		// Initialize express
	  var app = express();

    // Start the app by listening on <port> at <host>
    var port = 5000;
    var host = 'localhost';

    app.use(express.static(path.resolve('./modules/core')));
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


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
