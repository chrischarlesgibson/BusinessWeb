const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// create the connection information for the sql database
const mysqlconnection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",

  // Your password
  password: "password",
  database: "your_business_db",
});

// function which prompts the user to pick what they want to do when first opening up the app in the command line
const openingQuestion = [
  {
    type: "list",
    message: "What do you want to do?",
    name: "task",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  },
];

const addDepartmentQuestion = [
  {
    type: "input",
    message: "Enter the department's name",
    name: "departmentName",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    message: "What is the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the role's salary?",
    name: "roleSalary",
  },
  {
    type: "input",
    message: "What department is the role in?",
    name: "roleDepartment",
  },
];

const openingPrompt = () => {
  inquirer.prompt(openingQuestion).then((response) => {
    if (response.task === "view all departments") {
      viewAllDepartments();
    } else if (response.task === "view all roles") {
      viewAllRoles();
    } else if (response.task === "view all employees") {
      viewAllEmployees();
    } else if (response.task === "add a department") {
      addDepartment();
    } else if (response.task === "add a role") {
      addRole();
    } else if (response.task === "add an employee") {
      addEmployee();
    } else if (response.task === "update an employee role") {
      updateRole();
    }
  });
};

// mysqlconnection.connect((err) => {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   openingPrompt();
// });

// function to view all departments
function viewAllDepartments() {
  mysqlconnection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

//function to view all roles
function viewAllRoles() {
  mysqlconnection.query("SELECT * FROM employee_role;", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

//function to view all employees
function viewAllEmployees() {
  mysqlconnection.query(
    `SELECT department.department_name, employee_role.title, employee_role.salary, employee_info.employee_id, employee_info.first_name,employee_info.last_name, employee_info.manager_id
     FROM department JOIN employee_role ON department.department_id= employee_role.department_id
     JOIN employee_info ON employee_role.role_id =employee_info.role_id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}
function addDepartment() {
  inquirer.prompt(addDepartmentQuestion).then((response) => {
    mysqlconnection.query(`INSERT INTO department(department_id,department_name)
  VALUES (0, "${response.departmentName}")`);
  });
}

function addRole() {
  inquirer.prompt(addRoleQuestions).then((response) => {
    console.log(response.roleName);
    console.log(response.roleSalary);
    console.log(response.roleDepartment);
    mysqlconnection.query(`INSERT INTO employee_role(title,salary)
    VALUES ("${response.roleName}", ${response.roleSalary});
  INSERT INTO department(department_name)
  VALUES ("${response.roleDepartment}");`);
  });
}

//function to initialize the application when the user types in node index.js in command line
function init() {
  openingPrompt();
}

//calling init function
init();
