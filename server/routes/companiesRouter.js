const express = require("express");

const router = express.Router();

const companiesController = require("../controllers/companiesController.js");

router.get("/", companiesController.getAllCompanies, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/", companiesController.saveNewCompanies, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.put("/", companiesController.updateCompanies, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.delete("/:id", companiesController.deleteCompanies, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

module.exports = router;
