var express = require('express');
var app = express();
var moment = require('moment');
var _ = require('lodash');
var chalk = require('chalk');
var timeFormat = 'dddd, MMMM Do YYYY, HH:mm:ss';
var shortTimeFormat = 'DD/MM/YY HH:mm:ss';
var now = moment().format(timeFormat);
var modRewrite = require('connect-modrewrite');
var compression = require('compression');

var LOG = require('./libraries/cloakroom/log.js');

LOG.info('Cloakroom Server Initialising...', true, 'startup', false);

app.set('port', (process.env.PORT || 5000));
app.use(require('prerender-node').set('prerenderToken', 'PzuvQlJA7jjTrPaX08u8'));
app.use(compression());

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
  '!' + extensionsPattern + '$ /index.html'
]));



app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  // console.log("[" + moment().format(shortTimeFormat) + "] Cloakroom Express server is Listening on port " + app.get('port'));
  LOG.info('Cloakroom Express server is Listening on port ' + app.get('port'), true, 'startup', false);
});
