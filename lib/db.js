'use strict';

var fs = require('fs');
var pg = require('pg');

var psqlUrl;

try {
  psqlUrl = process.env.DATABASE_URL ||
            JSON.parse(fs.readFileSync('/etc/lamassu.json')).postgresql;
}
catch (ex) {
  psqlUrl = 'psql://lamassu:lamassu@localhost/lamassu';
}

var client = new pg.Client(psqlUrl);

module.exports = client;
