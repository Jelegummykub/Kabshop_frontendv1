import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbarlogin from '../components/Navbarlogin';

function Login() {
  const [Login, setLogin] = useState("")
  const [Password, SetPassword] = useState("")

  const inputemail = (event) => {
    setLogin(event.target.value)
  }

  const inputpassword = (event) => {
    SetPassword(event.target.value)
  }
  return (
    <>
      <Navbarlogin />
      <div className='containerlogin'>
        <div className='containerimge'>
          {/* อยู่ css */}
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
                value={Login}
                onChange={inputemail}
                placeholder="กรุณากรอกอีเมลของท่าน"
              />
            </div>
          </div>
          <div className='form'>
            <h3>Password</h3>
            <div className='input1'>
              <input
                type="text"
                value={Password}
                onChange={inputpassword}
                placeholder="กรุณากรอกรหัสผ่านของท่าน"
              />
            </div>
          </div>
          <div className="button-container">
            <button className="btn btn-active bg-[#6F5039] text-white ">Login</button>
          </div>
          <div className='singup'>
            <Link to="/Register">
              <p>Sing up</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
