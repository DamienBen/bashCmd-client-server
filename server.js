const exec = require('child_process').exec;
const net = require('net');
const readline = require('readline');

const users = new Map();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var server = net.createServer((socket) => {
   console.log('client connected');
   socket.setEncoding('utf8');
   socket.key = `${socket.remoteAddress}:${socket.remotePort}`;
   users.set(socket.key, { socket, data: {} });
   socket.on('data', (data) => {
     try {
       handleData(data, socket);
    } catch (e) { console.error(e); }
   });
   socket.on('end', () => {
     try {
       console.log(`${users.get(socket.key).data.username}-${socket.key} disconnected from server`);
       users.delete(socket.key);
    } catch (e) { console.error(e); }
   });

});

function setUserName(data, socket) {
    const key = `${socket.remoteAddress}:${socket.remotePort}`;
    const user = users.get(key);
    users.set(key, { socket: user.socket, data: { username: data.value } });
}

function handleData(data, socket) {
  try {
    console.log(data);
    const val = JSON.parse(data);
    if (val.cmd === 'whoami') {
      setUserName(val, socket);
    }
    console.log(val.cmd, ':');
    console.log(val.value);
  } catch (e) {
    console.error(e, '\n');
  }
}

function handleCmd(line) {
  for (let entry of users.entries()) {
    try {
      entry[1].socket.write(`{ "cmd":"${line}" }`);
    } catch (e) {
      entry[1].socket.destroy();
      users.delete(entry[1]);
      console.error(e);
    }
  }
}

rl.on('line', function(line) {
  handleCmd(line);
});


server.listen(9999, () => {
  const address = server.address();
  console.log('opened server on %j', address);
});
