const connection = require("./connection");
const inquirer = require("inquirer");

class Database {
  constructor(connection) {
    this.connection = connection;
  }
  // get all employees
  getAllEmployees() {
    const result = this.connection.query(
      "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (role.department_id = department.id);",
      (err, result) => {
        if (err) throw err;
        console.log("");
        console.table(result);
        this.connection.end();
      }
    );
  }
  // get all departments
  getAllDepartments() {
    const result = this.connection.query(
      "SELECT * FROM department",
      (err, result) => {
        if (err) throw err;
        console.log("");
        console.table(result);
        this.connection.end();
      }
    );
  }
  // get all roles
  getAllRoles() {
    const result = this.connection.query(
      "SELECT * FROM role",
      (err, result) => {
        if (err) throw err;
        console.log("");
        console.table(result);
        this.connection.end();
      }
    );
  }
  // create new department
  async createDepartments() {
    const prompts = await inquirer.prompt([
      {
        type: "input",
        name: "deptName",
        message: "What would you like the new department's name to be?",
      },
    ]);

    const addDeptQuery = await this.connection.query(
      "INSERT INTO department SET ?",
      {
        name: prompts.deptName,
      },
      (err, result) => {
        if (err) throw err;
        console.log(`${prompts.deptName} added to departments.`);
        this.connection.end();
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
        // set the roleId to the selected role's id
        roleId = role.id;
      }
    });

    // split the selected manager's full name into first and last name so it will work with the query
    const nameSplit = prompts.manager.split(" ");

    managers.forEach((employee) => {
      if (
        // check if the name's match
        nameSplit[0] === employee.first_name ||
        nameSplit[1] === employee.last_name
      ) {
        // set managerId to the selected manager's employee id
        managerId = employee.id;
      } else {
        // if none selected, set the managerId to null
        managerId = null;
      }
    });

    // add employee to the db with the provided info from prompts
    const addEmployee = await this.connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: prompts.firstName,
        last_name: prompts.lastName,
        role_id: roleId,
        manager_id: managerId,
      }
    );
    this.connection.end();
    // console log the new employee's name so the user knows who they added
    console.log(
      `${prompts.firstName} ${prompts.lastName} added to employee database.`
    );
  }
  // create new role
  async createRole() {
    // get department name and id to be referenced to by the new role
    let departmentId;
    let departmentNames = [];
    let departments = [];
    // db query to get that info
    const departmentInfo = await this.connection.query(
      "SELECT id, name FROM department",
      (err, res) => {
        if (err) throw err;
        res.forEach((department) => {
          departments.push({ id: department.id, name: department.name });
          departmentNames.push(department.name);
        });
      }
    );

    // prompt user for new role title, salary, and department name
    const prompts = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "department",
        message: "What department does this role belong to?",
        choices: departmentNames,
      },
    ]);

    // parse the salary to an integer
    let salary = parseInt(prompts.salary);
    // match department name to the department id so the id can be saved to the new role db entry
    departments.forEach((department) => {
      if (prompts.department === department.name) {
        departmentId = department.id;
      }
    });

    // once data has been sorted out, save the new role into the role db table
    const saveRole = await this.connection.query(
      "INSERT INTO role SET ?",
      [
        {
          title: prompts.title,
          salary: salary,
          department_id: departmentId,
        },
      ],
      (err, res) => {
        if (err) throw err;
        console.log(`${prompts.title} added to roles`);
        connection.end();
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
