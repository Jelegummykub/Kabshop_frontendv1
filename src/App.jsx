import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Art from './workspace/art';
import Cart from './workspace/cart';
import Home from './workspace/home';
import Login from './workspace/login';
import Office from './workspace/office';
import Paper from './workspace/paper';
import Payment from './workspace/payment';
import Pen from './workspace/pen';
import Product from './workspace/product';
import Profile from './workspace/profile';
import Register from './workspace/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pen" element={<Pen />} />
        <Route path="/Paper" element={<Paper />} />
        <Route path="/Art" element={<Art />} />
        <Route path="/Office" element={<Office />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/item/:id" element={<Product />} /> {/* ใช้ element แทน component */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
