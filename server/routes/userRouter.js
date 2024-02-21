const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController.js');

router.get('/login/:username/:password', userController.verifyUser, (req,res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/signup', userController.createUser, (req,res) => {
  return res.status(200).json(res.locals.newUser);
});


module.exports = router;