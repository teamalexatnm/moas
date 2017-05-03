const express = require('express');
const cors = require('cors');
const massiveCtrl = require('./src/controllers/massiveCtrl.js');
const app = express();

app.use(cors());

app.use(express.static('build'))

app.get('/inventory', massiveCtrl.getDb);
app.put('/inventory', massiveCtrl.incrementProduct);

app.listen(3001, () => {console.log('listening on port 3001')});
