const offersModel = require("../models/offersModel");

const offersController = {};

offersController.getAllOffers = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`offersController.getAllOffers`);
    let result = await offersModel.getAllOffers(user_id);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on offersController.getAllOffers in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

offersController.saveNewOffers = async (req, res, next) => {
  try {
    const { offers } = req.body;
    console.log(`offersController.saveNewOffers`);
    let result = await offersModel.saveNewOffers(offers);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on offersController.getAllOffers in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
offersController.updateOffers = async (req, res, next) => {
  try {
    const { offers } = req.body;
    console.log(`offersController.updateOffers`);
    let result = await offersModel.updateOffers(offers);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on offersController.updateOffers in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
offersController.deleteOffer = async (req, res, next) => {
  try {
    const { company } = req.params;
    console.log(`offersController.company`);
    let result = await offersModel.deleteOffer(company);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on offersController.deleteOffer in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

module.exports = offersController;
