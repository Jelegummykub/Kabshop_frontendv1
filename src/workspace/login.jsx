import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbarlogin from '../components/Navbarlogin';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Profile'); // Redirect to Profile if already logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });
      alert('Login สำเร็จ');
      console.log('Login successful:', response.data);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to profile after successful login
      navigate('/Profile');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.msg || 'Something went wrong');
      } else {
        alert('Network error. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbarlogin />
      <div className='containerlogin'>
        <div className='containerimge'>
          {/* Custom CSS can be placed here */}
        </div>
        <div className='containerfrom'>
          <div className='Login'>
            <h1>Login</h1>
          </div>
          <div className='form'>
            <h3>Email</h3>
            <div className='input1'>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="กรุณากรอกอีเมลของท่าน"
                required
              />
            </div>
          </div>
          <div className='form'>
            <h3>Password</h3>
            <div className='input1'>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรุณากรอกรหัสผ่านของท่าน"
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button
              className="btn btn-active bg-[#6F5039] text-white"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className='singup'>
            <Link to="/Register">
              <p>Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
