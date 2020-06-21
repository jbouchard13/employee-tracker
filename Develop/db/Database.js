const connection = require("./connection");

class Database {
  constructor(connection) {
    this.connection = connection;
  }
  createDepartments() {
    return this.connection.query(`SELECT`);
  }
  createEmployee() {
    return this.connection.query(`SELECT`);
  }
  createRole() {
    return this.connection.query(`SELECT`);
  }
  findRole() {
    return this.connection.query(`SELECT`);
  }
  findEmployee() {
    return this.connection.query(`SELECT`);
  }
  findDepartment() {
    return this.connection.query(`SELECT`);
  }
}

module.exports = new Database(connection);
