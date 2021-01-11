DROP DATABASE IF EXISTS employee_trackerDB ;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- --role id 1 = Software engineer, 2 = sales, 3 =customer service,

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  deptName VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)	
  );


CREATE TABLE role (
id INT AUTO_INCREMENT,
title VARCHAR(50) NOT NULL,
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
-- --Dept table
INSERT INTO department (deptName)
VALUES ("Mechanic");

INSERT INTO department (deptName)
VALUES ("Sales");

INSERT INTO department (deptName)
VALUES ("Customer Service");


-- --role table
INSERT INTO role (title, salary, department_id)
VALUES ("Engine Technician", 80000 , 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Leads Devolpment", 70000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Representative", 40000, 3);

-- --employee table

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Peter", "Griffin" , 1, 2 );

INSERT INTO employee (first_name, last_name, role_id,  manager_id)
VALUES ("Devante", "Williams" , 2, 2);   

INSERT INTO employee (first_name, last_name, role_id,  manager_id)
VALUES ("Brian", "Griffin" , 3, 2);  


SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;