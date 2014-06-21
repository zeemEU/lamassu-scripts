'use strict';

var pg = require('pg');
var conString = process.env.DATABASE_URL;

exports.up = function(next){
  pg.connect(conString, function (err, db, done) {
    if (err) throw err;
    db.query('CREATE TABLE bill_validator_events ( ' +
      'id serial PRIMARY KEY, ' +
      'event_type text NOT NULL, ' +
      'note text, ' +
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
    db.query('DROP TABLE bill_validator_events', function (err) {
      done();
      if (err) throw err;
      next();
    });
  });
};
