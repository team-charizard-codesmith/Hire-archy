const express = require("express");

const router = express.Router();

const offersController = require("../controllers/offersController.js");

router.get("/", offersController.getAllOffers, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/", offersController.saveNewOffers, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.put("/", offersController.updateOffers, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.delete("/:id", offersController.deleteOffers, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

module.exports = router;
