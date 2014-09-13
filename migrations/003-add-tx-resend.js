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

    // add part field
    'ALTER TABLE transactions ADD part integer NOT NULL DEFAULT 1',

    // add completed field
    'ALTER TABLE transactions ADD is_completed boolean NOT NULL DEFAULT false',

    // add composite key
    'ALTER TABLE transactions ADD CONSTRAINT user_tx PRIMARY KEY(id, part)'
  ],
  next);
};


// this part WILL cause problems if any value of `part` is different than 1
exports.down = function(db, next) {
  executeQueries(db, [

    // drop composite key
    'ALTER TABLE transactions DROP CONSTRAINT user_tx',

    // remove completed field
    'ALTER TABLE transactions DROP IF EXISTS is_completed',

    // remove part field
    'ALTER TABLE transactions DROP IF EXISTS part',

    // add composite key
    'ALTER TABLE transactions ADD PRIMARY KEY(id)'
  ],
  next);
};
