import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarpaper from '../components/Navbarpaper';

function Paper() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState('USER');
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, discription: '', image: '', isActive: true });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', price: 0, discription: '', image: '', isActive: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const cagetoryId = 2; // Set cagetoryId to 2

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3000/cagetory/${cagetoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      await checkUserRole();
    } catch (error) {
      setError('Error fetching products. Please try again.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`http://localhost:3000/item/${cagetoryId}`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the products state with the newly created product
      setProducts((prevProducts) => [...(prevProducts || []), response.data.data]);
      setNewProduct({ name: '', price: 0, discription: '', image: '', isActive: true });
    } catch (error) {
      setError('Error creating product. Please try again later.');
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(`http://localhost:3000/item/${cagetoryId}/${productId}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) =>
        (prevProducts || []).map((product) => (product.id === productId ? response.data.data : product))
      );
      setSelectedProductId(null);
      setUpdatedProduct({ name: '', price: 0, discription: '', image: '', isActive: true });
    } catch (error) {
      setError('Error updating product. Please try again later.');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:3000/item/${cagetoryId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) => (prevProducts || []).filter((product) => product.id !== productId));
      setSelectedProductId(null);
    } catch (error) {
      setError('Error deleting product. Please try again later.');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/@me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data.user;
      if (userData && userData.id) {
        setRole(userData.role || 'USER');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        console.error('Error fetching user role:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbarpaper />
      <div className='containerproduct'>
        {error && <div className="error-message">{error}</div>}

        {/* Loading state */}
        {loading && <div className="loading-message">Loading...</div>}

        {/* If products are available, display them */}

        {/* Display message if no products are found */}
        {!loading && products.length === 0 && (
          <div>No products found in the database.</div>
        )}

        {/* ADMIN role section for creating products */}
        {role === 'ADMIN' && (
          <div className="Addremove">
            <h3>Create New Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.discription}
              onChange={(e) => setNewProduct({ ...newProduct, discription: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <div className="button-container">
              <button className="btn btn-neutral" onClick={createProduct} disabled={loading}>
                Create Product
              </button>
            </div>
          </div>
        )}

        {/* ADMIN role section for editing/removing products */}
        {role === 'ADMIN' && (
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={product.id} className="product-edit">
                <h4>Product {index + 1}: {product.name}</h4>
                <p>Description: {product.discription}</p>
                <p>Price: ${product.price}</p>
                <img src={product.image} alt={product.name} width="100" />
                <div className="button-container">
                  <button
                    className="btn btn-neutral"
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setUpdatedProduct({
                        name: product.name,
                        price: product.price,
                        discription: product.discription,
                        image: product.image,
                        isActive: product.isActive,
                      });
                    }}
                  >
                    Edit Product
                  </button>
                  {selectedProductId === product.id && (
                    <>
                      <input
                        type="text"
                        placeholder="Updated Name"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Updated Price"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
                      />
                      <input
                        type="text"
                        placeholder="Updated Description"
                        value={updatedProduct.discription}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, discription: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Updated Image URL"
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                      />
                      <div className="button-container">
                        <button
                          className="btn btn-neutral"
                          onClick={() => updateProduct(product.id)}
                          disabled={loading}
                        >
                          Update Product
                        </button>
                        <button
                          className="btn btn-error"
                          onClick={() => removeProduct(product.id)}
                          disabled={loading}
                        >
                          Remove Product
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length > 0 && (
          <>
            <h3>Existing Products</h3>
            <div className="product-grid">
              {products.map((product, index) => (
                <div key={product.id} className="product-card">
                  <h4>Product {index + 1}: {product.name}</h4>
                  <p>Description: {product.discription}</p>
                  <p>Price: ${product.price}</p>
                  <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </>
  );
}

export default Paper;
