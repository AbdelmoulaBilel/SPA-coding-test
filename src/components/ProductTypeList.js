import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTypeList.css';

function ProductTypeList() {
  const [productTypes, setProductTypes] = useState([]);
  const [error, setError] = useState(null);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/product-types')
      .then(res => setProductTypes(res.data))
      .catch(err => setError(err.message));
  }, [reloadData]);

  const handleUpdate = (index) => {
    const newProductTypes = [...productTypes];
    newProductTypes[index].isEditing = true;
    setProductTypes(newProductTypes);
  };

  const handleEdit = (index, newName) => {
    const productType = productTypes[index];
    if (!newName || newName.trim().length === 0) {
      setError('Name cannot be empty');
      return;
    }
    const updatedProductType = { ...productType, Name: newName, ID: productType.Id };
    axios.put(`http://localhost:3001/product-types/${productType.Id}`, updatedProductType)
      .then(res => {
        const updatedProductTypeResponse = res.data;
        const newProductTypes = [...productTypes];
        const indexToUpdate = newProductTypes.findIndex(pt => pt.Id === updatedProductTypeResponse.Id);
        newProductTypes[indexToUpdate] = updatedProductTypeResponse;
        newProductTypes[indexToUpdate].isEditing = false;
        setProductTypes(newProductTypes);
        setReloadData(true); // set the state variable to trigger the useEffect hook to reload the data
        window.location.reload(); // refresh the page
      })
      .catch(err => setError(err.message));
  };

  const handleCancel = (index) => {
    const newProductTypes = [...productTypes];
    newProductTypes[index].isEditing = false;
    setProductTypes(newProductTypes);
  };

  const handleInputChange = (event, index) => {
    const newProductTypes = [...productTypes];
    newProductTypes[index].Name = event.target.value;
    setProductTypes(newProductTypes);
  };

  return (
    <div>
      <h2 className="mb-4">Product Types:</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <ul className="list-group">
        {productTypes.map((type, index) => (
          <li key={type.Id} className="list-group-item d-flex justify-content-between align-items-center">
            {!type.isEditing ? (
              <>
                <span>{type.Name}</span>
                <button className="btn btn-sm btn-primary ml-2" onClick={() => handleUpdate(index)}>Edit</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={type.Name ?? ''}
                  onChange={(event) => handleInputChange(event, index)}
                />
                <button
                  className="btn btn-sm btn-success ml-2"
                  onClick={() => handleEdit(index, productTypes[index].Name)}
                >
                  Save
                </button>
                <button className="btn btn-sm btn-danger ml-2" onClick={() => handleCancel(index)}>Cancel</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductTypeList;
