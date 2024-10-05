import React from 'react';
import { Link } from 'react-router-dom';
import Navbar1 from '../components/navbar1';

function Payment() {
    const click = () => {
        alert('ขอบคุณสำหรับการซื้อสินค้าครับ/ค่ะ')
    }

    const click1 = () => {
        alert('สั่งซื้อไม่สำเร็จ')
    }
    return (
        <>
            <Navbar1 />
            <div className='containerproduct12'>
                <div className='qrcode'>
                    <p className='mr-[80%] text-[1.75rem]'>รายระเอียดการชำระเงิน</p>
                    <img src="../public/pigg/qrcode.png" alt="" />
                </div>
                <div className='button-container123 ml-[80%]'>
                    <Link to='/'>
                        <button className="btn bg-orange-200 text-white" onClick={click1}>Cancle</button>
                    </Link>
                    <Link to='/'>
                        <button className="btn bg-yellow-800 text-white" onClick={click}>Confirm</button>
                    </Link>
                </div>
            </div>
        </>


    );
}

export default Payment;
