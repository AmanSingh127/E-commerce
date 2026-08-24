
CREATE DATABASE buildsphere;
USE buildsphere;
CREATE TABLE users (
 user_id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR (100) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,
 phone VARCHAR(15),
 role ENUM('customer','admin') default 'customer',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;

CREATE table categories (
	category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

DESCRIBE categories;

CREATE table products (
product_id INT AUTO_INCREMENT PRIMARY KEY,
category_id INT NOT NULL,
brand VARCHAR(50) NOT NULL,
name VARCHAR(150) NOT NULL,
description TEXT,
price DECIMAL(10,2) NOT NULL,
stock INT NOT NULL DEFAULT 0,
image_url VARCHAR(500),
status ENUM ('active','inactive') DEFAULT 'active',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

DESCRIBE products;

CREATE TABLE specifications(
specification_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE,
unit VARCHAR(20)
);

DESCRIBE specifications;

CREATE TABLE product_specifications (
product_spec_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
specification_id INT NOT NULL,
value VARCHAR(100) NOT NULL,

FOREIGN KEY(product_id) REFERENCES products(product_id),
FOREIGN KEY(specification_id) REFERENCES specifications(specification_id)
);

DESCRIBE product_specifications;

CREATE TABLE addresses	(
address_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
phone VARCHAR(15) NOT NULL,
street VARCHAR(255) NOT NULL,
city VARCHAR(100) NOT NULL,
state VARCHAR(100) NOT NULL,
pincode VARCHAR(10) NOT NULL,
country VARCHAR(50) default 'India',

FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DESCRIBE addresses;

CREATE TABLE cart (
cart_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DESCRIBE cart;

CREATE TABLE cart_items (
cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
cart_id INT NOT NULL,
user_id INT NOT NULL,
quantity INT NOT NULL DEFAULT 1,

FOREiGN KEY (cart_id) REFERENCES cart(cart_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DESCRIBE cart_items;

CREATE TABLE wishlist (
wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

DESCRIBE wishlist;

CREATE TABLE orders (
order_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
address_id INT NOT NULL,
total_amount DECIMAL(10,2) NOT NULL,
status ENUM('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
payment_method VARCHAR(50),
payment_status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

DESCRIBE orders;

CREATE TABLE order_items (
order_item_id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL DEFAULT 1,
price_at_purchase DECIMAL(10,2) NOT NULL,

FOREIGN KEY (order_id) REFERENCES orders(order_id),
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

DESCRIBE order_items;

CREATE TABLE reviews (
review_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
product_id INT NOT NULL,
rating INT NOT NULL,
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (product_id) REFERENCES products(product_id),

CHECK (rating BETWEEN 1 AND 5)
);

DESCRIBE reviews;

SHOW TABLES;

INSERT INTO categories(name)
VALUES
('CPU'),
('Motherboard'),
('RAM'),
('GPU'),
('Storage'),
('PSU'),
('Cabinet'),
('CPU Cooler');

SELECT * FROM categories;

INSERT INTO specifications(name,unit)
VALUES
('Socket',NULL),
('TDP',NULL),
('Core Count',NULL),
('Thread Count', NULL),
('RAM Type', NULL),
('RAM Speed', 'MHz'),
('RAM Capacity', 'GB'),
('RAM Slots', NULL),
('Maximum RAM', 'GB'),
('Form Factor', NULL),
('PCIe Version', NULL),
('PCIe Slots', NULL),
('M.2 Slots', NULL),
('SATA Ports', NULL),
('VRAM', 'GB'),
('Power Draw', 'W'),
('GPU Length', 'mm'),
('PSU Wattage', 'W'),
('Storage Type', NULL),
('Storage Capacity', 'GB'),
('Interface', NULL),
('Case GPU Clearance', 'mm'),
('CPU Cooler Height', 'mm'),
('Case Type', NULL);

SELECT * FROM specifications;

INSERT INTO products
    (category_id, brand, name, description, price, stock, status)
VALUES
    (1, 'AMD', 'Ryzen 5 5600', '6-core AMD Ryzen desktop processor', 0.00, 0, 'active'),
    (1, 'AMD', 'Ryzen 7 5700X', '8-core AMD Ryzen desktop processor', 0.00, 0, 'active'),
    (1, 'AMD', 'Ryzen 5 7600', '6-core AMD Ryzen desktop processor', 0.00, 0, 'active'),
    (1, 'AMD', 'Ryzen 7 7700', '8-core AMD Ryzen desktop processor', 0.00, 0, 'active'),
    (1, 'AMD', 'Ryzen 7 7800X3D', '8-core AMD Ryzen gaming processor', 0.00, 0, 'active'),
    (1, 'Intel', 'Core i5-12400F', '6-core Intel Core desktop processor', 0.00, 0, 'active'),
    (1, 'Intel', 'Core i5-14400F', '10-core Intel Core desktop processor', 0.00, 0, 'active'),
    (1, 'Intel', 'Core i7-14700K', '20-core Intel Core desktop processor', 0.00, 0, 'active');
    
SELECT * FROM products;  
  
SELECT product_id, brand, name, price, stock
FROM products
WHERE category_id = 1;


INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES

-- Ryzen 5 5600
(1, 1, 'AM4'),
(1, 2, '65'),
(1, 3, '6'),
(1, 4, '12'),
(1, 11, '4.0'),
(1, 5, 'DDR4'),
(1, 9, '128'),

-- Ryzen 7 5700X
(2, 1, 'AM4'),
(2, 2, '65'),
(2, 3, '8'),
(2, 4, '16'),
(2, 11, '4.0'),
(2, 5, 'DDR4'),
(2, 9, '128'),

-- Ryzen 5 7600
(3, 1, 'AM5'),
(3, 2, '65'),
(3, 3, '6'),
(3, 4, '12'),
(3, 11, '5.0'),
(3, 5, 'DDR5'),
(3, 9, '128'),

-- Ryzen 7 7700
(4, 1, 'AM5'),
(4, 2, '65'),
(4, 3, '8'),
(4, 4, '16'),
(4, 11, '5.0'),
(4, 5, 'DDR5'),
(4, 9, '128'),

-- Ryzen 7 7800X3D
(5, 1, 'AM5'),
(5, 2, '120'),
(5, 3, '8'),
(5, 4, '16'),
(5, 11, '5.0'),
(5, 5, 'DDR5'),
(5, 9, '128'),

-- Core i5-12400F
(6, 1, 'LGA1700'),
(6, 2, '65'),
(6, 3, '6'),
(6, 4, '12'),
(6, 11, '5.0'),
(6, 5, 'DDR4/DDR5'),
(6, 9, '128'),

-- Core i5-14400F
(7, 1, 'LGA1700'),
(7, 2, '65'),
(7, 3, '10'),
(7, 4, '16'),
(7, 11, '5.0'),
(7, 5, 'DDR4/DDR5'),
(7, 9, '192'),

-- Core i7-14700K
(8, 1, 'LGA1700'),
(8, 2, '125'),
(8, 3, '20'),
(8, 4, '28'),
(8, 11, '5.0'),
(8, 5, 'DDR4/DDR5'),
(8, 9, '192');


SELECT 
p.product_id,
p.name AS product,
s.name AS specification,
ps.value,
s.unit
FROM product_specifications ps
JOIN products p 
ON ps.product_id = p.product_id
JOIN specifications s 
ON ps.specification_id = s.specification_id
WHERE p.category_id = 1
ORDER BY p.product_id, s.specification_id;

INSERT INTO products
(category_id, brand, name, description, price, stock, status)
VALUES
    (2, 'MSI', 'B550M PRO-VDH WIFI', 'AM4 Micro-ATX motherboard with Wi-Fi', 0.00, 0, 'active'),
    (2, 'ASUS', 'TUF Gaming B550-PLUS', 'AM4 ATX gaming motherboard', 0.00, 0, 'active'),
    (2, 'MSI', 'PRO B650M-A WIFI', 'AM5 Micro-ATX motherboard with Wi-Fi', 0.00, 0, 'active'),
    (2, 'ASUS', 'TUF Gaming B650-PLUS WIFI', 'AM5 ATX gaming motherboard with Wi-Fi', 0.00, 0, 'active'),
    (2, 'MSI', 'MAG B650 Tomahawk WIFI', 'AM5 ATX gaming motherboard with Wi-Fi', 0.00, 0, 'active'),
    (2, 'MSI', 'PRO B760M-A WIFI DDR4', 'Intel LGA1700 Micro-ATX motherboard with DDR4 support', 0.00, 0, 'active'),
    (2, 'MSI', 'PRO B760M-A WIFI DDR5', 'Intel LGA1700 Micro-ATX motherboard with DDR5 support', 0.00, 0, 'active'),
    (2, 'ASUS', 'TUF Gaming Z790-PLUS WIFI', 'Intel LGA1700 ATX gaming motherboard with Wi-Fi', 0.00, 0, 'active');
    
SELECT product_id, brand, name
FROM products
WHERE category_id = 2
ORDER BY product_id;


INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES

-- MSI B550M PRO-VDH WIFI
(9, 1, 'AM4'),
(9, 5, 'DDR4'),
(9, 8, '4'),
(9, 9, '128'),
(9, 10, 'Micro-ATX'),
(9, 11, '4.0'),
(9, 12, '1'),
(9, 13, '2'),
(9, 14, '4'),

-- ASUS TUF Gaming B550-PLUS
(10, 1, 'AM4'),
(10, 5, 'DDR4'),
(10, 8, '4'),
(10, 9, '128'),
(10, 10, 'ATX'),
(10, 11, '4.0'),
(10, 12, '2'),
(10, 13, '2'),
(10, 14, '6'),

-- MSI PRO B650M-A WIFI
(11, 1, 'AM5'),
(11, 5, 'DDR5'),
(11, 8, '4'),
(11, 9, '128'),
(11, 10, 'Micro-ATX'),
(11, 11, '4.0'),
(11, 12, '2'),
(11, 13, '2'),
(11, 14, '4'),

-- ASUS TUF Gaming B650-PLUS WIFI
(12, 1, 'AM5'),
(12, 5, 'DDR5'),
(12, 8, '4'),
(12, 9, '128'),
(12, 10, 'ATX'),
(12, 11, '4.0'),
(12, 12, '2'),
(12, 13, '3'),
(12, 14, '4'),

-- MSI MAG B650 Tomahawk WIFI
(13, 1, 'AM5'),
(13, 5, 'DDR5'),
(13, 8, '4'),
(13, 9, '128'),
(13, 10, 'ATX'),
(13, 11, '4.0'),
(13, 12, '2'),
(13, 13, '3'),
(13, 14, '6'),

-- MSI PRO B760M-A WIFI DDR4
(14, 1, 'LGA1700'),
(14, 5, 'DDR4'),
(14, 8, '4'),
(14, 9, '128'),
(14, 10, 'Micro-ATX'),
(14, 11, '4.0'),
(14, 12, '2'),
(14, 13, '2'),
(14, 14, '4'),

-- MSI PRO B760M-A WIFI DDR5
(15, 1, 'LGA1700'),
(15, 5, 'DDR5'),
(15, 8, '4'),
(15, 9, '192'),
(15, 10, 'Micro-ATX'),
(15, 11, '4.0'),
(15, 12, '2'),
(15, 13, '2'),
(15, 14, '4'),

-- ASUS TUF Gaming Z790-PLUS WIFI
(16, 1, 'LGA1700'),
(16, 5, 'DDR5'),
(16, 8, '4'),
(16, 9, '192'),
(16, 10, 'ATX'),
(16, 11, '5.0'),
(16, 12, '3'),
(16, 13, '4'),
(16, 14, '4');

SELECT 
p.product_id,
p.name AS product,
s.name AS specification,
ps.value,
s.unit
FROM product_specifications ps
JOIN products p 
ON ps.product_id = p.product_id
JOIN specifications s 
ON ps.specification_id = s.specification_id
WHERE p.category_id = 2
ORDER BY p.product_id, s.specification_id;

INSERT INTO products 
	(category_id,brand,name,description,price,stock,status)
VALUES
(3, 'Corsair', 'Vengeance LPX 16GB DDR4 3200', '16GB DDR4 desktop memory module', 0.00, 0, 'active'),
(3, 'Corsair', 'Vengeance LPX 32GB DDR4 3200', '32GB DDR4 desktop memory kit', 0.00, 0, 'active'),
(3, 'Kingston', 'Fury Beast 16GB DDR4 3200', '16GB DDR4 desktop memory module', 0.00, 0, 'active'),
(3, 'Corsair', 'Vengeance 16GB DDR5 5600', '16GB DDR5 desktop memory module', 0.00, 0, 'active'),
(3, 'Corsair', 'Vengeance 32GB DDR5 6000', '32GB DDR5 desktop memory kit', 0.00, 0, 'active'),
(3, 'Kingston', 'Fury Beast 32GB DDR5 6000', '32GB DDR5 desktop memory kit', 0.00, 0, 'active'),
(3, 'G.Skill', 'Ripjaws S5 32GB DDR5 6000', '32GB DDR5 desktop memory kit', 0.00, 0, 'active'),
(3, 'G.Skill', 'Trident Z5 RGB 32GB DDR5 6000', '32GB DDR5 RGB desktop memory kit', 0.00, 0, 'active');

SELECT product_id, brand, name
FROM products
WHERE category_id = 3
ORDER BY product_id;

INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES

-- Corsair Vengeance LPX 16GB DDR4 3200
(17, 5, 'DDR4'),
(17, 6, '3200'),
(17, 7, '16'),

-- Corsair Vengeance LPX 32GB DDR4 3200
(18, 5, 'DDR4'),
(18, 6, '3200'),
(18, 7, '32'),

-- Kingston Fury Beast 16GB DDR4 3200
(19, 5, 'DDR4'),
(19, 6, '3200'),
(19, 7, '16'),

-- Corsair Vengeance 16GB DDR5 5600
(20, 5, 'DDR5'),
(20, 6, '5600'),
(20, 7, '16'),

-- Corsair Vengeance 32GB DDR5 6000
(21, 5, 'DDR5'),
(21, 6, '6000'),
(21, 7, '32'),

-- Kingston Fury Beast 32GB DDR5 6000
(22, 5, 'DDR5'),
(22, 6, '6000'),
(22, 7, '32'),

-- G.Skill Ripjaws S5 32GB DDR5 6000
(23, 5, 'DDR5'),
(23, 6, '6000'),
(23, 7, '32'),

-- G.Skill Trident Z5 RGB 32GB DDR5 6000
(24, 5, 'DDR5'),
(24, 6, '6000'),
(24, 7, '32');

SELECT 
    p.product_id,
    p.name AS product,
    s.name AS specification,
    ps.value,
    s.unit
FROM product_specifications ps
JOIN products p 
    ON ps.product_id = p.product_id
JOIN specifications s 
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 3
ORDER BY p.product_id, s.specification_id;


INSERT INTO products
    (category_id, brand, name, description, price, stock, status)
VALUES
(4, 'NVIDIA', 'GeForce RTX 4060', 'NVIDIA GeForce RTX 4060 graphics card', 0.00, 0, 'active'),
(4, 'NVIDIA', 'GeForce RTX 4060 Ti 8GB', 'NVIDIA GeForce RTX 4060 Ti 8GB graphics card', 0.00, 0, 'active'),
(4, 'NVIDIA', 'GeForce RTX 4070', 'NVIDIA GeForce RTX 4070 graphics card', 0.00, 0, 'active'),
(4, 'NVIDIA', 'GeForce RTX 4070 SUPER', 'NVIDIA GeForce RTX 4070 SUPER graphics card', 0.00, 0, 'active'),
(4, 'NVIDIA', 'GeForce RTX 4070 Ti SUPER', 'NVIDIA GeForce RTX 4070 Ti SUPER graphics card', 0.00, 0, 'active'),
(4, 'NVIDIA', 'GeForce RTX 4080 SUPER', 'NVIDIA GeForce RTX 4080 SUPER graphics card', 0.00, 0, 'active'),
(4, 'AMD', 'Radeon RX 7600', 'AMD Radeon RX 7600 graphics card', 0.00, 0, 'active'),
(4, 'AMD', 'Radeon RX 7700 XT', 'AMD Radeon RX 7700 XT graphics card', 0.00, 0, 'active'),
(4, 'AMD', 'Radeon RX 7800 XT', 'AMD Radeon RX 7800 XT graphics card', 0.00, 0, 'active'),
(4, 'AMD', 'Radeon RX 7900 GRE', 'AMD Radeon RX 7900 GRE graphics card', 0.00, 0, 'active');

SELECT product_id, brand, name
FROM products
WHERE category_id = 4
ORDER BY product_id;


INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES

-- RTX 4060
(25, 11, '4.0'),
(25, 15, '8'),
(25, 16, '115'),
(25, 17, '244'),

-- RTX 4060 Ti 8GB
(26, 11, '4.0'),
(26, 15, '8'),
(26, 16, '160'),
(26, 17, '244'),

-- RTX 4070
(27, 11, '4.0'),
(27, 15, '12'),
(27, 16, '200'),
(27, 17, '244'),

-- RTX 4070 SUPER
(28, 11, '4.0'),
(28, 15, '12'),
(28, 16, '220'),
(28, 17, '244'),

-- RTX 4070 Ti SUPER
(29, 11, '4.0'),
(29, 15, '16'),
(29, 16, '285'),
(29, 17, '304'),

-- RTX 4080 SUPER
(30, 11, '4.0'),
(30, 15, '16'),
(30, 16, '320'),
(30, 17, '304'),

-- RX 7600
(31, 11, '4.0'),
(31, 15, '8'),
(31, 16, '165'),
(31, 17, '204'),

-- RX 7700 XT
(32, 11, '4.0'),
(32, 15, '12'),
(32, 16, '245'),
(32, 17, '320'),

-- RX 7800 XT
(33, 11, '4.0'),
(33, 15, '16'),
(33, 16, '263'),
(33, 17, '267'),

-- RX 7900 GRE
(34, 11, '4.0'),
(34, 15, '16'),
(34, 16, '260'),
(34, 17, '304');


SELECT 
    p.product_id,
    p.name AS product,
    s.name AS specification,
    ps.value,
    s.unit
FROM product_specifications ps
JOIN products p 
    ON ps.product_id = p.product_id
JOIN specifications s 
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 4
ORDER BY p.product_id, s.specification_id;

INSERT INTO products
(category_id,brand,name,description,price,stock,status)
VALUES
(5,'Samsung','990 EVO 1TB','1TB NVMe PCIe SSD', 0.00, 0, 'active'),
(5, 'Samsung', '990 PRO 1TB', '1TB high-performance NVMe PCIe SSD', 0.00, 0, 'active'),
(5, 'Western Digital', 'Black SN770 1TB', '1TB NVMe PCIe SSD', 0.00, 0, 'active'),
(5, 'Western Digital', 'Black SN850X 1TB', '1TB high-performance NVMe PCIe SSD', 0.00, 0, 'active'),
(5, 'Crucial', 'P3 Plus 1TB', '1TB NVMe PCIe SSD', 0.00, 0, 'active'),
(5, 'Kingston', 'NV2 1TB', '1TB NVMe PCIe SSD', 0.00, 0, 'active'),
(5, 'Samsung', '870 EVO 1TB', '1TB SATA SSD', 0.00, 0, 'active'),
(5, 'Western Digital', 'Blue SN580 1TB', '1TB NVMe PCIe SSD', 0.00, 0, 'active');

SELECT product_id, brand, name
FROM products
WHERE category_id = 5
ORDER BY product_id;

INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES

-- Samsung 990 EVO 1TB
(35, 19, 'NVMe SSD'),
(35, 20, '1000'),
(35, 21, 'M.2'),
(35, 11, '5.0'),

-- Samsung 990 PRO 1TB
(36, 19, 'NVMe SSD'),
(36, 20, '1000'),
(36, 21, 'M.2'),
(36, 11, '4.0'),

-- WD Black SN770 1TB
(37, 19, 'NVMe SSD'),
(37, 20, '1000'),
(37, 21, 'M.2'),
(37, 11, '4.0'),

-- WD Black SN850X 1TB
(38, 19, 'NVMe SSD'),
(38, 20, '1000'),
(38, 21, 'M.2'),
(38, 11, '4.0'),

-- Crucial P3 Plus 1TB
(39, 19, 'NVMe SSD'),
(39, 20, '1000'),
(39, 21, 'M.2'),
(39, 11, '4.0'),

-- Kingston NV2 1TB
(40, 19, 'NVMe SSD'),
(40, 20, '1000'),
(40, 21, 'M.2'),
(40, 11, '4.0'),

-- Samsung 870 EVO 1TB
(41, 19, 'SATA SSD'),
(41, 20, '1000'),
(41, 21, 'SATA III'),

-- WD Blue SN580 1TB
(42, 19, 'NVMe SSD'),
(42, 20, '1000'),
(42, 21, 'M.2'),
(42, 11, '4.0');

SELECT 
    p.product_id,
    p.name AS product,
    s.name AS specification,
    ps.value,
    s.unit
FROM product_specifications ps
JOIN products p 
    ON ps.product_id = p.product_id
JOIN specifications s 
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 5
ORDER BY p.product_id, s.specification_id;

INSERT INTO products
    (category_id, brand, name, description, price, stock, status)
VALUES
(6, 'Corsair', 'CX650', '650W power supply', 0.00, 0, 'active'),
(6, 'Corsair', 'RM650e', '650W fully modular power supply', 0.00, 0, 'active'),
(6, 'Corsair', 'RM750e', '750W fully modular power supply', 0.00, 0, 'active'),
(6, 'MSI', 'MAG A750GL PCIE5', '750W fully modular PCIe 5 power supply', 0.00, 0, 'active'),
(6, 'Corsair', 'RM850e', '850W fully modular power supply', 0.00, 0, 'active'),
(6, 'Cooler Master', 'MWE Gold 850 V2', '850W 80 Plus Gold power supply', 0.00, 0, 'active');

SELECT product_id, brand, name
FROM products
WHERE category_id = 6
ORDER BY product_id;

INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES
(43, 18, '650'),
(44, 18, '650'),
(45, 18, '750'),
(46, 18, '750'),
(47, 18, '850'),
(48, 18, '850');

SELECT 
    p.product_id,
    p.name AS product,
    s.name AS specification,
    ps.value,
    s.unit
FROM product_specifications ps
JOIN products p 
    ON ps.product_id = p.product_id
JOIN specifications s 
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 6
ORDER BY p.product_id;


INSERT INTO products
    (category_id, brand, name, description, price, stock, status)
VALUES
(7, 'Corsair', '3000D Airflow', 'Airflow-focused ATX mid-tower case', 0.00, 0, 'active'),
(7, 'Corsair', '4000D Airflow', 'Airflow-focused ATX mid-tower case', 0.00, 0, 'active'),
(7, 'NZXT', 'H5 Flow', 'Compact airflow-focused ATX case', 0.00, 0, 'active'),
(7, 'NZXT', 'H6 Flow', 'Panoramic airflow-focused ATX case', 0.00, 0, 'active'),
(7, 'Lian Li', 'LANCOOL 216', 'High-airflow ATX mid-tower case', 0.00, 0, 'active'),
(7, 'Cooler Master', 'TD500 Mesh V2', 'Mesh-front ATX mid-tower case', 0.00, 0, 'active');

SELECT product_id, brand, name
FROM products
WHERE category_id = 7
ORDER BY product_id;

INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES
    (49, 22, '360'),
    (49, 24, 'Mid Tower'),

    (50, 22, '360'),
    (50, 24, 'Mid Tower'),

    (51, 22, '365'),
    (51, 24, 'Mid Tower'),

    (52, 22, '365'),
    (52, 24, 'Mid Tower'),

    (53, 22, '392'),
    (53, 24, 'Mid Tower'),

    (54, 22, '410'),
    (54, 24, 'Mid Tower');
    
SELECT 
    p.product_id,
    p.name AS product,
    s.name AS specification,
    ps.value,
    s.unit
FROM product_specifications ps
JOIN products p 
    ON ps.product_id = p.product_id
JOIN specifications s 
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 7
ORDER BY p.product_id, s.specification_id;

INSERT INTO products
    (category_id, brand, name, description, price, stock, status)
VALUES
(8, 'DeepCool', 'AK400', 'Single-tower CPU air cooler', 0.00, 0, 'active'),
(8, 'DeepCool', 'AK620', 'Dual-tower CPU air cooler', 0.00, 0, 'active'),
(8, 'Cooler Master', 'Hyper 212 Halo', 'Single-tower CPU air cooler', 0.00, 0, 'active'),
(8, 'Noctua', 'NH-D15', 'Dual-tower CPU air cooler', 0.00, 0, 'active'),
(8, 'Corsair', 'H100 RGB', '240mm liquid CPU cooler', 0.00, 0, 'active'),
(8, 'Arctic', 'Liquid Freezer III 240', '240mm liquid CPU cooler', 0.00, 0, 'active');

SELECT product_id, brand, name
FROM products
WHERE category_id = 8
ORDER BY product_id;

INSERT INTO product_specifications
    (product_id, specification_id, value)
VALUES
    (55, 1, 'AM4/AM5'),
    (55, 23, '155'),

    (56, 1, 'AM4/AM5'),
    (56, 23, '160'),

    (57, 1, 'AM4/AM5/LGA1700'),
    (57, 23, '154'),

    (58, 1, 'AM4/AM5/LGA1700'),
    (58, 23, '165'),

    (59, 1, 'AM4/AM5/LGA1700'),
    (59, 23, '52'),

    (60, 1, 'AM4/AM5/LGA1700'),
    (60, 23, '38');
    
SELECT 
    p.product_id,
    p.name AS product,
    s.name AS specification,
    ps.value,
    s.unit
FROM product_specifications ps
JOIN products p 
    ON ps.product_id = p.product_id
JOIN specifications s 
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 8
ORDER BY p.product_id, s.specification_id;


DESCRIBE product_specifications;

ALTER TABLE product_specifications
ADD CONSTRAINT unique_product_specification
UNIQUE (product_id, specification_id);

SELECT COUNT(*) AS total_products
FROM products;

SELECT 
    c.category_id,
    c.name AS category,
    COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.name
ORDER BY c.category_id;

SELECT COUNT(*) AS total_specifications
FROM product_specifications;

SELECT 
    p.product_id,
    p.name,
    COUNT(ps.specification_id) AS specification_count
FROM products p
LEFT JOIN product_specifications ps
    ON p.product_id = ps.product_id
GROUP BY p.product_id, p.name
ORDER BY p.product_id;

-- CPU → Motherboard
SELECT 
    p.product_id,
    p.name AS motherboard,
    ps.value AS socket
FROM products p
JOIN product_specifications ps
    ON p.product_id = ps.product_id
JOIN specifications s
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 2
  AND s.name = 'Socket'
  AND ps.value = (
      SELECT ps2.value
      FROM product_specifications ps2
      JOIN specifications s2
          ON ps2.specification_id = s2.specification_id
      WHERE ps2.product_id = 1
        AND s2.name = 'Socket'
  )
ORDER BY p.product_id;

-- Motherboard → RAM
SELECT 
    p.product_id,
    p.name AS ram,
    ps.value AS ram_type
FROM products p
JOIN product_specifications ps
    ON p.product_id = ps.product_id
JOIN specifications s
    ON ps.specification_id = s.specification_id
WHERE p.category_id = 3
  AND s.name = 'RAM Type'
  AND ps.value = (
      SELECT ps2.value
      FROM product_specifications ps2
      JOIN specifications s2
          ON ps2.specification_id = s2.specification_id
      WHERE ps2.product_id = 9
        AND s2.name = 'RAM Type'
  )
ORDER BY p.product_id;

-- GPU → Motherboard