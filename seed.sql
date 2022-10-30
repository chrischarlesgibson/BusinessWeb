-- //seed for department db
INSERT INTO department (department_id, department_name)
VALUES (001, "produce"),
(002, "deli"),
(003, "clothing"),
(004, "meat"),
(005, "frozen"),
(006, "hardware"),
(007, "entertainment");


-- seed for role
INSERT INTO employee_role (role_id, title, salary, department_id)
VALUES (001, "cashier", 40000,001),
(002, "stocker", 30000, 002),
(003, "manager", 80000, 003),
(004, "janitor", 30000, 004),
(005, "secruity", 35000, 005);


-- seed for employee info
INSERT INTO employee_info (employee_id,first_name, last_name, role_id, manager_id )
VALUES (001, "John","smith", 001, 001),
(002, "John","Wick", 002, 002),
(003, "mike","johnson", 003, 003),
(004, "mike","wazowski", 004, 004),
(005, "Julia","Doe", 005, 005);