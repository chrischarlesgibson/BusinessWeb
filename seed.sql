-- //seed for department db
INSERT INTO department (department_name)
VALUES ("grocery"),
("sales"),
("customer service"),
("executive"),
("secruity"),
("maintainence"),
("pharmacy");


-- seed for role
INSERT INTO employee_role ( title, salary, department_id)
VALUES ("cashier", 40000,2),
("veggie stocker", 30000, 1),
("returns", 30000, 3),
("grocery manager", 80000, 1),
("janitor", 30000, 6),
("secruity guard", 35000, 5),
("ceo", 10000000, 4),
("pharmacist", 100000, 7),
("greeter", 30000, 3),
("cart collector", 25000, 1);


-- seed for employee info
INSERT INTO employee_info (first_name, last_name, role_id, manager_id )
VALUES ("John","smith", 1, 4),
( "John","Wick", 2, 4),
("mike","johnson", 3, 4),
("mike","wazowski", 4, 7),
( "Julia","Doe", 5, 4),
("John","Frusciante", 6, 4),
("Anthony","Kiedis", 7, NULL),
("flea","Bassman", 8, NULL),
("Chad","Smith", 9, 4),
("Giga","Chad", 10, 4);