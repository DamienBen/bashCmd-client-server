const exec = require('child_process').exec;
const net = require('net');
const readline = require('readline');

const cmd = 'alert "haha" || true && say "haha" || true';
const users = new Map();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//exec(`${cmd}`, (error, stdout, stderr) => {});

var server = net.createServer((socket) => {
   console.log('client connected');
   socket.setEncoding('utf8');
   socket.key = `${socket.remoteAddress}:${socket.remotePort}`;
   users.set(socket.key, { socket, data: {} });
   socket.on('data', (data) => {
     handleData(data, socket);
   });
   socket.on('end', () => {
     console.log(socket.key);
     console.log('disconnected from server');
   });

});

function setUserName(data, socket) {
    const key = `${socket.remoteAddress}:${socket.remotePort}`;
    const user = users.get(key);
    users.set(key, { socket: user.socket, data: { username: data.value } });
}

function handleData(data, socket) {
  try {
    const val = JSON.parse(data);
    if (val.cmd === 'whoami') {
      setUserName(val, socket);
    }
    console.log(val.cmd, val.value);
  } catch (e) {
    console.error(e, '\n');
  }
}

function handleCmd(line) {

  for (let entry of users.entries()) {
      entry[1].socket.write(`{ "cmd":"${line}" }`);
  }

}

rl.on('line', function(line) {
  handleCmd(line);
});


server.listen(9999, () => {
  const address = server.address();
  console.log('opened server on %j', address);
});
