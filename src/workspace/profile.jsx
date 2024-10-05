import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/navbar1';

function Profile() {
    const [fromData, setFromData] = useState({
        email: '',
        name: '',
        surname: '',
        tel: '',
        address: ''
    });

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const yourToken = localStorage.getItem('token');
                if (!yourToken) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('http://localhost:3000/auth/@me', {
                    headers: {
                        Authorization: `Bearer ${yourToken}`,
                    },
                    withCredentials: true,
                });

                console.log(response.data); // Check the response here

                if (response.data.result) {
                    const {
                        email = '',
                        name = '',
                        surname = '',
                        tel = '',
                        address = ''
                    } = response.data.user;

                    setFromData({
                        email,
                        name,
                        surname,
                        tel,
                        address,
                    });
                } else {
                    alert('Failed to fetch user data: ' + response.data.msg);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFromData({ ...fromData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put('http://localhost:3000/auth/@me', fromData, {
                withCredentials: true
            });

            if (response.data.result) {
                alert('Data saved successfully!');
                // Re-fetch user data after saving
                fetchUserData();
            } else {
                alert('Failed to save data: ' + response.data.msg);
            }
        } catch (error) {
            console.error('Error saving user data:', error.response ? error.response.data : error);
            alert('Could not save data. Please try again.');
        }
    };

    return (
        <>
            <Navbar1 />
            <div>
                <div className='containerprofile'>
                    <div className='mid'>
                        <div className='picprofile'>
                            <img src="/pigg/sommai.jpg" alt="Profile" />
                        </div>
                    </div>
                    <div className='containerfrom1'>
                        <div className='laoutfront'>
                            <h1>ข้อมูลของฉัน</h1>
                        </div>
                        <div className='laoutinput'>
                            <label>Email: </label>
                            <input
                                className="input-field"
                                type="text"
                                name="email"
                                value={fromData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className='laoutinput'>
                            <label>Name: </label>
                            <input
                                className="input-field"
                                type="text"
                                name="name"
                                value={fromData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className='laoutinput'>
                            <label>Surname: </label>
                            <input
                                className="input-field"
                                type="text"
                                name="surname"
                                value={fromData.surname}
                                onChange={handleInputChange}
                                placeholder="Enter your surname"
                            />
                        </div>
                        <div className='laoutinput'>
                            <label>Tel: </label>
                            <input
                                className="input-field"
                                type="number"
                                name="tel"
                                value={fromData.tel}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className='laoutinput'>
                            <label>Address: </label>
                            <input
                                className="input-field"
                                type="text"
                                name="address"
                                value={fromData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your address"
                            />
                        </div>
                        {/* <div className='laoutbutton'>
                            <button className="btn btn-neutral" onClick={handleSubmit}>บันทึกข้อมูล</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
