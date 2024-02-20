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

module.exports = userController;