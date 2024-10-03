// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Navbarcat from '../components/Navbarcat';

// function Pen() {
//   const [products, setProducts] = useState([]); // Ensure initial state is an array
//   const [role, setRole] = useState('USER');
//   const [newProduct, setNewProduct] = useState({ name: '', price: 0, discription: '', image: '', isActive: true });
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [updatedProduct, setUpdatedProduct] = useState({ name: '', price: 0, discription: '', image: '', isActive: true });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const token = localStorage.getItem('token');
//   const cagetoryId = 1; // Adjust this to your actual cagetory ID

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:3000/cagetory/cagetory/${cagetoryId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(Array.isArray(response.data.data) ? response.data.data : []);
//       await checkUserRole();
//     } catch (error) {
//       setError('Error fetching products. Please try again.');
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkUserRole = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/auth/@me', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const userData = response.data.user;

//       if (userData && userData.id) {
//         setRole(userData.role || 'USER');
//       } else {
//         console.error("User data does not have an ID:", userData);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         alert('Your session has expired. Please log in again.');
//       } else {
//         console.error('Error fetching user role:', error);
//       }
//     }
//   };

//   const createProduct = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post(`http://localhost:3000/item/${cagetoryId}`, newProduct, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Update the products state with the newly created product
//       setProducts((prevProducts) => [...(prevProducts || []), response.data.data]);
//       setNewProduct({ name: '', price: 0, discription: '', image: '', isActive: true });
//     } catch (error) {
//       setError('Error creating product. Please try again later.');
//       console.error('Error creating product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProduct = async (productId) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.put(`http://localhost:3000/item/${cagetoryId}/${productId}`, updatedProduct, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts((prevProducts) =>
//         (prevProducts || []).map((product) => (product.id === productId ? response.data.data : product))
//       );
//       setSelectedProductId(null);
//       setUpdatedProduct({ name: '', price: 0, discription: '', image: '', isActive: true });
//     } catch (error) {
//       setError('Error updating product. Please try again later.');
//       console.error('Error updating product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeProduct = async (productId) => {
//     setLoading(true);
//     setError('');
//     try {
//       await axios.delete(`http://localhost:3000/item/${cagetoryId}/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts((prevProducts) => (prevProducts || []).filter((product) => product.id !== productId));
//       setSelectedProductId(null);
//     } catch (error) {
//       setError('Error deleting product. Please try again later.');
//       console.error('Error deleting product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeCagetoy = async (cagetoyId) => {
//     setLoading(true);
//     setError('');
//     try {
//       await axios.delete(`http://localhost:3000/cagetory/cagetory/${cagetoyId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts((prevProducts) => (prevProducts || []).filter((product) => product.cagetoy_id !== cagetoyId));
//       alert('Cagetoy deleted successfully.');
//     } catch (error) {
//       setError('Error deleting cagetoy. Please try again later.');
//       console.error('Error deleting cagetoy:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Navbarcat />
//       <div className='containerproduct'>
//         {error && <div className="error-message">{error}</div>}
//         {loading && <div className="loading-message">Loading...</div>}
//         {role === 'ADMIN' && (
//           <div className="Addremove">
//             <h3>Create New Product</h3>
//             <input
//               type="text"
//               placeholder="Product Name"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={newProduct.discription}
//               onChange={(e) => setNewProduct({ ...newProduct, discription: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={newProduct.image}
//               onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//             />
//             <div className="button-container">
//               <button className="btn btn-neutral" onClick={createProduct} disabled={loading}>
//                 Create Product
//               </button>
//             </div>
//             <h3>Existing Products</h3> {/* Added header for existing products */}
//             <div className='product-grid'>
//               {Array.isArray(products) && products.map((product, index) => (
//                 <div key={product.id} className="product-edit">
//                   <h4>Product {index + 1}: {product.name}</h4>
//                   <div className="button-container">
//                     <button className="btn btn-neutral" onClick={() => {
//                       setSelectedProductId(product.id);
//                       setUpdatedProduct({ name: product.name, price: product.price, discription: product.discription, image: product.image, isActive: product.isActive });
//                     }}>
//                       Edit Product
//                     </button>
//                     {selectedProductId === product.id && (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Updated Name"
//                           value={updatedProduct.name}
//                           onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
//                         />
//                         <input
//                           type="number"
//                           placeholder="Updated Price"
//                           value={updatedProduct.price}
//                           onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Updated Description"
//                           value={updatedProduct.discription}
//                           onChange={(e) => setUpdatedProduct({ ...updatedProduct, discription: e.target.value })}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Updated Image URL"
//                           value={updatedProduct.image}
//                           onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
//                         />
//                         <div className="button-container">
//                           <button className="btn btn-neutral" onClick={() => updateProduct(product.id)} disabled={loading}>
//                             Update Product
//                           </button>
//                           <button className="btn btn-error" onClick={() => removeProduct(product.id)} disabled={loading}>
//                             Remove Product
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Pen;
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
  const cagetoryId = 1;

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
      <Navbarcat />
      <div className='containerproduct'>
        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading-message">Loading...</div>}

        {!loading && products.length === 0 && <div>No products found in the database.</div>}

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

        {role === 'ADMIN' && (
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={product.id} className="product-edit">
                <h4>Product {index + 1}: {product.name}</h4>
                <p>Description: {product.discription}</p>
                <p>Price: ${product.price}</p>
                <p>Status: {product.isActive ? 'Available' : 'Unavailable'}</p>
                <p>Image: {product.image ? <img src={product.image} alt={product.name} /> : 'No image available'}</p>
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
                product ? (
                  <div key={product.id} className="product-card">
                    <h4>Product {index + 1}: {product.name}</h4>
                    <p>Description: {product.discription || 'No description available'}</p>
                    <p>Price: ${product.price || 'N/A'}</p>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <p>No image available</p>
                    )}
                    {role === 'USER' && (
                      <Link to={`/products/${product.id}`} className="btn btn-primary">
                        Buy Now
                      </Link>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pen;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';

// function Product() {
//   const { id } = useParams(); // Get ID from URL
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       console.log(`ID before request: ${id}`); // Log ID

//       const itemId = parseInt(id);
//       console.log(`ID type: ${typeof id}, Parsed ID: ${itemId}`); // Log ID type and parsed ID

//       if (isNaN(itemId)) {
//         setError("Invalid Product ID");
//         return;
//       }

//       console.log(`Fetching product with ID: ${itemId}`);
//       try {
//         const response = await axios.get(`http://localhost:3000/item/${itemId}`);
//         console.log('Product fetched:', response.data);
//         setProduct(response.data.data); // Access the product data correctly
//       } catch (error) {
//         console.error('Error fetching product:', error.response);
//         setError(`Error fetching product: ${error.response ? error.response.data.msg : error.message}`);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = async () => {
//     try {
//       // Make sure to replace ':itemId' with the actual product ID
//       const response = await axios.post(`http://localhost:3000/cart/${product.id}`, {
//         quantity: 1 // You can modify this as needed
//       });
//       console.log('Product added to cart:', response.data);
//       // Optionally redirect to cart or show a success message
//     } catch (error) {
//       console.error('Error adding to cart:', error.response ? error.response.data.msg : error.message);
//     }
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div>
//         <h1>{product.name}</h1>
//         <p>{product.discription}</p>
//         <p>Price: ${product.price}</p>
//         <img src={product.image} alt={product.name} />
//       </div>
//       <div>
//         <button className="btn btn-neutral" onClick={handleAddToCart}>
//           Add to Cart
//         </button>
//         <Link to='/cart'>
//           <button className="btn btn-neutral">Go to Cart</button>
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Product;








