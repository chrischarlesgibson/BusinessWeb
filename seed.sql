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
VALUES 
("grocery manager", 80000, 1),
("cashier", 40000,2),
("veggie stocker", 30000, 1),
("returns", 30000, 3),
("janitor", 30000, 6),
("secruity guard", 35000, 5),
("ceo", 10000000, 4),
("pharmacist", 100000, 7),
("greeter", 30000, 3),
("cart collector", 25000, 1);


-- seed for employee info
INSERT INTO employee_info (first_name, last_name, role_id, manager_id )
VALUES 
("mike","wazowski", 1, NULL),
("John","smith", 2, 1),
( "John","Wick", 3, 1),
("mike","johnson", 4, 1),
( "Julia","Doe", 5, 4),
("John","Frusciante", 6, 4),
("Anthony","Kiedis", 7, NULL),
("flea","Bassman", 8, NULL),
("Chad","Smith", 9, 4),
("Giga","Chad", 10, 4);