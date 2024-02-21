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

companiesController.saveNewCompanies = async (req, res, next) => {
  try {
    const { companies } = req.body;
    console.log(`companiesController.saveNewCompanies`);
    let result = await companiesModel.saveNewCompanies(companies);
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
companiesController.updateCompanies = async (req, res, next) => {
  try {
    const { companies } = req.body;
    console.log(`companiesController.updateCompanies`);
    let result = await companiesModel.updateCompanies(companies);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on companiesController.updateCompanies in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
companiesController.deleteCompany = async (req, res, next) => {
  try {
    const { company } = req.params;
    console.log(`companiesController.company`);
    let result = await companiesModel.deleteCompany(company);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on companiesController.deleteCompany in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

module.exports = companiesController;
