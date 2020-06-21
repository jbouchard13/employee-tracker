const introQuestions = {
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
};

const newEmployeeQuestions = [
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
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
    ],
  },
  {
    type: "list",
    name: "manager",
    message: "Who is their manager?",
    choices: ["Ashley Rodriguez", "Sarah Lourd", "John Doe"],
  },
];

module.exports = {
  newEmployeeQuestions,
  introQuestions,
};
