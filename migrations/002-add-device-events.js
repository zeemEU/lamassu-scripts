'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE device_events ( ' +
    'id serial PRIMARY KEY, ' +
    'device_fingerprint text NOT NULL, ' +
    'event_type text NOT NULL, ' +
    'note text, ' +
    'device_time bigint NOT NULL, ' +
    'created timestamp NOT NULL DEFAULT now() )', next);
};

exports.down = function(db, next) {
  db.query('DROP TABLE device_events', next);
};
