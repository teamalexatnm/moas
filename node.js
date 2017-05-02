const express = require('express');
const massive = require('massive');
const cors = require('cors');
const massiveCtrl = require('./src/controllers/massiveCtrl.js');
const app = express();

app.use(cors());

app.use(express.static('build'))

app.get('/inventory', massiveCtrl.getDb);
// app.put('/inventory/increment:id', massiveCtrl.increment);
// app.put('/inventory/decrement:id', massiveCtrl.decrement);
// app.put('/inventory/lemon', massiveCtrl.lemon);

app.listen(3002, () => {console.log('listening on port 3002')});
