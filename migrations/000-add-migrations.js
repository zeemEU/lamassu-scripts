'use strict';

exports.up = function(db, next) {
  db.query('CREATE TABLE migrations ( ' +
    'id serial PRIMARY KEY, ' +
    'version integer NOT NULL)', function (err) {
      if (err) return next(err);
      db.query('INSERT INTO migrations (version) VALUES (0)', next);
  });
};

exports.down = function(db, next){
  db.query('DROP TABLE migrations', next);
};
