import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Product Manager</h1>
      <p>Use this application to manage your products and product types.</p>
      <ul>
        <li><Link to="/product-types">Product Types</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>
    </div>
  );
}

export default Home;
