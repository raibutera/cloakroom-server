var express = require('express');
var app = express();
var moment = require('moment');
var modRewrite = require('connect-modrewrite');

app.set('port', (process.env.PORT || 5000));


var allowedExtensions = [
  'html',
  'js',
  'map',
  'css',
  'png',
  'svg',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'woff',
  'ttf',
  'svg',
  'otf',
  'ico',
  'eot',
];

var extensionsPattern = allowedExtensions
  .map( function ( extension ) {
    return '\\.' + extension;
  })
  .join( '|' );

// ...

app.use(modRewrite([
  // '!' + extensionsPattern + '$ index.html [L]'
  '!' + extensionsPattern + '$ /index.html'
]));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Cloakroom express server is running on port " + app.get('port'));
});
