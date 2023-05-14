import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  }, []);

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3001/products/${id}`, {
        // updated product data
      })
      .then((response) => {
        // handle success
      })
      .catch((error) => {
        console.error('Error updating product: ', error);
      });
  };

}

export default Products;
