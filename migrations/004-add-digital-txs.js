'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE digital_transactions ( ' +
    'id serial PRIMARY KEY, ' +
    'transaction_id integer references transactions(id), ' +
    'status text, ' +
    'incoming boolean, ' +
    'satoshis integer, ' +
    'tx_hash text NULL, ' +
    'error text NULL, ' +
    'created timestamp NOT NULL DEFAULT now(), ' +
    'CONSTRAINT digital_transactions_status_txid UNIQUE(status, transaction_id) ' +
  ')', next);
};
