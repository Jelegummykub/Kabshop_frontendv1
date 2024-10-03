import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage

      if (!token) {
        setError("กรุณาเข้าสู่ระบบเพื่อดูตะกร้าสินค้า"); // "Please log in to view your cart"
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/cart', {
          headers: {
            Authorization: `Bearer ${token}` // Send token for authentication
          }
        });

        console.log('Cart items fetched:', response.data.data);
        setCartItems(response.data.data || []); // Ensure we always set cartItems to an array
      } catch (error) {
        console.error('Error fetching cart items:', error.response);
        setError(`Error fetching cart items: ${error.response ? error.response.data.msg : error.message}`);
      }
    };

    fetchCartItems();
  }, []);

  // Function to update the quantity of an item
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      const response = await axios.put(`http://localhost:3000/cart/${itemId}`, {
        quantity: newQuantity
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Send token for authentication
        }
      });

      // Update cartItems state after successful update
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      console.log('Quantity updated:', response.data);
    } catch (error) {
      console.error('Error updating quantity:', error.response);
      setError(`Error updating quantity: ${error.response ? error.response.data.msg : error.message}`);
    }
  };

  // Function to delete an item from the cart
  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      const response = await axios.delete(`http://localhost:3000/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send token for authentication
        }
      });

      // Update cartItems state after successful deletion
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));

      console.log('Item deleted:', response.data);
    } catch (error) {
      console.error('Error deleting item:', error.response);
      setError(`Error deleting item: ${error.response ? error.response.data.msg : error.message}`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!cartItems.length) {
    return <div>Cart is empty.</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h2>{item.storeitem ? item.storeitem.name : 'Product name not available'}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.storeitem ? item.storeitem.price : 'Price not available'}</p>
            {/* Update Quantity Input */}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
              min="1"
            />
            {/* Delete Button */}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
}

export default Cart;
