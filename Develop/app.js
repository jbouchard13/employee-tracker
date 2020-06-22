const inquirer = require("inquirer");
const cTable = require("console.table");
const Database = require("./db/Database");
const { connection } = require("./db/Database");

// create a prompt when the app is started
const init = async () => {
  const intro = await inquirer.prompt({
    type: "list",
    name: "todo",
    message: "What would you like to do?",
    choices: [
      "See all employees",
      "See all departments",
      "See all roles",
      "Add new employee",
      "Add new department",
      "Add new role",
      "Update employee's role",
      "Exit",
    ],
  });

  if (intro.todo === "See all employees") {
    // call function to retrieve all employees
    Database.getAllEmployees();
    init();
  } else if (intro.todo === "See all departments") {
    // call function to retrieve all departments
    Database.findDepartment();

    init();
  } else if (intro.todo === "See all roles") {
    // call function to retrieve all roles
    Database.findRole();
    init();
  } else if (intro.todo === "Add new employee") {
    Database.createEmployee();
  } else if (intro.todo === "Add new department") {
    // call function to add new department
    // prompt for department name
  } else if (intro.todo === "Add new role") {
    // call function to add new role
    // prompt for role title, salary, and department_id
  } else if (intro.todo === "Update employee's role") {
    // call function to update an employee's role
  } else if (intro.todo === "Exit") {
    // end the connection to the db
    connection.end();
  }
};

init();
