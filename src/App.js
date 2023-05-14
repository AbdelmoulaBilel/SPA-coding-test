import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import ProductTypeList from './components/ProductTypeList';
import ProductList from './components/ProductList';

function App() {
  const [productTypes, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/product-types')
      .then(res => setProductTypes(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleUpdateProductType = (updatedProductType) => {
    axios.put(`http://localhost:3001/product-types/${updatedProductType.id}`, updatedProductType)
      .then(() => {
        const updatedProductTypes = productTypes.map(productType => productType.id === updatedProductType.id ? updatedProductType : productType);
        setProductTypes(updatedProductTypes);
      })
      .catch(err => console.log(err));
  };

  const handleUpdateProduct = (updatedProduct) => {
    axios.put(`http://localhost:3001/products/${updatedProduct.id}`, updatedProduct)
      .then(() => {
        const updatedProducts = products.map(product => product.id === updatedProduct.id ? updatedProduct : product);
        setProducts(updatedProducts);
      })
      .catch(err => console.log(err));
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Welcome to the Product Manager</h1>} />
          <Route path="/product-types" element={
            <>
              <ProductTypeList productTypes={productTypes} onUpdateProductType={handleUpdateProductType} />
            </>
          } />
          <Route path="/products" element={
            <>
              <ProductList products={products} onUpdateProduct={handleUpdateProduct} />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
