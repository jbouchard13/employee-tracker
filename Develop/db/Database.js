const connection = require("./connection");

class Database {
  constructor(connection) {
    this.connection = connection;
  }
  createDepartments(deptName) {
    return this.connection.query(
      "INSERT INTO department SET ?",
      {
        name: deptName,
      },
      (err, result) => {
        if (err) throw err;
        console.log(`${deptName} added to departments`);
      }
    );
  }

  createEmployee(firstName, lastName, roleId, managerId) {
    return this.connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId,
      },
      (err, result) => {
        if (err) throw err;
        console.log(`${firstName} ${lastName} added`);
      }
    );
  }

  createRole(title, salary, deptId) {
    return this.connection.query(
      "INSERT INTO role SET ?",
      {
        title: title,
        salary: salary,
        department_id: deptId,
      },
      (err, result) => {
        if (err) throw err;
        console.log(`New role called ${title} added`);
      }
    );
  }

  getAllEmployees() {
    return this.connection.query("SELECT * FROM employee", (err, result) => {
      if (err) throw err;
      console.table(result);
    });
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
