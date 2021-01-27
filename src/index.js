const express = require('express');
const http = require('http');
const sockjs = require('sockjs');

const incomingPort = process.env.INCOMING_PORT ?? 8108;
const outgoingPort = process.env.OUTGOING_PORT ?? 8109;

const incomingServer = express();
const webSocketServer = sockjs.createServer();
const outgoingServer = http.createServer();


const sockets = {};
const broadcast = data => {
  Object.values(sockets).forEach(conn => {
    conn.write(JSON.stringify(data));
  })
}

webSocketServer.on('connection', conn => {
  sockets[conn.id] = conn;
  conn.on('close', () => {
    delete sockets[conn.id];
  })
})

incomingServer.use(express.json());
incomingServer.post('/blob', (req, res) => {
  broadcast(req.body);
  res.setHeader('Content-Type', 'application/json')
  res.end('{"success":"true"}');
})

webSocketServer.installHandlers(outgoingServer, {prefix: '/relay'});
outgoingServer.listen(outgoingPort);
incomingServer.listen(incomingPort);