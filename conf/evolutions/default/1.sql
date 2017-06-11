# Database schema

# --- !Ups

CREATE TABLE Users
(
  user_id SERIAL PRIMARY KEY,
  email character varying,
  username character varying,
  name character varying,
  surname character varying,
  password character varying,
  is_admin boolean
);

CREATE TABLE Addresses
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id) ON UPDATE NO ACTION ON DELETE CASCADE,
  street character varying,
  number INTEGER,
  city character varying,
  zip_code INTEGER,
  state character varying,
  country character varying
);

CREATE TABLE Selections
(
  id SERIAL PRIMARY KEY,
  expiraton_date TIMESTAMP,
  user_id INTEGER REFERENCES Users(user_id) ON UPDATE NO ACTION ON DELETE CASCADE,
  status INTEGER
);

CREATE TABLE Items
(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING,
  quantity INTEGER,
  price INTEGER,
  description CHARACTER VARYING,
  category_id INTEGER,
  picture_directory CHARACTER VARYING
);

CREATE TABLE Categories
(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING
);

CREATE TABLE PurchaseStatuses
(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING,
  quantity INTEGER,
  price INTEGER,
  description CHARACTER VARYING,
  categoryID INTEGER
);
CREATE TABLE UserAddressRelation
(
    user_id INTEGER REFERENCES Users(user_id) ON UPDATE NO ACTION ON DELETE CASCADE,
    address_id INTEGER REFERENCES Addresses(id) ON UPDATE NO ACTION ON DELETE CASCADE
);

INSERT INTO Users (email, username, name, surname, password, is_admin)
VALUES
 ('orkunkl@gmail.com', 'orkunk', 'orkun', 'kulce', '$2a$10$u0VGxdpHiKd/iyzQOERtrukWaKs15t8ZmkN5PQ962fUcCRZGpO/zW', TRUE),
 ('furkk@gmail.com', 'furkank', 'furkan', 'kaymak', '$2a$10$nO8Hq/nC5XnmQ6Mzr7bHMe5fg16PWhoBED52jstfMtTWXATYIyeje', FALSE),
 ('alex@gmail.com', 'alexn', 'alex', 'TheDank', '$2a$10$pYi6UbNVWbmd2o/Z0V0sJOBQOuJGa3TGG3srz96GAxQOIE1j6fUAK', FALSE),
 ('bojan@gmail.com', 'bojane', 'bojan', 'maryan', '$2a$10$VixaPfZ6Cb6ZBUg3vBY6meTzA1E0vM7KMMXH.BcUFROEazCjDqTYC', FALSE),
 ('masha@gmail.com', 'mashar', 'masha', 'reko', '$2a$10$m4CZW9njkP65lkQhqGqEX.P.wirGRRpurrG2pgMD4TFyEXHq2M5VK', FALSE);

# --- !Downs
DROP TABLE Addresses CASCADE;
DROP TABLE Selections;
DROP TABLE Items;
DROP TABLE Categories;
DROP TABLE PurchaseStatuses;
DROP TABLE UserAddressRelation;
DROP TABLE Users CASCADE;


