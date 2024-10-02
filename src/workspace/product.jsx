import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar1 from '../components/navbar1';

function Product() {
  const { id } = useParams(); // ดึง id จาก URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const cagetoy_id = 1;

  // ดึงข้อมูลสินค้าตาม id จาก API
  useEffect(() => {
    fetch(`http://localhost:3000/item/${cagetoy_id}/${id}`) // ใช้ id ที่ดึงมา
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProduct(data.data[0]); // ตั้งค่า product เป็นข้อมูลที่ได้จาก API
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  return (
    <>
      <div>
        <Navbar1 />
        <div className='containers'>
          <div className='conimg'>
            <img src={product.image} alt={product.name} />
          </div>
          <div className='conimg'>
            <h1 className='name'>{product.name}</h1>
            <h2 className='des1'>{product.discription}</h2> {/* ใช้ discription แทน description */}
          </div>
          <div className='conimg'>
            <div className='buy'>
              <h1 className='name1'>{product.name}</h1>
              <div className='quantity'>
                <p>จำนวน: </p>
                <button
                  className="btn btn-active btn-neutral btn-sm"
                  onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button
                  className="btn btn-active btn-neutral btn-sm"
                  onClick={increaseQuantity}>+</button>
              </div>
              <div className='butcart'>
                <button className="btn btn-active btn-neutral btn-sm">ตะกร้า</button>
              </div>
              <Link to="/cart">
                <div className='butcart'>
                  <button className="btn btn-active btn-neutral btn-sm">ชื้อสินค้า</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='product-info'>
          <div className='name'>
            <h1>เกี่ยวกับสินค้า</h1>
          </div>
          <div className='dsd'>
            <p>{product.discription}</p> {/* ใช้ discription แทน description */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
