const { query } = require("express");
const db = require("../models/database");

const jobController = {};

jobController.addJob = (req, res, next) => {
	const { title, salary, open_date, address, company_id, user_id } = req.body;
	const newJobQuery =
		"INSERT INTO jobs" +
		`(title, salary, open_date, address, company_id, user_id)` +
		`VALUES($1, $2, $3, $4, $5, $6)`;
	const arr = [title, salary, open_date, address, company_id, user_id];
	try {
		db.query(newJobQuery, arr).then((data) => {
			console.log(data);
			console.log(`Successfully inserted ${arr} into jobs`);
			return next();
		});
	} catch (err) {
		next(err);
	}
};
jobController.getJobs = (req, res, next) => {
	const getJobsquery = "SELECT * FROM jobs";
	try {
		db.query(getJobsquery).then((data) => {
			console.log(data);
			res.locals.jobs = data;
			return next();
		});
	} catch (err) {
		next(err);
	}
};

jobController.updateJob = (req, res, next) => {
	const { id, title, salary, open_date, address, company_id, user_id } =
		req.body;
	const updateJobQuery = "UPDATE jobs" + `SET title=`;
	try {
		db.query(updateJobQuery).then((data) => {
			console.log(data);
			console.log(`Successfully updated ${arr} into jobs`);
			return next();
		});
	} catch (err) {
		next(err);
	}
};
jobController.deleteJob = (req, res, next) => {
	const { id } = req.body;
	const deleteJobQuery = "DELETE FROM jobs" + `WHERE id=${id}`;
	try {
		db.query(deleteJobQuery).then((data) => {
			console.log(data);
			console.log(`Successfully deleted job #${id} from jobs`);
			return next();
		});
	} catch (err) {
		next(err);
	}
};

module.exports = jobController;
