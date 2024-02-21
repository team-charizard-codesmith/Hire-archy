const express = require("express");

const router = express.Router();

const interviewsController = require("../controllers/interviewsController.js");

router.get("/", interviewsController.getAllInterviews, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/", interviewsController.saveNewInterviews, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.put("/", interviewsController.updateInterviews, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.delete("/:id", interviewsController.deleteInterviews, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

module.exports = router;
