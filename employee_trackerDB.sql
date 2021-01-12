DROP DATABASE IF EXISTS employee_trackerDB ;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- role id 1 = Software engineer, 2 = sales, 3 =customer service,
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id) -- PK MUST EXIST AND MUST BE UNIQUE
);


CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES department (id)
);


CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES role (id),
    FOREIGN KEY (manager_id)
        REFERENCES employee (id)
);
-- --Dept table
INSERT INTO department (name)
VALUES ("Mechanic"),("Sales"),("Customer Service");


-- --role table
INSERT INTO role (title, salary, department_id)
VALUES  ("Customer Service Representative", 40000, 3),
("Leads Development", 70000, 2), 
("Engine Technician", 80000 , 1);

-- --employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ("Devante", "Williams" , 2, null),  
("Peter", "Griffin" , 1, 1 ),
("Brian", "Griffin" , 3, 2);  



SELECT 
e.id,
e.first_name,
e.last_name,
title,
name AS department_name,
salary,
concat(m.first_name, ' ', m.last_name)
FROM employee e
LEFT JOIN employee m
ON e.manager_id = m.id
LEFT JOIN role r
ON e.role_id = r.id
LEFT JOIN department d
ON r.department_id = d.id;
