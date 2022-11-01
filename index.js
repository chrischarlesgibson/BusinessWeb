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
      "exit",
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
    type: "list",
    message: "select the role's department",
    name: "departmentList",
    choices: function () {
      let departmentChoiceArray = response.map(
        (departmentChoice) => departmentChoice.name
      );
      console.log(departmentChoiceArray);
      return departmentChoiceArray;
    },
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lastName",
  },
  {
    type: "input",
    message: "What is the employee's role?",
    name: "employeeRole",
  },
  {
    type: "input",
    message: "Who is the employee's manager?",
    name: "employeeManager",
  },
];

const updateEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's id?",
    name: "employeeId",
  },
  {
    type: "input",
    message: "What is the employee's new role id?",
    name: "newEmployeeRole",
  },
];

const openingPrompt = () => {
  inquirer.prompt(openingQuestion).then((response) => {
    if (response.task === "view all departments") {
      viewAllDepartments();
    } else if (response.task === "view all roles") {
      viewAllRoles();
      // getRoleList();
    } else if (response.task === "view all employees") {
      viewAllEmployees();
    } else if (response.task === "add a department") {
      addDepartment();
    } else if (response.task === "add a role") {
      addRole();
    } else if (response.task === "add an employee") {
      addEmployee();
    } else if (response.task === "update an employee role") {
      updateEmployee();
    }
  });
};

// function to view all departments
function viewAllDepartments() {
  mysqlconnection
    .promise()
    .query("SELECT * FROM department;")
    .then((results) => {
      console.table(results[0]);
    })
    .catch(console.error)
    .then(() => openingPrompt());
}
//function to view all roles
function viewAllRoles() {
  mysqlconnection
    .promise()
    .query("SELECT * FROM employee_role;")
    .then((results) => {
      console.table(results[0]);
    })
    .catch(console.error)
    .then(() => openingPrompt());
}

function viewAllEmployees() {
  mysqlconnection
    .promise()
    .query(
      `SELECT employee_info.employee_id,  employee_info.first_name, employee_info.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee_info LEFT JOIN employee_role on employee_role.role_id =  employee_info.role_id  LEFT JOIN department on department.department_id = employee_role.department_id LEFT JOIN employee_info manager on manager.manager_id = employee_info.manager_id
    ORDER by employee_info.last_name;`
    )
    .then((results) => {
      console.table(results[0]);
    })
    .catch(console.error)
    .then(() => openingPrompt());
}

function addDepartment() {
  inquirer.prompt(addDepartmentQuestion).then((response) => {
    mysqlconnection
      .promise()
      .query(
        `INSERT INTO department(department_name)
  VALUES (?)`,
        [response.departmentName]
      )
      .then(() => {
        console.log("department added successfully");
      })
      .catch(console.log("this is already a department"))
      .then(() => openingPrompt());
  });
}

//using prepared statements so that mysql package knows to check for any suspicious inputs
function addRole() {
  inquirer.prompt(addRoleQuestions).then((response) => {
    mysqlconnection.query(
      `INSERT INTO employee_role(title,salary)
    VALUES (?,?)`,
      [response.roleName, response.roleSalary]
    );
    mysqlconnection.query(
      `INSERT INTO department(department_name)
  VALUES (?)`,
      [response.roleDepartment]
    );
  });
}

function addRole() {
  inquirer.prompt(addRoleQuestions).then((response) => {
    mysqlconnection.promise().query(
      `INSERT INTO employee_role(title,salary)
      VALUES (?,?)`,
      [response.roleName, response.roleSalary]
    );
    mysqlconnection
      .promise()
      .query(
        `INSERT INTO department(department_name)
  VALUES (?)`,
        [response.roleDepartment]
      )
      .then(() => {
        console.log("role added successfully");
      })
      .catch(console.error)
      .then(() => openingPrompt());
  });
}

function addEmployee() {
  inquirer.prompt(addEmployeeQuestions).then((response) => {
    console.log(response);
    mysqlconnection
      .promise()
      .query(
        `INSERT INTO employee_info
      (first_name,last_name, manager_id,role_id)
          VALUES (?,?,?,?)`,
        [
          response.firstName,
          response.lastName,
          response.employeeManager,
          response.employeeRole,
        ]
      )
      .then(() => {
        console.log("employee added successfully");
      })
      .catch(console.error)
      .then(() => openingPrompt());
  });
}

function updateEmployee() {
  inquirer.prompt(updateEmployeeQuestions).then((response) => {
    mysqlconnection
      .promise()
      .query(
        `UPDATE employee_info SET role_id=? WHERE
      employee_info.employee_id = ?`,
        [response.newEmployeeRole, response.employeeId]
      )
      .then(() => {
        console.log("updated successfully");
      })
      .catch(console.error)
      .then(() => openingPrompt());
  });
}

//function to initialize the application when the user types in node index.js in command line
function init() {
  openingPrompt();
}

//calling init function
init();
