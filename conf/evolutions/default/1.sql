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


CREATE TABLE Items
(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING,
  quantity INTEGER,
  price INTEGER,
  description CHARACTER VARYING,
  picture_directory CHARACTER VARYING
);


CREATE TABLE Selections
(
  id SERIAL PRIMARY KEY,
  expiraton_date TIMESTAMP,
  quantity INTEGER,
  item_id INTEGER REFERENCES Items(id) ON UPDATE NO ACTION ON DELETE CASCADE,
  user_id INTEGER REFERENCES Users(user_id) ON UPDATE NO ACTION ON DELETE CASCADE
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
('Intel Core i7 I7-7700K - Processeur quadricœur 4.2 GHz -', 5, 350, 'Socket LGA 1151\nIntel 200/1001 Series Chipset Compatibility (1. Excludes Intel Optane Technology support)\nIntel HD Graphics 630\nIntel Turbo Boost 2.0 Technology\nIntel Hyper-Threading Technology1\n', 'cpu.jpg'),
('ASUS PRIME Z270-A LGA1151', 4, 230, '5- Way Optimization with Auto-Tuning and FanXpert 4 automatically tailors overclocking profiles to your unique build for maximum OC performance and dynamic system cooling', 'motherboard.jpg'),
('Kingston HyperX Predator 960GB ', 6, 500, 'Supports PCIe - HyperX Predator PCIe SSD delivers blazing-fast PCIe Gen 2.0 x4 speeds that are much faster than any SATA-based SSD.\nIdeal for desktop systems - this SSD is an M.2 form Factor', 'ssd.jpg'),
('ASUS ROG-STRIX-GTX1080TI-O11G-GAMING GeForce 11GB', 6, 1000, '1708 MHz Boost Clock (OC Mode) featuring 11GB GDDR5X 352-bit memory, 3584 CUDA cores, and 11GB Frame Buffer', 'gpu.jpg'),
('Kingston Technology HyperX FURY Black 64 GB Kit DDR4 2400', 8, 600, 'Plug and play - HyperX FURY DDR4 is the first product line to offer automatic overclocking up to the highest frequency published. Get the speed you want - hassle free.', 'ram.jpg'),
('Phanteks Enthoo Elite Extreme Full Tower', 3, 950, 'Phanteks Enthoo Elite Extreme Full Tower chassis aluminum exterior dual system support and water-cooling Cases PH-ES916E_AG', 'case.jpg'),
('Corsair H115i Hydro Series', 5, 140, 'Large 280mm radiator: more cooling capacity for cases which have 280mm radiator mounts.', 'cooling.jpg'),
('Acer Predator XB271HKbmiprz G-Sync', 5, 760, '4K (3840 x 2160) display for gaming. IPS technology. 4ms', 'monitor.jpg'),
('Be Quiet ! Dark Power Pro 11, 1200W', 3, 275, 'It is a fact of the modern world that high technology requires constant refinement and unending improvement — and that is even truer for those who would be leaders. Dark Power Pro power supplies are renowned as the world’s quietest and most efficient high-performance PSUs. The Dark Power Pro 11 1200W model takes that a step further with a power conversion topology that delivers 80PLUS Platinum performance, add to that an unparalleled array of enhancements that augment this unit’s compatibility, convenience of use, reliability, and safety, and the result is the most technologically-advanced power supply be quiet! has ever built.', 'power.jpg');


INSERT INTO Users (email, username, name, surname, password, is_admin)
VALUES
 ('orkunkl@gmail.com', 'orkunk', 'orkun', 'kulce', '$2a$10$u0VGxdpHiKd/iyzQOERtrukWaKs15t8ZmkN5PQ962fUcCRZGpO/zW', TRUE),
 ('furkk@gmail.com', 'furkank', 'furkan', 'kaymak', '$2a$10$nO8Hq/nC5XnmQ6Mzr7bHMe5fg16PWhoBED52jstfMtTWXATYIyeje', FALSE),
 ('alex@gmail.com', 'alexn', 'alex', 'TheDank', '$2a$10$pYi6UbNVWbmd2o/Z0V0sJOBQOuJGa3TGG3srz96GAxQOIE1j6fUAK', FALSE),
 ('bojan@gmail.com', 'bojane', 'bojan', 'maryan', '$2a$10$VixaPfZ6Cb6ZBUg3vBY6meTzA1E0vM7KMMXH.BcUFROEazCjDqTYC', FALSE),
 ('masha@gmail.com', 'mashar', 'masha', 'reko', '$2a$10$m4CZW9njkP65lkQhqGqEX.P.wirGRRpurrG2pgMD4TFyEXHq2M5VK', FALSE),
 ('thibault@cest.lu', 'thibault', 'thibault', 'simonetto' , '$2a$10$m4CZW9njkP65lkQhqGqEX.P.wirGRRpurrG2pgMD4TFyEXHq2M5VK', TRUE);
  

# --- !Downs
DROP TABLE Addresses CASCADE;
DROP TABLE Selections;
DROP TABLE Items;
DROP TABLE PurchaseStatuses;
DROP TABLE UserAddressRelation;
DROP TABLE Users CASCADE;


