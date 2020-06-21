const inquirer = require("inquirer");
const cTable = require("console.table");
const Database = require("./db/Database");
const { connection } = require("./db/Database");
const questions = require("./prompts/questions");

// create a prompt when the app is started
const init = async () => {
  const intro = await inquirer.prompt(questions.introQuestions);

  if (intro.todo === "See all employees") {
    // call function to retrieve all employees
    const getAllEmployees = await Database.getAllEmployees();
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
    // prompt for employee's first and last name
    // prompt for their role_id and manager_id(can be null)
    const newEmployee = await inquirer.prompt(questions.newEmployeeQuestions);
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
