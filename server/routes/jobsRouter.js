const express = require("express");

const router = express.Router();

const jobsController = require("../controllers/jobsController.js");

router.get("/", jobsController.getAllJobs, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/", jobsController.saveNewJobs, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.put("/", jobsController.updateJobs, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.delete("/:id", jobsController.deleteJobs, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

module.exports = router;
