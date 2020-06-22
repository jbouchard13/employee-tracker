const connection = require("./connection");
const inquirer = require("inquirer");

class Database {
  constructor(connection) {
    this.connection = connection;
  }
  // get all employees
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
  // get all departments
  getAllDepartments() {
    return this.connection.query("SELECT * FROM department", (err, result) => {
      if (err) throw err;
      console.log("");
      console.table(result);
    });
  }
  // get all roles
  getAllRoles() {
    return this.connection.query("SELECT * FROM role", (err, result) => {
      if (err) throw err;
      console.log("");
      console.table(result);
    });
  }
  // create new department
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
  // create new employee async function
  async createEmployee() {
    // create empty array for roles
    let roles = [];
    // create empty array for managers
    let managers = ["None"];

    // get existing department and role info
    const roleQuery = await this.connection.query(
      "SELECT role.title FROM role",
      (err, res) => {
        if (err) throw err;
        // push each role name to the roles array
        res.forEach((res) => {
          roles.push(res.title);
        });
      }
    );

    // get existing employee names
    const employeeQuery = await this.connection.query(
      "SELECT first_name, last_name FROM employee",
      (err, res) => {
        if (err) throw err;
        res.forEach((res) => {
          // join the first and last names together from responses
          let name = `${res.first_name} ${res.last_name}`;
          // push names to managers array
          managers.push(name);
        });
      }
    );
    // prompt user with info provided from queries
    const prompts = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is their first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is their last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is their manager?",
        choices: managers,
      },
    ]);
    console.log(prompts);
  }
  // create new role
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
  // update employee's role
  updateEmployeeRole(employeeName) {
    return this.connection.query("SELECT");
  }
  // find employee by department
  findEmployeeByDepartment() {
    return this.connection.query(`SELECT`);
  }
}

module.exports = new Database(connection);
