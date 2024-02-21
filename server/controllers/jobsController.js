const jobsModel = require("../models/jobsModel");

const jobsController = {};

jobsController.getAllJobs = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`jobsController.getAllJobs`);
    let result = await jobsModel.getAllJobs(user_id);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on jobsController.getAllJobs in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

jobsController.saveNewJobs = async (req, res, next) => {
  try {
    const { jobs } = req.body;
    console.log(`jobsController.saveNewJobs`);
    let result = await jobsModel.saveNewJobs(jobs);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on jobsController.getAllJobs in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
jobsController.updateJobs = async (req, res, next) => {
  try {
    const { jobs } = req.body;
    console.log(`jobsController.updateJobs`);
    let result = await jobsModel.updateJobs(jobs);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on jobsController.updateJobs in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
jobsController.deleteJob = async (req, res, next) => {
  try {
    const { company } = req.params;
    console.log(`jobsController.company`);
    let result = await jobsModel.deleteJob(company);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on jobsController.deleteJob in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

module.exports = jobsController;
