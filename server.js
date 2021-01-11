var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table")


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What would you like to do today?",
      choices: ["ADD EMPLOYEE", "DELETE EMPLOYEE", "VIEW ALL EMPLOYEES"]
    })
    .then(function(answer) {
      if (answer.task === "ADD EMPLOYEE") {
        addEmployee();
      }
      else if(answer.task === "DELETE EMPLOYEE") {
        delEmployee();
      } 
      else if(answer.task === "VIEW ALL EMPLOYEES") {
        viewEmployees();
      }
      
      else{
        connection.end();
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees last name?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What the employees role ID? 1 = Software Engineer | 2 = Sales | 3 = Customer Service"
      },
      {
        name: "managerID",
        type: "input",
        message: "What the manager ID for the employee?"
      }
    
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_ID: answer.roleID,
          manager_ID: answer.managerID
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was successfully added to the database.");
          start();
        }
      );
    });
}

function delEmployee() {
  connection.query("SELECT * FROM employees", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var employeeArray = [];
            for (var i = 0; i < results.length; i++) {
              employeeArray.push(results[i].first_name); //or should i push id 

            }
            return choiceArray;
          },
          message: "which employee would you like to remove?"
        },

      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "DELETE FROM employees WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Employee deleted sucessfully");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}


// function viewEmployees(){
//   connection.query("SELECT * FROM employees", function(err, results) {
//     if (err) throw err;}


//     console.table(results)

  