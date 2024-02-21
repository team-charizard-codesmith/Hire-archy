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
  async saveNewCompanies() {
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
  //   async updateCompanies() {
  //     try {
  //       const query = {
  //         text: `SELECT * FROM companies`,
  //         values: [],
  //       };

  //       let result = await database.query(query);
  //       const normalizedResult = result.rows.map(
  //         ({ id, name, address, user_id }) => ({
  //           id,
  //           name,
  //           address,
  //           user_id,
  //         })
  //       );
  //       // console.log(`rows`, result.rows);
  //       // console.log(`row[0]`, result.rows[0]);
  //       // console.log(`normalizedResult`, normalizedResult);
  //       // console.log(`normalizedResult[0]`, normalizedResult[0]);
  //       return { isError: false, payload: normalizedResult, err: null };
  //     } catch (e) {
  //       console.log(`## ERR `, e);
  //       return { isError: true, payload: null, err: e };
  //     }
  //   },
  //   async deleteCompanies() {
  //     try {
  //       const query = {
  //         text: `SELECT * FROM companies`,
  //         values: [],
  //       };

  //       let result = await database.query(query);
  //       const normalizedResult = result.rows.map(
  //         ({ id, name, address, user_id }) => ({
  //           id,
  //           name,
  //           address,
  //           user_id,
  //         })
  //       );
  //       // console.log(`rows`, result.rows);
  //       // console.log(`row[0]`, result.rows[0]);
  //       // console.log(`normalizedResult`, normalizedResult);
  //       // console.log(`normalizedResult[0]`, normalizedResult[0]);
  //       return { isError: false, payload: normalizedResult, err: null };
  //     } catch (e) {
  //       console.log(`## ERR `, e);
  //       return { isError: true, payload: null, err: e };
  //     }
  //   },
};
