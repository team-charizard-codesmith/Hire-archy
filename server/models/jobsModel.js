const database = require("./database");
module.exports = jobsModel = {
  async getAllJobs(user_id) {
    try {
      const query = {
        text: `SELECT * FROM jobs;`,
      };

      let result = await database.query(query);
      const normalizedResult = result.rows.map(
        ({ id, title, salary, open_date, address, company_id, user_id }) => ({
          id,
          title,
          salary,
          open_date,
          address,
          company_id,
          user_id,
        })
      );

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
  async saveNewJobs(jobs) {
    const numOfJobs = jobs.length;
    const myJobsVals = [];
    jobs.forEach((job) => {
      for (const key in job) {
        myJobsVals.push(job[key]);
      }
    });

    let valuesArgString = "";
    let args = 0;
    for (let i = 0; i < jobs.length; i++) {
      let newStr = `(
                $${++args},
                $${++args},
                $${++args},
                $${++args},
                $${++args},
                $${++args}
                ),`;

      valuesArgString = valuesArgString.concat(newStr);
    }
    valuesArgString = valuesArgString.slice(0, valuesArgString.length - 1);

    try {
      const query = {
        text: `INSERT INTO jobs (title, salary, open_date, address, company_id, user_id) 
        VALUES ${valuesArgString};`,
        values: myJobsVals,
      };

      let result = await database.query(query);

      let createdOrUpdated = false;
      if (result.rowCount >= 1) createdOrUpdated = true;
      return { isError: false, payload: result.rows };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, err: e };
    }
  },
  async updateJobs(jobs) {
    const numOfJobs = jobs.length;
    try {
      let rowsAffected = 0,
        successfullyUpdate = [],
        errors = [];
      jobs.forEach(async (job) => {
        try {
          //title, salary, open_date, address, company_id, user_id
          const query = {
            text: `UPDATE jobs SET title = $1, salary = $2, open_date = $3, address = $4, company_id = $5, user_id = %6 WHERE id = $7  LIMIT 1;`,
            values: [
              job.title,
              job.salary,
              job.open_date,
              job.address,
              job.company_id,
              job.user_id,
              job.id,
            ],
          };
          let result = await database.query(query);
          if (result.rowCount >= 1) {
            rowsAffected++, successfullyUpdate.push(job.id);
          } else {
            errors.push(job.id);
          }
        } catch (e) {
          errors.push(job.id);
        }
      });
      return { isError: false, payload: result.rows };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, err: e };
    }
  },
  async deleteCompany(job) {
    try {
      const query = {
        text: `DELETE FROM jobs WHERE id = $1 LIMIT 1;`,
        values: [job.id],
      };

      let result = await database.query(query);

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
};
