'use strict';

var pg = require('pg');
var conString = process.env.DATABASE_URL;

exports.up = function(next){
  pg.connect(conString, function (err, db, done) {
    if (err) throw err;
    db.query('CREATE TABLE bills ( ' +
      'id serial PRIMARY KEY, ' +
      'device_fingerprint text NOT NULL, ' +
      'denomination integer NOT NULL, ' +
      'currency_code text NOT NULL, ' +
      'transaction_id uuid NOT NULL, ' +
      'created timestamp NOT NULL DEFAULT now() )', function (err) {
        done();
        if (err) throw err;
        next();
    });
  });
};

exports.down = function(next){
  pg.connect(conString, function (err, db, done) {
    if (err) throw err;
    db.query('DROP TABLE bills', function (err) {
      done();
      if (err) throw err;
      next();
    });
  });
};
