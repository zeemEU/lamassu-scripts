'use strict';

var fs = require('fs');

var psqlUrl;

try {
  psqlUrl = process.env.DATABASE_URL ||
            JSON.parse(fs.readFileSync('/etc/lamassu.json')).postgresql;
}
catch (ex) {
  psqlUrl = 'psql://lamassu:lamassu@localhost/lamassu';
}

module.exports = psqlUrl;
