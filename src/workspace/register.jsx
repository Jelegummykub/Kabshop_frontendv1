import axios from 'axios';
import { useState } from 'react';
import Navbarlogin from '../components/Navbarlogin';

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [tel, setTel] = useState("");
  const [line, setLine] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกัน
    if (password !== cpassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // สร้างข้อมูลที่ต้องการส่งไปยัง API
    const data = {
      name,
      surname,
      email,
      password,
      cpassword, // ส่ง cpassword ด้วย
      tel,
      idline: line, // เปลี่ยน line เป็น idline ตามที่ API ต้องการ
      address,
    };

    try {
      // ส่งข้อมูลไปยัง API ผ่าน axios
      const response = await axios.post('http://localhost:3000/auth/register', data);
      
      // ตรวจสอบการตอบกลับจาก API
      if (response.status === 200) {
        alert('Registration successful');
        // ทำการรีเซ็ตฟอร์มหรือเปลี่ยนหน้า
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      // แสดงข้อความจากเซิร์ฟเวอร์ถ้ามี
      const errorMessage = error.response?.data?.msg || 'Error occurred during registration';
      alert(errorMessage);
      console.error("There was an error with the registration!", error);
    }
  };

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
          <form onSubmit={handleRegister}>
            <div className='form1'>
              <h3>Name</h3>
              <div className='input1'>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="กรุณากรอกนามสกุล"
                />
              </div>
            </div>
            <div className='form1'>
              <h3>Tel</h3>
              <div className='input1'>
                <input
                  type="text"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="กรุณากรอกเบอร์โทร"
                />
              </div>
            </div>
            <div className='form1'>
              <h3>ID Line</h3>
              <div className='input1'>
                <input
                  type="text"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  placeholder="กรุณากรอกไอดีไลน์"
                />
              </div>
            </div>
            <div className='form1'>
              <h3>Email</h3>
              <div className='input1'>
                <input
                  type="email" // เปลี่ยน type เป็น email
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="กรุณากรอกอีเมลของท่าน"
                />
              </div>
            </div>
            <div className='form1'>
              <h3>Password</h3>
              <div className='input1'>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรุณากรอกรหัสผ่านของท่าน (อย่างน้อย 8 ตัว)"
                />
              </div>
            </div>
            <div className='form1'>
              <h3>Confirm password</h3>
              <div className='input1'>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
                />
              </div>
            </div>
            <div className='form1'>
              <h3>Address</h3>
              <div className='input2'>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="กรุณากรอกที่อยู่"
                />
              </div>
            </div>
            <div className="button-container1">
              <button className="btn btn-active bg-[#6F5039] text-white" type="submit">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
