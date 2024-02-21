
const { Pool } = require("pg");

const PG_URI =
  "postgres://cidmudvg:mnVlalSEcl06_wHIdbeZ-Sc85qdlNCtg@jelani.db.elephantsql.com/cidmudvg";

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,

});

// DB Schema: https://dbdesigner.page.link/TAXQgivNoK3A7kKR7

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

module.exports = database = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
