import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar1 from '../components/navbar1';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // For total price
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("กรุณาเข้าสู่ระบบเพื่อดูตะกร้าสินค้า");
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCartItems(response.data.data || []);
        calculateTotalPrice(response.data.data);
      } catch (error) {
        setError(`Error fetching cart items: ${error.response ? error.response.data.msg : error.message}`);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.storeitem.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://localhost:3000/cart/${itemId}`, {
        quantity: newQuantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(prevItems =>
        prevItems.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
      calculateTotalPrice(cartItems);
    } catch (error) {
      setError(`Error updating quantity: ${error.response ? error.response.data.msg : error.message}`);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      calculateTotalPrice(cartItems);
    } catch (error) {
      setError(`Error deleting item: ${error.response ? error.response.data.msg : error.message}`);
    }
  };

  const handleProceedToPayment = async () => {
    const token = localStorage.getItem('token');

    try {
      // Prepare to check stock availability before proceeding
      const stockCheckPromises = cartItems.map(item =>
        axios.post('http://localhost:3000/stock/stock1', {
          storeItemId: item.storeItemId,
          quantity: item.quantity
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      // Check if all items have sufficient stock
      await Promise.all(stockCheckPromises);

      // Create a new bill using the provided API
      const billData = {
        totalprice: totalPrice,
        status: 'WAITING'
      };

      // Send the bill data without including the totalprice in the URL
      const billResponse = await axios.post('http://localhost:3000/bill', billData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!billResponse.data.result) {
        throw new Error(`Error creating bill: ${billResponse.data.msg}`);
      }

      // After successfully creating the bill, navigate to the payment page
      navigate('/Payment', {
        state: {
          cartItems,
          totalPrice
        }
      });
    } catch (error) {
      // Provide a more informative error message
      setError(`Error processing payment: ${error.response ? error.response.data.msg : error.message || "Unknown error occurred."}`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!cartItems.length) {
    return <div>Cart is empty.</div>;
  }

  return (
    <>
      <Navbar1 />
      <div className="container32">
        <h1>Your Cart</h1>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <h2>{item.storeitem ? item.storeitem.name : 'Product name not available'}</h2>
              <div className='w-[20%] h-[20%] m-5 flex flex-row gap-[50%]'>
                <img src={item.storeitem.image} alt={item.storeitem.image} />
                <p className='font-bold'>{item.storeitem.discription}</p>
              </div>
              <p><label className='font-bold'>Quantity: </label>{item.quantity}</p>
              <p><label className='font-bold'>Price: $</label> {item.storeitem ? item.storeitem.price : 'Price not available'}</p>
              <div className='quantity-container'>
                <button className="btn btn-active bg-[#DEAC80] text-white btn-sm" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                  className='putin'
                />
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="btn btn-active bg-[#603F26] text-white btn-sm">
                  +
                </button>
              </div>
              <button className="btn btn-active bg-[#DEAC80] text-white ml-[85%] mt-10" onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice}</h3>
        <div className='button-container123'>
          <Link to="/">
            <button className="btn btn-active bg-[#F8C794] text-white ">Continue Shopping</button>
          </Link>
          <Link to='/Payment'>
            <button className="btn btn-active bg-[#6F5039] text-white" onClick={handleProceedToPayment}>Buy</button>
          </Link>
        </div>

      </div>

    </>

  );
}

export default Cart;
