'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE bill_validator_events ( ' +
    'id serial PRIMARY KEY, ' +
    'event_type text NOT NULL, ' +
    'note text, ' +
    'created timestamp NOT NULL DEFAULT now() )', next);
};

exports.down = function(db, next) {
  db.query('DROP TABLE bills', next);
};
