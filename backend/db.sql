-- Used command in postgreSQL
CREATE DATABASE CRUD;

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,             
    first_name VARCHAR(50) NOT NULL,   
    last_name VARCHAR(50) NOT NULL,    
    email VARCHAR(100) NOT NULL UNIQUE, 
    phone_number VARCHAR(15) NOT NULL, 
    company VARCHAR(100),              
    job_title VARCHAR(100)
);

-- dummy insert statements for testing
INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title)
VALUES 
('John', 'Doe', 'john.doe@example.com', '123-456-7890', 'ABC Corp', 'Software Engineer'),
('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', 'XYZ Ltd.', 'Marketing Manager'),
('Alice', 'Johnson', 'alice.johnson@example.com', '555-123-4567', 'Tech Solutions', 'Product Manager'),
('Bob', 'Williams', 'bob.williams@example.com', '555-765-4321', 'Innovative Inc.', 'CTO'),
('Charlie', 'Brown', 'charlie.brown@example.com', '123-321-1234', 'Creative Minds', 'Graphic Designer');
