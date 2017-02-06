DROP DATABASE IF EXISTS possiblegazerbookstore;
CREATE DATABASE possiblegazerbookstore;

\c possiblegazerbookstore;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  author VARCHAR,
  genre VARCHAR,
  publish_year INTEGER
);

INSERT INTO books (title, author, genre, publish_year)
  VALUES ('Make up', 'stuff to', 'fill in', '1982');
