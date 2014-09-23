var express = require('express');
var app = express();
var moment = require('moment');
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
  res.sendfile('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
