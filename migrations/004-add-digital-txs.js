'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE digital_transactions ( ' +
    'id serial PRIMARY KEY, ' +
    'transaction_id integer references transactions(id), ' +
    'tx_hash text NULL, ' +
    'error text NULL, ' +
    'created timestamp NOT NULL DEFAULT now() )', next);
};
