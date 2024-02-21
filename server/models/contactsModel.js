const database = require("./database");
module.exports = contactsModel = {
  async getAllContacts(user_id) {
    try {
      const query = {
        text: `SELECT * FROM contacts`,
      };

      let result = await database.query(query);
      const normalizedResult = result.rows.map(
        ({ id, first_name, last_name, email, title, phone }) => ({
          id,
          first_name,
          last_name,
          email,
          title,
          phone,
        })
      );

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
  async saveNewContacts(contacts) {
    const numOfContacts = contacts.length;
    const myContactsVals = [];
    contacts.forEach((contact) => {
      for (const key in contact) {
        myContactsVals.push(contact[key]);
      }
    });

    let valuesArgString = "";
    let args = 0;
    for (let i = 0; i < contacts.length; i++) {
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
        text: `INSERT INTO contacts (id, first_name, last_name, email, title, phone) 
        VALUES ${valuesArgString}`,
        values: myContactsVals,
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
  async updateContacts(contacts) {
    const numOfContacts = contacts.length;
    try {
      let rowsAffected = 0,
        successfullyUpdate = [],
        errors = [];
      contacts.forEach(async (contact) => {
        try {
          const query = {
            //id, first_name, last_name, email, title, phone
            text: `UPDATE contacts SET first_name = $2, last_name = $3, email = $4, title = $5, phone = $6 WHERE id = $7 LIMIT 1;`,
            values: [
              contact.first_name,
              contact.last_name,
              contact.email,
              contact.title,
              contact.phone,
              contact.id,
            ],
          };
          let result = await database.query(query);
          if (result.rowCount >= 1) {
            rowsAffected++, successfullyUpdate.push(contact.id);
          } else {
            errors.push(contact.id);
          }
        } catch (e) {
          errors.push(contact.id);
        }
      });
      return { isError: false, payload: result.rows };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, err: e };
    }
  },
  async deleteContact(contact) {
    try {
      const query = {
        text: `DELETE FROM contacts WHERE id = $1 LIMIT 1`,
        values: [contact.id],
      };

      let result = await database.query(query);

      return { isError: false, payload: normalizedResult, err: null };
    } catch (e) {
      console.log(`## ERR `, e);
      return { isError: true, payload: null, err: e };
    }
  },
};
