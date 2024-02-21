const database = require("./database");
module.exports = interviewsModel = {
  async getAllInterviews(user_id) {
    try {
      const query = {
        text: `SELECT * FROM interviews;`,
      };

      let result = await database.query(query);
      const normalizedResult = result.rows.map(
        ({ id, interview, job_id, notes, round, user_id }) => ({
          id,
          interview,
          job_id,
          notes,
          round,
          user_id,
        })
      );

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
  async saveNewInterviews(interviews) {
    const numOfInterviews = interviews.length;
    const myInterviewsVals = [];
    interviews.forEach((interview) => {
      for (const key in interview) {
        myInterviewsVals.push(interview[key]);
      }
    });

    let valuesArgString = "";
    let args = 0;
    for (let i = 0; i < interviews.length; i++) {
      let newStr = `(
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
        text: `INSERT INTO interviews (interview, job_id, notes, round, user_id) 
        VALUES ${valuesArgString}`,
        values: myInterviewsVals,
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
  async updateInterviews(interviews) {
    const numOfInterviews = interviews.length;
    try {
      let rowsAffected = 0,
        successfullyUpdate = [],
        errors = [];
      interviews.forEach(async (interview) => {
        try {
          const query = {
            //interview, job_id, notes, round, user_id
            text: `UPDATE interviews SET company = $1, job_id = $2, notes = $3, round = $4, user_id = $5 WHERE id = $6  LIMIT 1;`,
            values: [
              interview.company,
              interview.job_id,
              interview.notes,
              interview.round,
              interview.user_id,
              interview.id,
            ],
          };
          let result = await database.query(query);
          if (result.rowCount >= 1) {
            rowsAffected++, successfullyUpdate.push(interview.id);
          } else {
            errors.push(interview.id);
          }
        } catch (e) {
          errors.push(interview.id);
        }
      });
      return { isError: false, payload: result.rows };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, err: e };
    }
  },
  async deleteInterview(interview) {
    try {
      const query = {
        text: `DELETE FROM interviews WHERE id = $1 LIMIT 1;`,
        values: [interview.id],
      };

      let result = await database.query(query);

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
};
