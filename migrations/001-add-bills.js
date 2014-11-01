'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE bills ( ' +
    'id serial PRIMARY KEY, ' +
    'device_fingerprint text NOT NULL, ' +
    'denomination integer NOT NULL, ' +
    'currency_code text NOT NULL, ' +
    'satoshis integer NOT NULL, ' +
    'to_address text NOT NULL, ' +
    'transaction_id uuid NOT NULL, ' +
    'device_time bigint NOT NULL, ' +
    'created timestamp NOT NULL DEFAULT now() )', next);
};

exports.down = function(db, next){
  db.query('DROP TABLE bills', next);
};
