'use strict';

function executeQueries(db, queries, cb) {
   (function next() {
    var query = queries.shift();

    if (!query) return cb(null);

    db.query(query, function(err, response) {
      if (err) return cb(err);
      next();
    });

  })();
}

exports.up = function(db, next) {
  executeQueries(db, [

    // drop primary key
    'ALTER TABLE transactions DROP CONSTRAINT transactions_pkey',

    // add partial_id and is_completed fields
    'ALTER TABLE transactions ADD partial_id integer NOT NULL DEFAULT 1',
    'ALTER TABLE transactions ADD is_completed boolean NOT NULL DEFAULT false',

    // add composite key
    'ALTER TABLE transactions ADD CONSTRAINT user_tx PRIMARY KEY(id, partial_id)',


    // add uuid, total_satoshis and total_fiat
    'ALTER TABLE bills ADD uuid uuid UNIQUE NOT NULL DEFAULT uuid_in(md5(random()::text || now()::text)::cstring)',
    'ALTER TABLE bills ADD total_satoshis integer',
    'ALTER TABLE bills ADD total_fiat integer'
  ],
  next);
};


// this part WILL cause problems if any value of `partial_id` is different than 1
exports.down = function(db, next) {
  executeQueries(db, [

    // drop composite key
    'ALTER TABLE transactions DROP CONSTRAINT user_tx',

    // remove partial_id and is_completed fields
    'ALTER TABLE transactions DROP IF EXISTS is_completed',
    'ALTER TABLE transactions DROP IF EXISTS partial_id',

    // add composite key
    'ALTER TABLE transactions ADD PRIMARY KEY(id)',


    // drop uuid, total_satoshis and total_fiat soon
    'ALTER TABLE bills DROP IF EXISTS uuid',
    'ALTER TABLE bills DROP IF EXISTS total_satoshis',
    'ALTER TABLE bills DROP IF EXISTS total_fiat'
  ],
  next);
};
