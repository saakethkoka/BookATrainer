const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /multplynumber
  app.post('/multplynumber', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });
    // put /updatebio
    app.put('/updatebio', (req, res) => {
        console.log(req.query.userid);
        console.log(req.query.bio);
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('UPDATE `db`.`user` SET `bio` = \'' + req.body.bio + '\' WHERE `user_id` = \'' + req.body.userid + '\' ', function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        // if there is an error with the query, log the error
                        logger.error("Problem updating user info: \n", err);
                        res.status(400).send('Problem updating info');
                    } else {
                        res.status(200).send(`changed user info for user id:${req.query.userid} to ${req.query.bio}`);
                    }
                });
            }
        });
    });
    // get a list of a user's favorited trainers
    app.get('/favoriteTrainers', (req, res) => {
        var user_id = req.query.user_id
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query("SELECT trainer_id from favorite_trainer WHERE user_id = ?;", [user_id], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        // if there is an error with the query, log the error
                        logger.error("Problem getting favorite trainers: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

    // check if user visiting a trainer's page has him favorited
    app.get('/favoriteTrainer/:userId/:trainerId', (req, res) => {
        var user_id = req.params.userId
        var trainer_id = req.params.trainerId
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query("SELECT trainer_id from favorite_trainer WHERE user_id = ? && trainer_id = ?;", [user_id, trainer_id],
                    function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        // if there is an error with the query, log the error
                        logger.error("Problem getting favorite trainers: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });
    app.post('/favoriteTrainer', (req, res) => {
        var user_id = req.body.user_id
        var trainer_id = req.body.trainer_id
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query("INSERT IGNORE INTO favorite_trainer (user_id, trainer_id) VALUES (?,?);", [user_id, trainer_id], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        // if there is an error with the query, log the error
                        logger.error("Problem favoriting trainer: \n", err);
                        res.status(400).send('Problem favoriting that trainer');
                    } else {
                        res.status(200).send("favorited trainer successfully");
                    }
                });

            }
        });
    });

    app.delete('/favoriteTrainer/:userId/:trainerId', (req, res) => {
        var user_id = req.params.userId
        var trainer_id = req.params.trainerId
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query("DELETE FROM favorite_trainer WHERE user_id = ? && trainer_id = ?;", [user_id, trainer_id], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        // if there is an error with the query, log the error
                        logger.error("Problem removing trainer from favorites: \n", err);
                        res.status(400).send('Problem removing trainer from favorites');
                    } else {
                        res.status(200).send("Removed trainer from favorites successfully");
                    }
                });

            }
        });
    });

 
  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

    // get list of all trainers
    app.get('/trainers', (req, res) => {
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) {
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT name, email, trainer.trainer_id, trainer.bio FROM `db`.`trainer` LEFT JOIN `db`.`user` on user.user_id = trainer.user_id;', function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

    // get list of all badges for all trainers
    app.get('/badges', (req, res) => {
      // obtain a connection from our pool of connections
      pool.getConnection(function (err, connection) {
          if (err) {
              // if there is an issue obtaining a connection, release the connection instance and log the error
              logger.error('Problem obtaining MySQL connection', err)
              res.status(400).send('Problem obtaining MySQL connection');
          } else {
              // if there is no issue obtaining a connection, execute query and release connection
              connection.query('select trainer.trainer_id, trainer_activities.activity_id, activity_name from db.trainer right join db.trainer_activities on trainer.trainer_id = trainer_activities.trainer_id inner join db.activities on trainer_activities.activity_id = activities.activity_id', function (err, rows, fields) {
                  connection.release();
                  if (err) {
                      logger.error("Error while fetching badges: \n", err);
                      res.status(400).json({
                          "data": [],
                          "error": "Error obtaining badges"
                      })
                  } else {
                      res.status(200).json({
                          "data": rows
                      });
                  }
              });
          }
      });
  });

  app.get('/activities', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
        if (err) {
            // if there is an issue obtaining a connection, release the connection instance and log the error
            logger.error('Problem obtaining MySQL connection', err)
            res.status(400).send('Problem obtaining MySQL connection');
        } else {
            // if there is no issue obtaining a connection, execute query and release connection
            connection.query('select activity_name from db.activities order by activity_id ', function (err, rows, fields) {
                connection.release();
                if (err) {
                    logger.error("Error while fetching badges: \n", err);
                    res.status(400).json({
                        "data": [],
                        "error": "Error obtaining badges"
                    })
                } else {
                    res.status(200).json({
                        "data": rows
                    });
                }
            });
        }
    });
});

    app.get('/trainer/:Id', (req, res) => {
        let user_id = req.params.Id;
        // obtain a connection from our pool of connections
        pool.getConnection(function (err, connection) {
            if (err) { 
                // if there is an issue obtaining a connection, release the connection instance and log the error
                logger.error('Problem obtaining MySQL connection', err)
                res.status(400).send('Problem obtaining MySQL connection');
            } else {
                // if there is no issue obtaining a connection, execute query and release connection
                connection.query('SELECT name, email, trainer.trainer_id, trainer.bio FROM `db`.`trainer` LEFT JOIN `db`.`user` on user.user_id = trainer.user_id WHERE trainer.trainer_id = ?', [user_id]
                    , function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        logger.error("Error while fetching values: \n", err);
                        res.status(400).json({
                            "data": [],
                            "error": "Error obtaining values"
                        })
                    } else {
                        res.status(200).json({
                            "data": rows
                        });
                    }
                });
            }
        });
    });

}