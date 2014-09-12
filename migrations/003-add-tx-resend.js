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

    // add composite key
    'ALTER TABLE transactions ADD CONSTRAINT PRIMARY KEY(id, part)'

  ],
  next);
};

exports.down = function(db, next) {
  db.query('', next);
};
