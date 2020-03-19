const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  router.post('/register', (req, res, next) => {
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?,?,?)',
      [req.body.username, req.body.email, req.body.password],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/login', function (req, res, next) {
    db.query(
      'SELECT username, password FROM users WHERE owner=? ',
      [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  // the routes are defined here

  return router;
}

module.exports = createRouter;