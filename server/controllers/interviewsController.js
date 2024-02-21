const interviewsModel = require("../models/interviewsModel");

const interviewsController = {};

interviewsController.getAllInterviews = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(`interviewsController.getAllInterviews`);
    let result = await interviewsModel.getAllInterviews(user_id);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on interviewsController.getAllInterviews in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

interviewsController.saveNewInterviews = async (req, res, next) => {
  try {
    const { interviews } = req.body;
    console.log(`interviewsController.saveNewInterviews`);
    let result = await interviewsModel.saveNewInterviews(interviews);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on interviewsController.getAllInterviews in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
interviewsController.updateInterviews = async (req, res, next) => {
  try {
    const { interviews } = req.body;
    console.log(`interviewsController.updateInterviews`);
    let result = await interviewsModel.updateInterviews(interviews);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on interviewsController.updateInterviews in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};
interviewsController.deleteInterview = async (req, res, next) => {
  try {
    const { company } = req.params;
    console.log(`interviewsController.company`);
    let result = await interviewsModel.deleteInterview(company);
    if (result.isError) {
      next({
        status: 500,
        message: "Error on interviewsController.deleteInterview in database",
      });
    }
    res.locals.payload = result.payload;
    next();
  } catch (err) {
    next({ status: 500, message: JSON.parse(err) });
  }
};

module.exports = interviewsController;
