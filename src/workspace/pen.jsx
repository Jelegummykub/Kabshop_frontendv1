import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbarcat from '../components/Navbarcat';

function Pen() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' }


  ]);

  const addProduct = () => {
    console.log("Adding product");
    setProducts([...products, { id: products.length + 1, name: `Product ${products.length + 1}` }]);
  };

  const removeLastProduct = () => {
    console.log("Removing product");
    if (products.length > 0) {
      setProducts(products.slice(0, -1));
    }
  };

  return (
    <>
      <Navbarcat />
      <div className='containerproduct'>
        <div className="Addremove">
          <button className="btn btn-neutral" onClick={addProduct}>Add</button>
          <button className="btn btn-neutral" onClick={removeLastProduct}>Remove</button>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <div className='productall'>
                <div className='proimg'>
                  <img src="/public/pigg/sommai.jpg" alt="" />
                </div>
                <div className='priceandbutton1'>
                  <h3>{product.name}</h3>
                </div>
                <Link to="/Product">
                  <div className='priceandbutton'>
                    <p>500</p>
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


// const [quantities, setQuantities] = useState(products.map(() => 0));
// const [itemsPerRow, setItemsPerRow] = useState(4); // กำหนดจำนวนสินค้าในแต่ละแถว

// const increaseQuantity = (index) => {
//   const newQuantities = [...quantities];
//   newQuantities[index] += 1;
//   setQuantities(newQuantities);
// };

// const decreaseQuantity = (index) => {
//   const newQuantities = [...quantities];
//   if (newQuantities[index] > 0) {
//     newQuantities[index] -= 1;
//     setQuantities(newQuantities);
//   }
// };