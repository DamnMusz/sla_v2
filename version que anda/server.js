var express = require('express');
const path = require('path');
var app = express();

app.get('/', function(req,res) {
	res.sendFile(path.resolve(__dirname, '..', './www/app/build', 'index.html'));
});

// res.sendFile('./www/app/index.html', { root: __dirname });

app.listen(process.env.PORT);