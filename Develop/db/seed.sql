use employee_tracker;

INSERT INTO department (name) VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

INSERT INTO role (title, salary, department_id) VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", 1, 1),
("Mike", "Chan", 2, 1),
("Kevin", "Tupik", 4, 1),
("Tom", "Allen", 7, 3),
("Nicola", "Phelps", 7, 3),
("Finley", "Bray", 2, 1),
("Amrita", "Roberts", 4, 1);

INSERT INTO employee(first_name, last_name, role_id) VALUES
("Ashley", "Rodriguez", 3),
("Malia", "Brown", 5),
("Sarah", "Lourd", 6);
