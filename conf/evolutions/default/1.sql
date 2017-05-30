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
# --- !Downs
DROP TABLE Addresses CASCADE;
DROP TABLE Selections;
DROP TABLE Items;
DROP TABLE Categories;
DROP TABLE PurchaseStatuses;
DROP TABLE UserAddressRelation;
DROP TABLE Users CASCADE;


