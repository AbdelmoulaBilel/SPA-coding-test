REST API
This is a REST API created using Node.js and Express.js. It provides functionality to manage products and product types in a MySQL database.

Getting Started
To get started with this project, follow the instructions below:

Clone the repository to your local machine
Install the required dependencies by running npm install
Update the database configuration in server.js to match your own database    on dbConfig  host: 'localhost',port: 3306,user: 'root', password: 'admin', database: 'my_database'

here is database script: CREATE DATABASE IF NOT EXISTS my_database;

USE my_database;

CREATE TABLE ProductType (
  Id INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Created_at DATETIME NOT NULL,
  Attributes JSON NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE Product (
  Id INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Created_at DATETIME NOT NULL,
  ProductType INT NOT NULL,
  AssignedAttributes JSON NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (ProductType) REFERENCES ProductType(Id)
);

CREATE TABLE Attribute (
  Id INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Type ENUM('text', 'boolean', 'date', 'select', 'multiselect') NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE AttributeValue (
  Id INT NOT NULL AUTO_INCREMENT,
  AssignedAttribute INT NOT NULL,
  Value TEXT,
  Boolean BOOLEAN,
  Date DATETIME,
  PRIMARY KEY (Id),
  FOREIGN KEY (AssignedAttribute) REFERENCES Attribute(Id)
);

PLUS SOME INSERTS  you can paste the script on chatgpt and ask for inserts to make it faster 

Start the Server by running node server.js   
Start the server by running npm start

API Endpoints
The following endpoints are available in this API:

GET /product-types
This endpoint retrieves all product types from the database.

PUT /product-types/:id
This endpoint updates a product type with the given ID in the database. The request body should include the new name for the product type.

GET /products
This endpoint retrieves all products from the database.

PUT /products/:id
This endpoint updates a product with the given ID in the database. The request body should include the new name for the product.

-----------------------------i did not use these two------------------------------
POST /products
This endpoint creates a new product in the database. The request body should include the name, product type, and assigned attributes of the product.

POST /product-types
This endpoint creates a new product type in the database. The request body should include the name of the product type.
----------------------------------------------------------------------

Technologies Used
Node.js
Express.js
MySQL
body-parser
cors
Bootstrap