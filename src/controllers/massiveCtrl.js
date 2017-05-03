const express = require('express');
const massive = require('massive');
<<<<<<< HEAD
const secret = require('../../.config.js')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(3003);
const pg = require('pg');

const db = massive.connectSync({
    connectionString : "postgres://"+secret.dbUsername+":"+secret.dbPassword+"@"+secret.dbEndpoint,
    // connectionString: 'postgres://postgres:mikhail4@localhost:3001/postgres'
});
let connectionString = db.connectionString;
const pg_client = new pg.Client(connectionString);
pg_client.connect();

pg_client.query('LISTEN changed', () => {
    console.log('connected to postgres');
});

exports.getDb = (req, res, next) => {
    db.run('select * from inventory', (err, database) => {
      res.send(database);
    });
};
io.on('connection', (socket) => {
    socket.emit('connected', {connected: true});
    console.log('user connected');
    socket.on('ready for data', (data) => {
      console.log('ready for data');
        pg_client.on('notification', function(title) {
            console.log('received notification');
            console.log(title);
            socket.emit('update', {message: title});
        });
    });
});
=======
const secret = require('../../.config.js');

const db =  massive.connectSync({
  connectionString : "postgres://"+secret.dbUsername+":"+secret.dbPassword+"@"+secret.dbEndpoint
});

exports.getDb = (req, res, next) => {
  db.run('select * from inventory', (err, database) =>{
    res.send(database);
  });
};

exports.incrementProduct = (req, res, next) => {
  db.run("update inventory set quantity = (quantity + 1) where productname = $1", [param1], (err,result) => {
    res.send(database);
  });
}
>>>>>>> master
