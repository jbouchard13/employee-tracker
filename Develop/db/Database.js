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
    return this.connection.query(
      "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (role.department_id = department.id);",
      (err, result) => {
        if (err) throw err;
        console.log("");
        console.table(result);
      }
    );
  }

  findRole() {
    return this.connection.query("SELECT * FROM role", (err, result) => {
      if (err) throw err;
      console.log("");
      console.table(result);
    });
  }

  findEmployee() {
    return this.connection.query(`SELECT`);
  }

  findDepartment() {
    return this.connection.query("SELECT * FROM department", (err, result) => {
      if (err) throw err;
      console.log("");
      console.table(result);
    });
  }
}

module.exports = new Database(connection);
