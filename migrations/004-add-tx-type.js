'use strict';

exports.up = function(db, next) {
  db.query('ALTER TABLE transactions ADD tx_type text NOT NULL DEFAULT \'buy\'', next);
};

exports.down = function(db, next){
  db.query('ALTER TABLE transactions DROP IF EXISTS tx_type', next);
};
