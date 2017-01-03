var express = require('express'),
	app = express(),
	path = require('path');

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'certified-developer-associate.html'));
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000');
});