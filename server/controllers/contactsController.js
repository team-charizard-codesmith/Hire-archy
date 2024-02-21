const contactsModel = require("../models/contactsModel");

const contactsController = {};

contactsController.getAllContacts = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`contactsController.getAllContacts`);
    let result = await contactsModel.getAllContacts(user_id);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on contactsController.getAllContacts in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

contactsController.saveNewContacts = async (req, res, next) => {
  try {
    const { contacts } = req.body;
    console.log(`contactsController.saveNewContacts`);
    let result = await contactsModel.saveNewContacts(contacts);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on contactsController.getAllContacts in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
contactsController.updateContacts = async (req, res, next) => {
  try {
    const { contacts } = req.body;
    console.log(`contactsController.updateContacts`);
    let result = await contactsModel.updateContacts(contacts);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on contactsController.updateContacts in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
contactsController.deleteContact = async (req, res, next) => {
  try {
    const { contact } = req.params;
    console.log(`contactsController.contact`);
    let result = await contactsModel.deleteContact(contact);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on contactsController.deleteContact in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

module.exports = contactsController;
