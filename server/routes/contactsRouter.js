const express = require("express");

const router = express.Router();

const contactsController = require("../controllers/contactsController.js");

router.get("/", contactsController.getAllContacts, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/", contactsController.saveNewContacts, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.put("/", contactsController.updateContacts, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

router.delete("/:id", contactsController.deleteContacts, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

module.exports = router;
