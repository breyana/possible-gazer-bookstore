DROP DATABASE IF EXISTS possiblegazerbookstore;
CREATE DATABASE possiblegazerbookstore;

\c possiblegazerbookstore;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  author VARCHAR,
  genre VARCHAR,
  publish_year INTEGER,
  img VARCHAR
);

INSERT INTO books (title, author, genre, publish_year, img)
  VALUES ('Make up', 'stuff to', 'fill in', '1982', 'http://i1.wp.com/brittwd.com/wp-content/uploads/2017/01/how-bow-dah.jpg');
