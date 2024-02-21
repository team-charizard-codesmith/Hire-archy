const companiesModel = require("../models/companiesModel");

const companiesController = {};

companiesController.getAllCompanies = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`companiesController.getAllCompanies`);
    let result = await companiesModel.getAllCompanies(user_id);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on companiesController.getAllCompanies in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

module.exports = companiesController;
