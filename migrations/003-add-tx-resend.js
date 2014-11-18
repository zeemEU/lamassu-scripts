'use strict';

function executeQueries(db, queries, cb) {
   (function next() {
    var query = queries.shift();

    if (!query) return cb(null);

    db.query(query, function(err) {
      if (err) return cb(err);
      next();
    });

  })();
}

exports.up = function(db, next) {
  executeQueries(db, [
    'ALTER TABLE transactions DROP IF EXISTS completed',
    'ALTER TABLE transactions DROP IF EXISTS is_completed',
    'ALTER TABLE transactions DROP IF EXISTS partial_id',
    'ALTER TABLE bills DROP IF EXISTS uuid',
    'ALTER TABLE bills DROP IF EXISTS total_satoshis',
    'ALTER TABLE bills DROP IF EXISTS total_fiat',
    'ALTER TABLE transactions DROP CONSTRAINT transactions_pkey',
    'ALTER TABLE transactions RENAME id TO txid',
    'ALTER TABLE transactions ADD COLUMN id SERIAL',
    'UPDATE transactions SET id = DEFAULT',
    'ALTER TABLE transactions ADD PRIMARY KEY (id)',
    'CREATE INDEX ON transactions (txid)',
    'ALTER TABLE transactions ADD CONSTRAINT transactions_txid_status UNIQUE (txid,status)'
  ],
  next);
};
