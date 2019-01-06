-- Drops the projects_db if it exists currently --
DROP DATABASE IF EXISTS projects_db;
-- Creates the "projects_db" database --
CREATE DATABASE projects_db;

-- Makes it so all of the following code will affect projects_db --
USE projects_db;

-- Creates the table "customers" within projects_db --
CREATE TABLE customers (
  -- Makes a string column called "food" which cannot contain null --
  company_name VARCHAR(50) NOT NULL,
  -- Makes an string column called "email" --
  email VARCHAR(100) NOT NULL,
  primary_contact VARCHAR(30),
  -- phone_number is stored as VARCHAR because there are often non-numeric characters provided --
  phone_number VARCHAR(20),
  currently_active BOOLEAN
);

CREATE TABLE projects (
  name VARCHAR(100) NOT NULL,
  company_name VARCHAR(50) NOT NULL,
  start_date DATE,
  due_date DATE
);

CREATE TABLE invoices (
  invoice_number INTEGER NOT NULL,
  -- Defines amount as a DECIMAL so that we can store non-whole numbers --
  -- It can be 10 total digits long, with a scale of 2 --
  -- Scale is simply the number of digits after the decimal point --
  amount DECIMAL(10,2),
  -- if no value is provided for paid, it defaults to false --
  paid BOOLEAN DEFAULT false
);

-- Add at least 3 rows of data to each table --

INSERT INTO customers (company_name, email)
VALUES ('Umbrella Corporation', 'ospencer@umbrella.corp');

INSERT INTO customers (company_name, email)
VALUES ('Veridian Dynamics', 'ted@veridiandynamics.com');

INSERT INTO customers (company_name, email)
VALUES ('Dunder Mifflin', 'dschrute@dunder-mifflin.com');


INSERT INTO projects (name, company_name, start_date, due_date)
VALUES ('Ongoing Maintenance', 'Dunder Mifflin', '2018-08-01' ,'2020-01-01');

INSERT INTO projects (name, company_name, start_date, due_date)
VALUES ('Network Infrastructure Upgrade', 'Veridian Dynamics', '2015-06-05' ,'2015-08-05');

INSERT INTO projects (name, company_name)
VALUES ('Reconfigure Security Protocols', 'Veridian Dynamics');


INSERT INTO invoices (invoice_number, amount, paid)
VALUES (503141, 1234.56, true);

INSERT INTO invoices (invoice_number, amount)
VALUES (503142, 1117);

INSERT INTO invoices  (invoice_number, amount)
VALUES (503143, 512.12);
