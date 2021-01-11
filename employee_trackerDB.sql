DROP DATABASE IF EXISTS employee_trackerDB ;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- --role id 1 = Software engineer, 2 = sales, 3 =customer service,

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)	
  );


CREATE TABLE role (
id INT AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)	

  );


CREATE TABLE employee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30)  NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id)	

  );

INSERT INTO department (name)
VALUES ("Devante");

INSERT INTO role (title, salary, department_id )-- department_id  is dept id the same as primaart key id?
VALUES ("Tech Lead", 100000 , 1 );

INSERT INTO employee (first_name, last_name, role_id )-- role_id  is role id the same as primaart key id?
VALUES ("Devante", "Williams", 1);


INSERT INTO department (name)
VALUES ("Stan");

INSERT INTO role (title, salary, department_id )-- department_id  is dept id the same as primaart key id?
VALUES ("Software Engineer", 75000, 1 );

INSERT INTO employee (first_name, last_name, role_id, manager_id )-- role_id  is role id the same as primaart key id?
VALUES ("Stan", "Daman", 1, 1);



INSERT INTO department (name)
VALUES ("Randy");

INSERT INTO role (title, salary, department_id )-- department_id  is dept id the same as primaart key id?
VALUES ("Sales", 90000, 2 );

INSERT INTO employee (first_name, last_name, role_id, manager_id )-- role_id  is role id the same as primaart key id?
VALUES ("Randy", "Land", 2, 1);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;