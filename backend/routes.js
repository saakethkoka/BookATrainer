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
  // POST /createTrainerAccount
  app.post('/createTrainerAccount', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var gender = req.body.gender
    var city = req.body.city // Not Required
    var bio = req.body.bio  // Not Required
    var password = req.body.password

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO user (name, email, gender, city, user_type, password)" +
            " VALUES(?,?,?,?,'TRAINER',?)" , [name, email, gender, city, password], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          }
        });
        connection.query("INSERT INTO trainer (user_id, bio)" +
            " VALUES((SELECT user_id FROM user WHERE email=?),?)" , [email ,bio], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            var trainer_id = rows.insertId
            res.status(200).send({"trainer_id" : trainer_id});
          }
        });
      }
    });


  });

  // POST /createTraineeAccount
  app.post('/createTraineeAccount', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var gender = req.body.gender
    var city = req.body.city // Not Required
    var password = req.body.password

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO user (name, email, gender, city, user_type, password)" +
            " VALUES(?,?,?,?,'TRAINEE',?)" , [name, email, gender, city, password], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          }
        });
        connection.query("INSERT INTO trainee (user_id)" +
            " VALUES((SELECT user_id FROM user WHERE email=?))" , [email], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            var trainee_id = rows.insertId
            res.status(200).send({"trainee_id" : trainee_id});
          }
        });
      }
    });


  });

  // POST /createTraineeActivity
  app.post('/createTraineeActivity', (req, res) => {
    var trainee_id = req.body.trainee_id
    var activity = req.body.activity
    activity = activity.toLowerCase() // Making it so all activities are consistent
    let activity_id
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO activities (activity_name) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS (SELECT activity_name FROM activities WHERE activity_name=?)", [activity, activity], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into activities table');
          } else {
            activity_id = rows.insertId
          }
        });

        connection.query("INSERT INTO trainee_activities(trainee_id, activity_id) VALUES (?, (SELECT activity_id FROM activities WHERE activity_name = ?))", [trainee_id, activity], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into activities table');
          } else {
            res.status(400).send("Inserted activity into table and assigned it to the trainee successfully");
          }
        });

      }
    });
  });

  // POST /createTrainerActivity
  app.post('/createTrainerActivity', (req, res) => {
    var trainer_id = req.body.trainer_id
    var activity = req.body.activity
    var hourlyRate = req.body.hourly_rate
    activity = activity.toLowerCase() // Making it so all activities are consistent
    let activity_id
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO activities (activity_name) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS (SELECT activity_name FROM activities WHERE activity_name=?)", [activity, activity], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into activites table: \n", err);
            res.status(400).send('Problem inserting into activities table');
          } else {
            activity_id = rows.insertId
          }
        });
        connection.query("INSERT INTO trainer_details(trainer_id, activity_id, hourly_cost) VALUES (?, (SELECT activity_id FROM activities WHERE activity_name = ?), ?)", [trainer_id, activity, hourlyRate], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into trainer_details table');
          } else {
            res.status(400).send("Inserted activity into table and assigned it to the trainer successfully");
          }
        });

      }
    });
  });

  // GET /userType/{user_id}
  app.get('/userType', (req, res) => {
    var user_id = req.param("user_id");

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT user_type FROM users WHERE user_id = ?', user_id, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json(rows[0]);
          }
        });
      }
    });
  });

  // POST /createTrainerCertification
  app.post('/createTrainerCertification', (req, res) => {
    var trainer_id = req.body.trainer_id;
    var amenity_name = req.body.amenity_name;
    amenity_name = amenity_name.toLowerCase() // Making it so all activities are consistent
    let activity_id
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO amenity_certifications (amenity_name) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS (SELECT amenity_name FROM amenity_certifications WHERE amenity_name=?)", [amenity_name, amenity_name], function (err, rows, fields) {
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into activities table');
          } else {
            activity_id = rows.insertId
          }
        });

        connection.query("INSERT INTO trainer_amenity_certifications(trainer_id, certification_id) VALUES (?, (SELECT certification_id FROM amenity_certifications WHERE amenity_name = ?))", [trainer_id, amenity_name], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into activities table');
          } else {
            res.status(400).send("Inserted activity into table and assigned it to the trainee successfully");
          }
        });

      }
    });
  });

  // GET /getTrainerCertifications/{trainer_id}
  app.get('/getTrainerCertifications', (req, res) => {
    var trainer_id = req.param('trainer_id');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("SELECT amenity_name FROM trainer_amenity_certifications tac INNER JOIN amenity_certifications ac on tac.certification_id = ac.certification_id WHERE trainer_id = ?;", [trainer_id], function (err, rows, fields) {
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


  // POST /createTrainerRating
  app.post('/createTrainerRating', (req, res) => {
    var trainer_id = req.body.trainer_id
    var trainee_id = req.body.trainee_id
    var rating = req.body.rating
    var review = req.body.review
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO trainer_ratings (trainer_id, trainee_id, rating, review) VALUES (?,?,?,?);", [trainer_id, trainee_id, rating, review], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into ratings table: \n", err);
            res.status(400).send('Problem inserting into ratings table');
          } else {
            res.status(200).send("Inserted rating into table successfully");
          }
        });

      }
    });
  });

  // GET /trainerRating/{trainer_id}
  app.get('/trainerRating', (req, res) => {
    var trainer_id = req.param("trainer_id");

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT AVG(rating) as \'rating\' FROM trainer_ratings WHERE trainer_id = ?', trainer_id, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json(rows[0]);
          }
        });
      }
    });
  });

  // GET /trainerRating/{trainer_id}
  app.get('/trainerReviews', (req, res) => {
    var trainer_id = req.param("trainer_id");

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT * FROM trainer_ratings WHERE trainer_id = ?', trainer_id, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json(rows);
          }
        });
      }
    });
  });

  // POST /createAppointment
  app.post('/createAppointment', (req, res) => {
    var trainer_id = req.body.trainer_id;
    var trainee_id = req.body.trainee_id;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var notes = req.body.notes;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO appointments(start_time, end_time, notes, trainer_id, trainee_id) VALUES (?,?,?,?,?) ", [start_time, end_time, notes, trainer_id, trainee_id], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into appointments table: \n", err);
            res.status(400).send('Problem inserting into appointments table');
          } else {
            res.status(400).send("Inserted appointment into table successfully");
          }
        });
      }
    });
  })




}