import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar1 from '../components/navbar1';

function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1' },
  ]);

  const [quantities, setQuantities] = useState(products.map(() => 0));

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
    }
  };

  return (
    <>
      <div>
        <Navbar1 />
        <div className='containers'>
          <div className='conimg'>
            <img src="/public/pigg/product1.png" alt="Product Image" />
          </div>
          <div className='conimg'>
            <h1 className='name'>MUJI ปากกาและไส้ปากกาเจลมูจิ แบบกด ขนาด 0.5 MM</h1>
            <h2 className='des1'>
              ปากกาเจลใช้หมึกเจลที่มีความข้นกว่าหมึกแบบอื่น ทำให้เขียนได้ลื่นและแห้งเร็ว ไม่ต้องกังวลเรื่องหมึกเลอะ
            </h2>
          </div>
          <div className='conimg'>
            <div className='buy'>
              <h1 className='name1'>MUJI ปากกาและไส้ปากกาเจลมูจิ แบบกด ขนาด 0.5 MM</h1>
              <div className='quantity'>
                {products.map((product, index) => (
                  <div key={product} className="quantity">
                    <p>จำนวน: </p>
                    <button
                      className="btn btn-active btn-neutral btn-sm"
                      onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{quantities[index]}</span>
                    <button
                      className="btn btn-active btn-neutral btn-sm"
                      onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                ))}
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
            <h1>
              เกี่ยวกับสินค้า
            </h1>
          </div>
          <div className='dsd'>
            <p>
              เขียนได้ราบรื่น: ไม่ว่าจะเป็นการจดบันทึกในห้องเรียน การทำงานในสำนักงาน หรือการสร้างสรรค์งานศิลปะ
              ปากกาเจลจะทำให้การเขียนของคุณลื่นไหลและไม่มีสะดุด
              สีไม่จางง่าย: สีของหมึกเจลมีความคงทน ไม่จางง่าย ทำให้ข้อความและภาพวาดของคุณคงอยู่ได้นาน
              เหมาะสำหรับทุกเพศทุกวัย: ไม่ว่าคุณจะเป็นนักเรียน นักศึกษา นักธุรกิจ หรือศิลปิน ปากกาเจลเป็นตัวเลือกที่ดีสำหรับทุกคน
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product;
