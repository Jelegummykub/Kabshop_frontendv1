import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar1 from '../components/navbar1';

function Product() {
  const { id } = useParams(); // Get ID from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log(`ID before request: ${id}`); // Log ID

      const itemId = parseInt(id);
      console.log(`ID type: ${typeof id}, Parsed ID: ${itemId}`); // Log ID type and parsed ID

      if (isNaN(itemId)) {
        setError("Invalid Product ID");
        return;
      }

      console.log(`Fetching product with ID: ${itemId}`);
      try {
        const response = await axios.get(`http://localhost:3000/item/${itemId}`);
        console.log('Product fetched:', response.data);
        setProduct(response.data.data); // Access the product data correctly
      } catch (error) {
        console.error('Error fetching product:', error.response);
        setError(`Error fetching product: ${error.response ? error.response.data.msg : error.message}`);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    // Check if the user is logged in by looking for a token in local storage
    const token = localStorage.getItem('token'); // Replace with your token storage logic

    if (!token) {
      setError("กรุณาเข้าสู่ระบบเพื่อเพิ่มสินค้าลงในตะกร้า"); // "Please log in to add products to the cart"
      return;
    }

    try {
      // Make sure to replace ':itemId' with the actual product ID
      const response = await axios.post(`http://localhost:3000/cart/${product.id}`, {
        quantity: 1 // You can modify this as needed
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Send the token in the request header
        }
      });
      alert(' เพิ่มสินค้าสำเร็จ ')
      console.log('Product added to cart:', response.data);
      // Optionally redirect to cart or show a success message
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data.msg : error.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar1 />
      <div>
        <div className='containerproduct1'>
          <img src={product.image} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.discription}</p>
          <p>Price: ${product.price}</p>
          <div className='button-container123'>
            <button className="btn btn-active bg-[#F8C794] text-white" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to='/cart'>
              <button className="btn btn-active bg-[#6F5039] text-white">Go to Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
