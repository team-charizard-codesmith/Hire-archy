const database = require("../models/database");
module.exports = companiesModel = {
  async getAllCompanies(user_id) {
    try {
      const query = {
        text: `SELECT * FROM companies WHERE $1`,
        values: [user_id],
      };

      let result = await database.query(query);
      const normalizedResult = result.rows.map(
        ({ id, name, address, user_id }) => ({
          id,
          name,
          address,
          user_id,
        })
      );

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
  async saveNewCompanies(companies) {
    const numOfCompanies = companies.length;
    const myCompaniesVals = [];
    companies.forEach((company) => {
      for (const key in company) {
        myCompaniesVals.push(company[key]);
      }
    });

    let valuesArgString = "";
    let args = 0;
    for (let i = 0; i < companies.length; i++) {
      let newStr = `(
                $${++args},
                $${++args},
                $${++args}
                ),`;

      valuesArgString = valuesArgString.concat(newStr);
    }
    valuesArgString = valuesArgString.slice(0, valuesArgString.length - 1);

    try {
      const query = {
        text: `INSERT INTO companies (name, address, user_id) 
        VALUES ${valuesArgString}`,
        values: myCompaniesVals,
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
  async updateCompanies(companies) {
    const numOfCompanies = companies.length;
    try {
      let rowsAffected = 0,
        successfullyUpdate = [],
        errors = [];
      companies.forEach(async (company) => {
        try {
          const query = {
            text: `UPDATE companies SET name = $1, address = $2, user_id = $3 WHERE id = $4  LIMIT 1;`,
            values: [
              company.name,
              company.address,
              company.user_id,
              company.id,
            ],
          };
          let result = await database.query(query);
          if (result.rowCount >= 1) {
            rowsAffected++, successfullyUpdate.push(company.id);
          } else {
            errors.push(company.id);
          }
        } catch (e) {
          errors.push(company.id);
        }
      });
      return { isError: false, payload: result.rows };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, err: e };
    }
  },
  async deleteCompany(company) {
    try {
      const query = {
        text: `DELETE FROM companies WHERE id = $1 LIMIT 1;`,
        values: [company.id],
      };

      let result = await database.query(query);

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
};
