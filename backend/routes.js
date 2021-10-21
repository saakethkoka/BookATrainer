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
                res.status(200).send('created the table'); /**/
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

  // POST /createAccount
  app.post('/createAccount', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var gender = req.body.gender
    var city_location = req.body.city_location
    var user_type = req.body.user_type
    var bio = req.body.bio
    var password = req.body.password

    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query("INSERT INTO users (name, email, gender, city_location, user_type, bio, password)" +
            " VALUES(?,?,?,?,?,?,?)" , [name, email, gender, city_location, user_type, bio, password], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table');
          } else {
            var user_id = rows.insertId
            res.status(200).send({"user_id" : user_id});
          }
        });
      }
    });
  });

  // POST /createTraineeActivity
  app.post('/createTraineeActivity', (req, res) => {
    var user_id = req.body.user_id
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

        connection.query("INSERT INTO trainee_details(user_id, activity_id) VALUES (?, (SELECT activity_id FROM activities WHERE activity_name = ?))", [user_id, activity], function (err, rows, fields) {
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
    var user_id = req.body.user_id
    var activity = req.body.activity
    var hourlyRate = req.body.hourlyRate
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
        connection.query("INSERT INTO trainer_details(user_id, activity_id, hourly_cost) VALUES (?, (SELECT activity_id FROM activities WHERE activity_name = ?), ?)", [user_id, activity, hourlyRate], function (err, rows, fields) {
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

}