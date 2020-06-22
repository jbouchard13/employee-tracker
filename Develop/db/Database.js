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
    const result = this.connection.query(
      "SELECT * FROM role",
      (err, result) => {
        if (err) throw err;
        console.log("");
        console.table(result);
      }
    );
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
    // create empty array for roles for list prompt
    let roles = [];
    let roleTitles = [];
    // create empty array for managers names for list prompt
    let managersNames = ["None"];
    let managers = [];
    // create variable for role id
    let roleId;
    // create variable for manager id
    let managerId;

    // get existing department and role info
    const roleQuery = await this.connection.query(
      "SELECT id, role.title FROM role",
      (err, res) => {
        if (err) throw err;
        // push each role name to the roles array
        res.forEach((res) => {
          roles.push({ id: res.id, title: res.title });
        });
        // push the titles to their own array for prompts
        roles.forEach((role) => {
          roleTitles.push(role.title);
        });
      }
    );

    // get existing employee names and id
    const employeeQuery = await this.connection.query(
      "SELECT id, first_name, last_name FROM employee",
      (err, res) => {
        if (err) throw err;
        res.forEach((employee) => {
          // join the first and last names together from responses
          let name = `${employee.first_name} ${employee.last_name}`;
          // push names to managers array
          managersNames.push(name);
        });
        // add all info to the managers array to get ids
        res.forEach((employee) => {
          managers.push({
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
          });
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
        choices: roleTitles,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is their manager?",
        choices: managersNames,
      },
    ]);

    // get answers from prompts to get role_id and manager_id for db add
    roles.forEach((role) => {
      if (prompts.role === role.title) {
        roleId = role.id;
      }
    });
    console.log(roleId);
    // add employee to the db with the provided info from prompts
    // const addEmployee = await this.connection.query(
    //   "INSERT INTO employee SET ?",
    //   {
    //     first_name: prompts.firstName,
    //     last_name: prompts.lastName,
    //     role_id: roleId,
    //     manager_id: prompts.manager,
    //   }
    // );
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
