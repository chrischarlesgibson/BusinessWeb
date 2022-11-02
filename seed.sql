-- //seed for department db
-- dont need to input department id bc its auto generated  per my schema
INSERT INTO department (department_name)
VALUES ("grocery"),
("sales"),
("customer service"),
("executive"),
("secruity"),
("maintainence"),
("pharmacy");


-- seed for role. the department_id numbers corresponds to what department the role is in in the department table. for example grocery manager has departmetn id of 1 so that means its departmnt is grocery and janitor has a department id of 6 so that means its department is mintainence bc its the 6 listed department in the deparmtents table. dont need to input role id bc its auto generated  per my schema
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


-- seed for employee info.if someone has a manager id of 7 in the employee info table.. that means that their manager is Anthony Kiedis
-- and if that employee is john smith, it would error bc john smith comes before anthony kiedis. employees that have no manager have null entered. example, john smiths manager id is 1 so that means that the grocery manager is his manager and the grocery manager is mike wazowski bc mike wazowski is the first person listed in this table and that corresponds to the first role in the employee_role table , which is grocery manager.  dont need to input employee id bc its auto generated  per my schema table
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