-- Used command in postgreSQL
CREATE DATABASE CRUD;

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,             
    first_name VARCHAR(50) NOT NULL,   
    last_name VARCHAR(50) NOT NULL,    
    email VARCHAR(100) NOT NULL UNIQUE, 
    phone_number VARCHAR(15) NOT NULL, 
    company VARCHAR(100),              
    job_title VARCHAR(100),            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);
