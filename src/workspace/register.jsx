import { useState } from 'react';
import Navbarlogin from '../components/Navbarlogin';
function Register() {
  const [name, setname] = useState("")
  const [surname, Setsurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, SetPassword] = useState("")
  const [cpassword, SetCPassword] = useState("")
  const [Tel, setTel] = useState("")
  const [Line, setLine] = useState("")
  const [Location, setLocation] = useState("")


  const inputlocation = (event) => {
    setLocation(event.target.value)
  }
  const inputLine = (event) => {
    setLine(event.target.value)
  }
  const inputtel = (event) => {
    setTel(event.target.value)
  }
  const inputname = (event) => {
    setname(event.target.value)
  }

  const inputsurname = (event) => {
    Setsurname(event.target.value)
  }

  const inputemail = (event) => {
    setEmail(event.target.value)
  }

  const inputpassword = (event) => {
    SetPassword(event.target.value)
  }

  const inputcpassword = (event) => {
    SetCPassword(event.target.value)
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
            <h1>Register</h1>
          </div>
          <div className='form1'>
            <h3>Name</h3>
            <div className='input1'>
              <input
                type="text"
                value={name}
                onChange={inputname}
                placeholder="กรุณากรอกชื่อ"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>Surname</h3>
            <div className='input1'>
              <input
                type="text"
                value={surname}
                onChange={inputsurname}
                placeholder="กรุณากรอกนามสกุล"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>Tel</h3>
            <div className='input1'>
              <input
                type="text"
                value={Tel}
                onChange={inputtel}
                placeholder="กรุณากรอกเบอร์โทร"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>ID Line</h3>
            <div className='input1'>
              <input
                type="text"
                value={Line}
                onChange={inputLine}
                placeholder="กรุณากรอกไอดีไลน์"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>Email</h3>
            <div className='input1'>
              <input
                type="text"
                value={email}
                onChange={inputemail}
                placeholder="กรุณากรอกอีเมลของท่าน"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>Password</h3>
            <div className='input1'>
              <input
                type="text"
                value={password}
                onChange={inputpassword}
                placeholder="กรุณากรอกรหัสผ่านของท่าน"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>Confirm password</h3>
            <div className='input1'>
              <input
                type="text"
                value={cpassword}
                onChange={inputcpassword}
                placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
              />
            </div>
          </div>
          <div className='form1'>
            <h3>Location</h3>
            <div className='input2'>
              <input
                type="text"
                value={Location}
                onChange={inputlocation}
                placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
              />
            </div>
          </div>
          <div className="button-container1">
            <button className="btn btn-active bg-[#6F5039] text-white ">Confirm</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
