// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbarcat from '../components/Navbarcat';

// function Pen() {
//   const [products, setProducts] = useState([]);
//   const [role, setRole] = useState('USER'); // Default to 'USER'
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem('token');
//   const [loading, setLoading] = useState(true); // To track loading state

//   // Fetch products and user roles
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/auth/@me', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       console.log("Fetched user data:", response.data);

//       const userData = response.data.user; // Access the user object

//       // Log the userData to see its structure
//       console.log("User data:", userData);

//       // Check if userData has an ID
//       if (userData && userData.id) {
//         // Add the user to the state
//         setUsers((prevUsers) => [...prevUsers, userData]);
//         // Set the role if available
//         setRole(userData.role || 'USER'); // Ensure to check for the role as well
//       } else {
//         console.error("User data does not have an ID:", userData);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         alert('Your session has expired. Please log in again.');
//       } else {
//         console.error('Error fetching data', error);
//       }
//     }
//   };


//   const checkRolesForUsers = async (users) => {
//     for (let user of users) {
//       try {
//         if (user.id) {
//           const response = await axios.get(`http://localhost:3000/auth/checkRole/${user.id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           user.role = response.data.role; // Ensure the user object gets updated
//           // Assuming you want to set the role for the current user
//           if (user.id === users[0].id) { // Use the first user as the current user (update as necessary)
//             setRole(user.role);
//           }
//         } else {
//           console.error(`User ID is undefined for user:`, user);
//         }
//       } catch (error) {
//         console.error(`Error checking role for user ${user.id}`, error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (users.length > 0) {
//       checkRolesForUsers(users);
//     }
//   }, [users]);

//   return (
//     <>
//       <Navbarcat />
//       {loading ? ( // Show loading state
//         <div>Loading...</div>
//       ) : (
//         <div className='containerproduct'>
//           {role === 'ADMIN' && (
//             <div className="Addremove">
//               {products.map((_, index) => (
//                 <button key={index} className="btn btn-neutral" onClick={() => addProductForIndex(index)}>Add Product {index + 1}</button>
//               ))}
//               {products.length > 0 && (
//                 <button className="btn btn-neutral" onClick={removeAllProducts}>Remove All Products</button>
//               )}
//             </div>
//           )}

//           <div className="product-grid">
//             {products.map((product) => (
//               <div key={product.id} className="product-item">
//                 <div className='productall'>
//                   <div className='proimg'>
//                     <img src={product.image || "/pigg/sommai.jpg"} alt={product.name} />
//                   </div>
//                   <div className='priceandbutton1'>
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                   </div>
//                   <Link to={`/Product/${product.id}`}>
//                     <div className='priceandbutton'>
//                       <p>{product.price}</p>
//                       <button className="btn btn-neutral btn-sm">Shop</button>
//                     </div>
//                   </Link>

//                   {role === 'ADMIN' && (
//                     <div className="admin-controls">
//                       <button className="btn btn-neutral btn-sm" onClick={updateProductsInLoop}>Update All Products</button>
//                       <button className="btn btn-error btn-sm" onClick={removeAllProducts}>Delete All Products</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
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
  const [updatedProduct, setUpdatedProduct] = useState({ id: null, name: '', price: 0, discription: '', image: '', isActive: true });
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

      // Fetch user role after fetching products
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

      console.log("Fetched user data:", response.data);

      const userData = response.data.user; // Access the user object

      // Log the userData to see its structure
      // console.log("User data:", userData);

      // Check if userData has an ID and set role
      if (userData && userData.id) {
        setRole(userData.role || 'USER'); // Ensure to check for the role as well
        console.log('User role:', userData.role); // Log user role
        console.log("User data:", userData);
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
      const response = await axios.put(`http://localhost:3000/item/${storeId}/${productId}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === productId ? response.data : product))
      );
      setUpdatedProduct({ id: null, name: '', price: 0, discription: '', image: '', isActive: true });
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
              value={newProduct.discription}
              onChange={(e) => setNewProduct({ ...newProduct, discription: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <button className="btn btn-neutral" onClick={() => createProduct(1)} disabled={loading}>
              Create Product
            </button>
            {Array.isArray(products) && products.map((product, index) => (
              <div key={product.id} className="product-edit">
                <h4>Product {index + 1}: {product.name}</h4>
                <input
                  type="text"
                  placeholder="Updated Name"
                  value={updatedProduct.id === product.id ? updatedProduct.name : ''}
                  onChange={(e) => setUpdatedProduct({ id: product.id, name: e.target.value, price: updatedProduct.price, discription: updatedProduct.discription, image: updatedProduct.image, isActive: updatedProduct.isActive })}
                />
                <input
                  type="number"
                  placeholder="Updated Price"
                  value={updatedProduct.id === product.id ? updatedProduct.price : ''}
                  onChange={(e) => setUpdatedProduct({ id: product.id, name: updatedProduct.name, price: Number(e.target.value), discription: updatedProduct.discription, image: updatedProduct.image, isActive: updatedProduct.isActive })}
                />
                <input
                  type="text"
                  placeholder="Updated Description"
                  value={updatedProduct.id === product.id ? updatedProduct.discription : ''}
                  onChange={(e) => setUpdatedProduct({ id: product.id, name: updatedProduct.name, price: updatedProduct.price, discription: e.target.value, image: updatedProduct.image, isActive: updatedProduct.isActive })}
                />
                <input
                  type="text"
                  placeholder="Updated Image URL"
                  value={updatedProduct.id === product.id ? updatedProduct.image : ''}
                  onChange={(e) => setUpdatedProduct({ id: product.id, name: updatedProduct.name, price: updatedProduct.price, discription: updatedProduct.discription, image: e.target.value, isActive: updatedProduct.isActive })}
                />
                <button className="btn btn-neutral" onClick={() => updateProduct(1, product.id)} disabled={loading}>
                  Update Product
                </button>
                <button className="btn btn-error" onClick={() => removeProduct(1, product.id)} disabled={loading}>
                  Delete Product
                </button>
              </div>
            ))}
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
