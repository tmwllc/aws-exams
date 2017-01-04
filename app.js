'use strict';

var express = require('express'),
  app = express(),
  path = require('path');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'certified-developer-associate.html'));
});

app.use(function(req, res) {
  res.status(404).send('File Not Found');
});

app.use(function(error, req, res) {
  console.error(error.stack);
  res.status(505).send('Internal Server Error');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000');
});
