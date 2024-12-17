CREATE DATABASE IF NOT EXISTS employee_management;


USE employee_management;


CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  employeeId VARCHAR(10) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(10) NOT NULL,
  department VARCHAR(50) NOT NULL,
  dateOfJoining DATE NOT NULL,
  role VARCHAR(50) NOT NULL
);

select * from employees;