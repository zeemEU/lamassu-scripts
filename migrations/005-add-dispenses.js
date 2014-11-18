'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE dispenses ( ' +
    'id serial PRIMARY KEY, ' +
    'transaction_id integer references transactions(id), ' +
    'dispense1 integer NOT NULL, ' +
    'reject1 integer NOT NULL, ' +
    'count1 integer NOT NULL, ' +
    'dispense2 integer NOT NULL, ' +
    'reject2 integer NOT NULL, ' +
    'count2 integer NOT NULL, ' +
    'refill boolean NOT NULL, ' +
    'error text NULL, ' +
    'created timestamp NOT NULL DEFAULT now() )', next);
};
