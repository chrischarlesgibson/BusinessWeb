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
      updateEmployeeRole();
    }
  });
};

// function to view all departments
function viewAllDepartments() {
  mysqlconnection
    .promise()
    .query(
      "SELECT department_id AS ID,department_name AS department  FROM department;"
    )
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
    .query(
      `SELECT employee_role.role_id AS ID,employee_role.title, department_name AS department , employee_role.salary FROM employee_role
      LEFT JOIN department ON employee_role.department_id= department.department_id ; `
    )
    .then((results) => {
      console.table(results[0]);
    })
    .catch(console.error)
    .then(() => openingPrompt());
}
//function to view all employees
function viewAllEmployees() {
  mysqlconnection
    .promise()
    .query(
      `SELECT employee_info.employee_id AS ID,  employee_info.first_name, employee_info.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee_info LEFT JOIN employee_role on employee_role.role_id =  employee_info.role_id  LEFT JOIN department on department.department_id = employee_role.department_id LEFT JOIN  employee_info manager ON manager.employee_id = employee_info.manager_id
    ORDER by employee_info.last_name;`
    )
    .then((results) => {
      console.table(results[0]);
    })
    .catch(console.error)
    .then(() => openingPrompt());
}

//fuction to add a department
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
      .catch(console.error)
      .then(() => openingPrompt());
  });
}

//using prepared statements so that mysql package knows to check for any suspicious inputs
//function to add role

function addRole() {
  mysqlconnection.query("SELECT * FROM department", (err, rows) => {
    if (err) throw err;
    inquirer
      .prompt([
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
          name: "departmentList",
          // here im turning the results of the above query into an array by using .map . so the array will contain all of the department names that are already in the sql database and then this array can be displayed as a list of option that the user can select from
          choices: function () {
            let departmentChoiceArray = rows.map((choice) => ({
              name: choice.department_name,
              value: choice.department_id,
            }));
            return departmentChoiceArray;
          },
          message: "select the role's department",
        },
      ])
      .then((response) => {
        mysqlconnection.query(
          `INSERT INTO employee_role(title,salary, department_id)
    VALUES (?,?, ?)`,
          [response.roleName, response.roleSalary, response.departmentList]
        );
      })
      .then(() => {
        console.log("role added successfully");
      })
      .catch(console.error)
      .then(() => openingPrompt());
  });
}

//function to add a new employee
function addEmployee() {
  mysqlconnection.query("SELECT * FROM employee_role", (err, rowsRole) => {
    if (err) throw err;

    mysqlconnection.query("SELECT * FROM employee_info", (err, rows) => {
      if (err) throw err;

      inquirer
        .prompt([
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
            type: "list",
            name: "employeeRole",
            choices: function () {
              // here im turning the results of the above query into an array by using .map(using the first query that returns rowsRole) . so the array will contain all of the role names that are already in the sql database and then this array can be displayed as a list of options that the user can select from
              let roleChoiceArray = rowsRole.map((roleChoice) => ({
                name: roleChoice.title,
                value: roleChoice.role_id,
              }));
              return roleChoiceArray;
            },
            message: "What is the employee's role?",
          },
          {
            type: "list",
            name: "employeeManager",

            choices: function () {
              // here im turning the results of the above query (the second one.. using rows as the name i gave it)into an array by using .map . so the array will contain all of the role names that are already in the sql database and then this array can be displayed as a list of options that the user can select from
              let managerChoiceArray = rows.map((managerChoice) => ({
                name: managerChoice.first_name + " " + managerChoice.last_name,
                value: managerChoice.employee_id,
              }));
              return managerChoiceArray;
            },
            message: "Who is the employee's manager?",
          },
        ])
        .then((response) => {
          mysqlconnection.query(
            `INSERT INTO employee_info( first_name, last_name,manager_id, role_id)
    VALUES (?,?,?,?)`,
            [
              response.firstName,
              response.lastName,
              response.employeeManager,
              response.employeeRole,
            ]
          );
        })
        .then(() => {
          console.log("employee added successfully");
        })
        .catch(console.error)
        .then(() => openingPrompt());
    });
  });
}

//function that allows user to update an existing employees role
function updateEmployeeRole() {
  mysqlconnection.query("SELECT * FROM employee_info", (err, rowsName) => {
    if (err) throw err;

    mysqlconnection.query("SELECT * FROM employee_role", (err, rows) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeFullname",
            choices: function () {
              //displaying list of full employee names that are in the database already so they can pick who is the manager of this employee
              let EmployeeFullname = rowsName.map((choice) => ({
                name: choice.first_name + " " + choice.last_name,
                value: choice.employee_id,
              }));
              return EmployeeFullname;
            },
            message: "What is the employee's name that you want to reassign?",
          },
          {
            type: "list",
            name: "reassignRoleList",

            choices: function () {
              //list of role names to choose from
              let reassignEmployee = rows.map((choice) => ({
                name: choice.title,
                value: choice.role_id,
              }));
              return reassignEmployee;
            },
            message: "what role should this employee be reassigned to?",
          },
        ])
        .then((response) => {
          mysqlconnection.query(
            `UPDATE employee_info SET role_id=? WHERE employee_id=?`,
            [response.reassignRoleList, response.employeeFullname]
          );
        })
        .then(() => {
          console.log("employee role changed successfully");
        })
        .catch(console.error)
        .then(() => openingPrompt());
    });
  });
}

//function to initialize the application when the user types in node index.js in command line
function init() {
  openingPrompt();
}

//calling init function
init();
