import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleUpdate = (index) => {
    const newProducts = [...products];
    newProducts[index].isEditing = true;
    setProducts(newProducts);
  };

  const handleEdit = (index, newName) => {
    if (!newName) {
      alert("Name cannot be empty.");
      return;
    }
    const updatedProduct = {
      ...products[index],
      Name: newName
    };
    axios.put(`http://localhost:3001/products/${updatedProduct.Id}`, updatedProduct)
      .then(() => {
        const newProducts = [...products];
        newProducts[index] = updatedProduct;
        newProducts[index].isEditing = false;
        setProducts(newProducts);
      })
      .catch(err => console.log(err));
  };
  
  const handleInsert = () => {
    if (!newProductName) {
      alert("Name cannot be empty.");
      return;
    }
    const newProduct = {
      Name: newProductName,
      ProductType: "",
      AssignedAttributes: [],
      isEditing: false
    };
    axios.post(`http://localhost:3001/products`, newProduct)
      .then(res => {
        const newProducts = [...products, res.data];
        setProducts(newProducts);
        setNewProductName("");
      })
      .catch(err => console.log(err));
  };

  const handleCancel = (index) => {
    const newProducts = [...products];
    newProducts[index].isEditing = false;
    setProducts(newProducts);
  };

  const handleInputChange = (event, index) => {
    const newProducts = [...products];
    const field = event.target.name;
    const value = event.target.value;
    newProducts[index][field] = value;
    setProducts(newProducts);
  };
  
  const handleDelete = (index) => {
    axios.delete(`http://localhost:3001/products/${products[index].Id}`)
      .then(() => {
        const newProducts = [...products];
        newProducts.splice(index, 1);
        setProducts(newProducts);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Products:</h2>
      <ul>
        {products.map((product, index) => (
          <li key={product.Id}>
            {!product.isEditing ? (
              <>
                <div>Name: {product.Name}</div>
                <button onClick={() => handleUpdate(index)}>Edit</button>
              </>
            ) : (
              <>
                <input name="Name" value={product.Name} onChange={(event) => handleInputChange(event, index)} />
                <button onClick={() => handleEdit(index, product.Name)}>Save</button>
                <button onClick={() => handleCancel(index)}>Cancel</button>
              </>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default ProductList;
