const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'my_database'
};

const pool = mysql.createPool({
  ...dbConfig,
  connectionLimit: 10
});

// Get all product types
app.get('/product-types', (req, res) => {
  const query = 'SELECT * FROM ProductType';
  console.log('SQL query:', query);
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving product types: ', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to retrieve product types from the database'
      });
    }
    res.status(200).json(results);
  });
});

// Update a product type by ID
app.put('/product-types/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.Name;
  const query = `UPDATE ProductType SET Name = ? WHERE ID = ?`;
  try {
    const [results] = await pool.promise().query(query, [name, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: 'Product type not found'
      });
    }
    res.status(200).json({
      message: 'Product type updated successfully',
      data: {
        ID: id,
        Name: name
      }
    });
  } catch (error) {
    console.error('Error updating product type: ', error);
    res.status(500).json({
      error: true,
      message: 'Failed to update product type in the database'
    });
  }
});

// Get all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM Product';
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving products: ', error);
      return res.status(500).json({
        error: true,
        message: 'Failed to retrieve products from the database'
      });
    }
    res.status(200).json(results);
  });
});



// Update a product by ID
app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.Name;
  const query = `UPDATE Product SET Name = ? WHERE ID = ?`;
  try {
    const [results] = await pool.promise().query(query, [name, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: 'Product not found'
      });
    }
    res.status(200).json({
      message: 'Product updated successfully',
      data: {
        ID: id,
        Name: name
      }
    });
  } catch (error) {
    console.error('Error updating product: ', error);
    res.status(500).json({
      error: true,
      message: 'Failed to update product in the database'
    });
  }
});
// Create a new product
app.post('/products', async (req, res) => {
  const { Name, ProductType, AssignedAttributes } = req.body;

  // Check if required fields are provided
  if (!Name || !ProductType || !AssignedAttributes) {
    return res.status(400).json({
      error: true,
      message: 'Name, ProductType, and AssignedAttributes fields are required'
    });
  }

  const query = 'INSERT INTO Product (Name, ProductType, AssignedAttributes) VALUES (?, ?, ?)';
  const values = [Name, ProductType, JSON.stringify(AssignedAttributes)];

  try {
    const [results] = await pool.promise().query(query, values);

    const newProduct = {
      ID: results.insertId,
      Name: Name,
      ProductType: ProductType,
      AssignedAttributes: AssignedAttributes
    };

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product: ', error);
    res.status(500).json({
      error: true,
      message: 'Failed to create product in the database'
    });
  }
});

// Create a new product type in case neededs
app.post('/product-types', async (req, res) => {
  const name = req.body.Name;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({
      error: true,
      message: 'Name cannot be empty'
    });
  }
  const query = 'INSERT INTO ProductType (Name) VALUES (?)';
  try {
    const [results] = await pool.promise().query(query, [name]);
    const newProductType = {
      ID: results.insertId,
      Name: name
    };
    res.status(201).json(newProductType);
  } catch (error) {
    console.error('Error creating product type: ', error);
    res.status(500).json({
      error: true,
      message: 'Failed to create product type in the database'
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
