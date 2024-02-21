const database = require("./database");
module.exports = offersModel = {
  async getAllOffers(user_id) {
    try {
      const query = {
        text: `SELECT * FROM offers;`,
      };

      id, company, job_id, salary, deadline, user_id;
      let result = await database.query(query);
      const normalizedResult = result.rows.map(
        ({ id, company, job_id, salary, deadline, user_id }) => ({
          id,
          company,
          job_id,
          salary,
          deadline,
          user_id,
        })
      );

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
  async saveNewOffers(offers) {
    const numOfOffers = offers.length;
    const myOffersVals = [];
    offers.forEach((offer) => {
      for (const key in offer) {
        myOffersVals.push(offer[key]);
      }
    });

    let valuesArgString = "";
    let args = 0;
    for (let i = 0; i < offers.length; i++) {
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
      // id, company, job_id, salary, deadline, user_id;
      const query = {
        text: `INSERT INTO offers (
          company,
          job_id,
          salary,
          deadline,
          user_id) 
        VALUES ${valuesArgString}`,
        values: myOffersVals,
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
  async updateOffers(offers) {
    const numOfOffers = offers.length;
    try {
      let rowsAffected = 0,
        successfullyUpdate = [],
        errors = [];
      offers.forEach(async (offer) => {
        try {
          const query = {
            text: `UPDATE offers SET company = $1, job_id = $2, salary = $3, deadline = $4, user_id = $5 WHERE id = $6 LIMIT 1;`,
            values: [
              offer.company,
              offer.job_id,
              offer.salary,
              offer.deadline,
              offer.user_id,
              offer.id,
            ],
          };
          let result = await database.query(query);
          if (result.rowCount >= 1) {
            rowsAffected++, successfullyUpdate.push(offer.id);
          } else {
            errors.push(offer.id);
          }
        } catch (e) {
          errors.push(offer.id);
        }
      });
      return { isError: false, payload: result.rows };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, err: e };
    }
  },
  async deleteCompany(offer) {
    try {
      const query = {
        text: `DELETE FROM offers WHERE id = $1 LIMIT 1;`,
        values: [offer.id],
      };

      let result = await database.query(query);

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
};
