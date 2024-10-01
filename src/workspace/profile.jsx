import { faPenClip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                // Retrieve the token from local storage
                const yourToken = localStorage.getItem('token'); // Adjust the key as necessary
        
                // Check if the token exists
                if (!yourToken) {
                    throw new Error('No authentication token found');
                }
        
                const response = await axios.get('http://localhost:3000/auth/@me', {
                    headers: {
                        Authorization: `Bearer ${yourToken}`, // Use the token
                    },
                    withCredentials: true,
                });
        
                if (response.data.result) {
                    const { email, name, surname, tel, address } = response.data.user;
                    setFromData({
                        email,
                        name,
                        surname,
                        tel: tel || '',
                        address: address || '',
                    });
                } else {
                    alert('Failed to fetch user data: ' + response.data.msg);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
        
                if (error.response) {
                    console.error('Response error:', error.response.data);
                    alert('Error fetching user data: ' + (error.response.data.msg || 'Bad Request'));
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('No response from the server. Please try again.');
                } else {
                    console.error('Error in setup:', error.message);
                    alert('Error in fetching user data: ' + error.message);
                }
            }
        };
        
        fetchUserData();
    }, []); // Empty dependency array means this runs once on mount

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
                        <div style={{ margin: 30 }}>
                            <FontAwesomeIcon icon={faPenClip} style={{ color: "#afafaf" }} />
                            <span>Edit Profile</span>
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
                                type="email"
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
                                type="tel"
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
                        <div className='laoutbutton'>
                            <button className="btn btn-neutral" onClick={handleSubmit}>บันทึกข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;