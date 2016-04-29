'use strict';

/**
 * Module dependencies.
 */
 var express = require('express'),
 		 bodyParser = require('body-parser'),
	   morgan = require('morgan'),
	   methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
     path = require('path');

var accountSid = 'ACfa8895b0fea34a097fa44440209418ee';
var authToken = "b52d500c1adb29556f15b3d48d19417f";
var client = require('twilio')(accountSid, authToken);

module.exports.start = function start() {
		// Initialize express
	  var app = express();

    // Start the app by listening on <port> at <host>
    var port = process.env.PORT || 5000;
    var host = 'local.virtualartista.co';


    app.use(express.static(path.resolve('./modules/')));
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    // Send requests to angular for routing
    app.get('*', function (req, res) {
  		res.sendFile(path.resolve('./modules/core/core.index.html'));
		});

    app.post('/message/send', function (req, res) {

      client.messages.create({
          body: req.body.msg,
          to: req.body.to_number,
          from: req.body.from_number
      }, function(err, message) {
          if(!err) {
            return res.send(message);
          }
          return res.send(message);
      });

    });


    app.listen(port, function () {
      // Create server URL
      var server = 'http://' + host + ':' + 5000;
      
      // Logging initialization
      console.log('Listening...');
      console.log('Server:          ' + server);
      console.log('--');

    });

};
