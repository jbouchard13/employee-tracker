const inquirer = require("inquirer");
const cTable = require("console.table");
const Database = require("./db/Database");

// create a prompt when the app is started
// this will ask the user what they'd like to do
// choices: {
//  {
//      name:
//      value:
//  }
// }

// if view employees selected, it'll call getEmployees function
// call the findEmployees function from the Database class that we created
