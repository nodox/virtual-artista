'use-strict';

var app = angular.module('virtualArtista', []);

app.controller('CoreController', function ($scope, $http) {

	$scope.members = [
		{ name: 'Steven Natera',
			info: {
				number: '+16463269665'			
			}
		},
		{ name: 'Christopher Holt',
			info: {
				number: '+16098156370'
			}
		}];

	$scope.greeting = 'Welcome to TechArtista!';
	$scope.directions = 'Select the name of the person you want \
												to contact and we will notify them of your arrival.';

	$scope.sendSMS = function (obj){
		var twilio_num = '+13142793690';
		var sms_msg = 'Hey ' + obj.name + ', there is a guest waiting for you at the front desk.';
		
		var smsData = {
			from_number: twilio_num,
			to_number: obj.info.number,
			msg: sms_msg
		};


		$http.post('/message/send', smsData).then(function (res) {
			console.log(res);
		}, function(err){
			console.log(err);
		});

	};

});
