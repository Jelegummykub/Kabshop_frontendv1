import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbarcat from '../components/Navbarcat';

function Pen() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState('USER');
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, discription: '', image: '', isActive: true });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', price: 0, discription: '', image: '', isActive: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const storeId = 1;
      const response = await axios.get(`http://localhost:3000/item/${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data || []);
      await checkUserRole();
    } catch (error) {
      setError('Error fetching products. Please try again.');
      console.error('Error fetching products:', error);
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
      } else {
        console.error("User data does not have an ID:", userData);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        console.error('Error fetching user role:', error);
      }
    }
  };

  const createProduct = async (storeId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`http://localhost:3000/item/${storeId}`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProduct({ name: '', price: 0, discription: '', image: '', isActive: true });
    } catch (error) {
      setError('Error creating product. Please try again later.');
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (storeId, productId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(`http://localhost:3000/item/${storeId}/${productId}`, { ...updatedProduct, id: productId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === productId ? response.data : product))
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

  const removeProduct = async (storeId, productId) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:3000/item/${storeId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      setSelectedProductId(null); // Clear selected product ID after deletion
    } catch (error) {
      setError('Error deleting product. Please try again later.');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbarcat />
      <div className='containerproduct'>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Loading...</div>}
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
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <div className="button-container">
              <button className="btn btn-neutral" onClick={() => createProduct(1)} disabled={loading}>
                Create Product
              </button>
            </div>
            <div className='product-grid'>
              {Array.isArray(products) && products.map((product, index) => (
                <div key={product.id} className="product-edit">
                  <h4>Product {index + 1}: {product.name}</h4>
                  <div className="button-container">
                    <button className="btn btn-neutral" onClick={() => {
                      setSelectedProductId(product.id);
                      setUpdatedProduct({ name: product.name, price: product.price, description: product.description, image: product.image, isActive: product.isActive });
                    }}>
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
                          value={updatedProduct.description}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Updated Image URL"
                          value={updatedProduct.image}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                        <div className="button-container">
                          <button className="btn btn-neutral" onClick={() => updateProduct(1, product.id)} disabled={loading}>
                            Update Product
                          </button>
                          <button className="btn btn-error" onClick={() => removeProduct(1, product.id)} disabled={loading}>
                            Delete Product
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        <div className="product-grid">
          {Array.isArray(products) && products.map((product) => (
            <div key={product.id} className="product-item">
              <div className='productall'>
                <div className='proimg'>
                  <img src={product.image || "/pigg/sommai.jpg"} alt={product.name} />
                </div>
                <div className='priceandbutton1'>
                  <h3>{product.name}</h3>
                  <p>{product.discription}</p>
                </div>
                <Link to={`/product/${product.id}`}>
                  <div className='priceandbutton'>
                    <p>{product.price}</p>
                    <button className="btn btn-neutral btn-sm">Shop</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pen;
