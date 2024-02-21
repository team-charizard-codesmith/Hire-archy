const { query } = require("express");
const database = require("../models/database.js");

const userController = {};

userController.getUsers = (req, res, next) => {
  const query = "SELECT * FROM users";
  try {
    database.query(query).then((data) => {
      console.log(data);
      return next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
