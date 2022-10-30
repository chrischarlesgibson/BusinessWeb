
-- creating db for the company
DROP DATABASE IF EXISTS your_business_db;

CREATE DATABASE your_business_db;

USE your_business_db;

-- //schema table for department 
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- //schema table for role
DROP TABLE IF EXISTS employee_role;

CREATE TABLE employee_role (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(department_id)
  ON DELETE SET NULL
);

-- //schema table for employee
DROP TABLE IF EXISTS employee_info;

CREATE TABLE employee_info(
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES employee_role(role_id)
  ON DELETE SET NULL,
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employee_info(employee_id)
  ON DELETE SET NULL
);






-- As the image illustrates, your schema should contain the following three tables:

-- * `department`

--     * `id`: `INT PRIMARY KEY`

--     * `name`: `VARCHAR(30)` to hold department name

-- * `role`

--     * `id`: `INT PRIMARY KEY`

--     * `title`: `VARCHAR(30)` to hold role title

--     * `salary`: `DECIMAL` to hold role salary

--     * `department_id`: `INT` to hold reference to department role belongs to

-- * `employee`

--     * `id`: `INT PRIMARY KEY`

--     * `first_name`: `VARCHAR(30)` to hold employee first name

--     * `last_name`: `VARCHAR(30)` to hold employee last name

--     * `role_id`: `INT` to hold reference to employee role

--     * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)