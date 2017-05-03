const express = require('express');
const massive = require('massive');
const cors = require('cors');
const massiveCtrl = require('./src/controllers/massiveCtrl.js');
const app = express();

app.use(cors());

app.use(express.static('build'))

app.get('/inventory', massiveCtrl.getDb);

app.listen(3001, () => {console.log('listening on port 3001')});
