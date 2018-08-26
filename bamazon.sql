CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('iPhone X', 'Electronics', 1.149.00, 432),
		('Samsung Note 9', 'Electronics', 999.99, 72),
		('iPad Pro 12.9 inch', 'Electronics', 799.99, 95),
		('iPad Pro 10.5 inch', 'Electronics', 649.00, 90),
		('Mac Book Pro 13 inch', 'Produce', 1.799.00, 130),
		('Mac Book Pro 15 inch', 'Produce', 2.399.00, 150),
		('Surface Pro', 'Computers', 799.00, 4),
		('Air Jordan 1', 'Mens Shoes', 749.00, 200),
		('Nike Air Max 270', 'Mens Shoes', 150.00, 150),
		('Nike mens running pants', 'Mens Clothes', 59.50, 260),
		('Nike mens running sweat top', 'Mens Clothes', 19.99, 270),
		('Nike mens elite running cap', 'Mens Clothes', 20.00, 650),
		('Nike EXP-X14', 'Womens Shoes', 99.97, 210);