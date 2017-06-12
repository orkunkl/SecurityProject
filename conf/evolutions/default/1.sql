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
  picture_directory CHARACTER VARYING
);

CREATE TABLE PurchaseStatuses
(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING,
  quantity INTEGER,
  price INTEGER,
  description CHARACTER VARYING
);
CREATE TABLE UserAddressRelation
(
    user_id INTEGER REFERENCES Users(user_id) ON UPDATE NO ACTION ON DELETE CASCADE,
    address_id INTEGER REFERENCES Addresses(id) ON UPDATE NO ACTION ON DELETE CASCADE
);

INSERT INTO Items (name, quantity, price, description, picture_directory)
VALUES
('Nicholas cage', 5, 15, 'crazy hollywood actor', 'images/220px-Nicolas_Cage_2011_CC.jpg'),
('Nikko cage', 4, 12, 'crazy hollywood bomber', 'images/cage5.jpg'),
('Nikkos cage', 6, 22, 'crazy hollywood bomber', 'images/nicolas_cage_2011_a_p.jpg'),
('Nicolas flagship killer', 6, 70, 'most attractive actor in the world', 'images/Nicolas-Cage.jpg'),
('Nikio cage ', 8, 23, 'havali', 'images/nicolascage-faceoff-crazy.jpg'),
('Cagos', 3, 79, 'crazy hollywood bomber', 'images/nicolascage-faceoff-crazy.jpg');


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
DROP TABLE PurchaseStatuses;
DROP TABLE UserAddressRelation;
DROP TABLE Users CASCADE;


