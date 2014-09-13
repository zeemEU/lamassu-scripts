'use strict';

function executeQueries(db, queries, cb) {
   (function next() {
    var query = queries.shift();

    if (!query) return cb(null);

    client.query(query, function(err, response) {
      if (err) return cb(err);
      console.dir(response);
      next();
    });

  })();
}

exports.up = function(db, next) {
  executeQueries(db, [

    // drop primary key
    'ALTER TABLE transactions DROP CONSTRAINT transactions_pkey',

    // add part and is_completed fields
    'ALTER TABLE transactions ADD part integer NOT NULL DEFAULT 1',
    'ALTER TABLE transactions ADD is_completed boolean NOT NULL DEFAULT false',

    // add composite key
    'ALTER TABLE transactions ADD CONSTRAINT user_tx PRIMARY KEY(id, part)',


    // add total_satoshis and total_fiat soon
    'ALTER TABLE bills ADD total_satoshis integer NOT NULL',
    'ALTER TABLE bills ADD total_fiat integer NOT NULL'
  ],
  next);
};


// this part WILL cause problems if any value of `part` is different than 1
exports.down = function(db, next) {
  executeQueries(db, [

    // drop composite key
    'ALTER TABLE transactions DROP CONSTRAINT user_tx',

    // remove part and is_completed fields
    'ALTER TABLE transactions DROP IF EXISTS is_completed',
    'ALTER TABLE transactions DROP IF EXISTS part',

    // add composite key
    'ALTER TABLE transactions ADD PRIMARY KEY(id)',


    // drop total_satoshis and total_fiat soon
    'ALTER TABLE bills DROP IF EXISTS total_satoshis',
    'ALTER TABLE bills DROP IF EXISTS total_fiat'
  ],
  next);
};
