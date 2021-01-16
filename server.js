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
      choices: ["ADD EMPLOYEE","ADD DEPARTMENT", "DELETE EMPLOYEE", "VIEW ALL EMPLOYEES" , "VIEW ALL DEPARTMENTS", "VIEW ALL ROLES"],
    })
    .then(function (answer) {
      if (answer.task === "ADD EMPLOYEE") {
        addEmployee();
      } else if (answer.task === "DELETE EMPLOYEE") {
        delEmployee();
      } else if (answer.task === "VIEW ALL EMPLOYEES") {
        viewEmployees();
      } else if (answer.task === "ADD DEPARTMENT") {
        addDepartment();
      } else if (answer.task === "DELETE DEPARTMENT") {
        delDepartment();
      } else if (answer.task === "VIEW ALL DEPARTMENTS") {
        viewDepartments();
        start();
      } else if (answer.task === "ADD ROLE") {
        addRole();
      } else if (answer.task === "DELETE ROLE") {
        delRole();
      } else if (answer.task === "VIEW ALL ROLES") {
        viewRoles();
        start();
      }
        else {
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


function addDepartment() {
    connection.query( function (err) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "name",
            type: "input",
            message: "What is the name of the department?",
          }
        ])
        .then(function (answer) {
          console.log(answer);
          connection.query("INSERT INTO department ?", answer, function (err) {
            if (err) throw err;
            console.log("Your department was successfully added to the database.");
            start();
          });
        });
  });
}

function addRole() {
  connection.query( function (err) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the role?",
        }
      ])
      .then(function (answer) {
        console.log(answer);
        connection.query("INSERT INTO role ?", answer, function (err) {
          if (err) throw err;
          console.log("Your role was successfully added to the database.");
          start();
        });
      });
});
}

function delDepartment() {
  connection.query( function (err) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the department?",
        }
      ])
      .then(function (answer) {
        console.log(answer);
        connection.query("DELETE FROM department ?", answer, function (err) {
          if (err) throw err;
          console.log("Your department was successfully deleted from the database.");
          start();
        });
      });
});
}

function delEmployee() {
  connection.query( function (err) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the employee you would like to delete?",
        }
      ])
      .then(function (answer) {
        console.log(answer);
        connection.query("DELETE FROM employee ?", answer, function (err) {
          if (err) throw err;
          console.log("Your department was successfully deleted from the database.");
          start();
        });
      });
});
}


function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;

    console.table(results);
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;

    console.table(results);
  });
}


function viewRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;

    console.table(results);
  });
}
