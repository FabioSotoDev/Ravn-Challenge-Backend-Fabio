-- Database: RAVN-Challenge

-- DROP DATABASE "RAVN-Challenge";

-- Create Database for challenge named "RAVN-Challenge"
CREATE DATABASE "RAVN-Challenge"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Peru.1252'
    LC_CTYPE = 'Spanish_Peru.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- SQL query to create authors table
CREATE TABLE authors (
  id serial PRIMARY KEY,
  name text,
  date_of_birth timestamp
);

-- SQL query to create books table
CREATE TABLE books (
  id serial PRIMARY KEY,
  author_id integer REFERENCES authors (id),
  isbn text
);

-- SQL query to create sale_items table
CREATE TABLE sale_items (
  id serial PRIMARY KEY,
  book_id integer REFERENCES books (id),
  customer_name text,
  item_price money,			
  quantity integer
);