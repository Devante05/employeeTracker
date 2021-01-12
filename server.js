var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What would you like to do today?",
      choices: ["ADD EMPLOYEE", "DELETE EMPLOYEE", "VIEW ALL EMPLOYEES"],
    })
    .then(function (answer) {
      if (answer.task === "ADD EMPLOYEE") {
        addEmployee();
      } else if (answer.task === "DELETE EMPLOYEE") {
        delEmployee();
      } else if (answer.task === "VIEW ALL EMPLOYEES") {
        viewEmployees();
      } else {
        connection.end();
      }
    });
}

function addEmployee() {
  let query = "SELECT title AS name, id AS value FROM role";
  connection.query(query, function (err, roles) {
    if (err) throw err;
    query =
      "SELECT concat(e.first_name, ' ', e.last_name) AS name, id AS value from employee e";
    connection.query(query, function (err, managers) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the employees first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?",
          },
          {
            name: "role_id",
            type: "list",
            choices: roles,
            message:
              "What the employees role ID? 1 = Software Engineer | 2 = Sales | 3 = Customer Service",
          },
          {
            name: "manager_id",
            type: "list",
            choices: managers,
            message: "What the manager ID for the employee?",
          },
        ])
        .then(function (answer) {
          console.log(answer);
          connection.query("INSERT INTO employee SET ?", answer, function (err) {
            if (err) throw err;
            console.log("Your employee was successfully added to the database.");
            start();
          });
        });
    });
  });
}

function delEmployee() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var employeeArray = [];
            for (var i = 0; i < results.length; i++) {
              employeeArray.push(results[i].first_name); //or should i push id .. should i use filter method or should i delete by finding the index of emloyee
            }
            return employeeArray;
          },
          message: "which employee would you like to remove?",
        },
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }
      });
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;

    console.table(results);
  });
}
