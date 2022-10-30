const mysql = require("mysql2");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

// create the connection information for the sql database
const mysqlconnection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
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
    name: "openingQuestionName",
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

const openingPrompt = () => {
  inquirer.prompt(openingQuestion).then((response) => {
    if (response === "view all departments") {
      viewAllDepartments();
    } else if (response === "view all roles") {
      viewAllRoles();
    } else if (response === "view all employees") {
      viewAllEmployees();
    } else if (response === "add a department") {
      addDepartment();
    } else if (response === "add a role") {
      addRole();
    } else if (response === "add an employee") {
      addEmployee();
    } else if (response === "update an employee role") {
      updateRole();
    }
  });
};

//function to view departments table
const viewAllDepartments = () => {
  mysqlconnection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    return res;
  });
};

// connection.connect((err) => {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   openingPrompt();
// });

//function to initialize the application when the user types in node index.js in command line
function init() {
  openingPrompt();
}

//calling init function
init();
