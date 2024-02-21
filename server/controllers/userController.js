const { query } = require('express');
const userModel = require('../models/userModel');

const userController = {};

userController.getUsers = (req, res, next) => {
    const query = 'SELECT * FROM users';
    try {
        userModel.query(query)
            .then((data) => {
                console.log(data);
                return next();
            })
    }
    catch (err) {
        next(err);
    }
}


/*-------------CREATE A NEW USER--------------*/
userController.createUser = (req, res, next) => {

    if (req.body.username && req.body.password) {
      res.locals.newUser = {...req.body}; //Object.assign(req.body)
      // insert the newUser object the model document inside our mongoose
      const query = {
        text:'';
        values: [req.params.username, req.params.password]
      };
      try{
        userModel.query(query)
          .then((data) => {
            console.log(data);
            return next();
          })
      }
      catch(err) {
        next(err);
      }
      return next();
    } else {
      return next('Error: Invalid user input');
    }

  };

  /**
  * -------------LOGIN & VERIFY EXISTING USER--------------
  * verifyUser - Obtain username and password from the request body, locate
  * the appropriate user in the database, and then authenticate the submitted password
  * against the password stored in the database.
  */
  userController.verifyUser = (req, res, next) => {
    // write code here
    res.locals.user = req.body.username;
    res.locals.pw = req.body.password;


    User.findOne({username: `${res.locals.user}`})
      .then((data) => {
        console.log(data);
        if (data !== null && data.password === res.locals.pw) {
          res.locals.id = data._id.toString();
          console.log(data._id.toString(), 'data id')
          console.log(req.body, 'req.body');
          return next();
        }
        else {
          res.redirect('/signup');
        }
      });
    // return next();

  };


module.exports = userController;