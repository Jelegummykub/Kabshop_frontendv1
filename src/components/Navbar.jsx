import { faCartShopping, faHouse, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './components.css';

function NAvbar() {
    const [isOpen, setIsOpen] = useState(false); // สถานะเปิดปิดของ sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // สลับสถานะ
    };

    return (
        <>
            <div>
                <div className="navbar5">
                    <div className="con">
                        <div className="flex-none">
                            <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-5 w-5 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="logo-container">
                            <img src="/pigg/logo.png" alt="logo" className="logo" />
                        </div>
                        <div className="flex-none">
                            <Link to="/Login" >
                                <FontAwesomeIcon className="login" icon={faUser} style={{ color: "#ffffff", }} />
                            </Link>
                        </div>
                    </div>
                    <div className='con1'>
                        <div className="store-container">
                            <h1 className='Namestore'>KABSHOP</h1>
                            <div className="button-container">
                                <button className="btn btn-outline">About Us</button>
                                <button className="btn btn-outline">Our Product</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <button className="btn btn-error" onClick={toggleSidebar}>Close</button>
                    <div className='slidehome'>
                        <Link to="/">
                            <FontAwesomeIcon className='homi1' icon={faHouse} style={{ color: "#000000", }} />
                            <span className="home-text">Home</span>
                        </Link>
                    </div>
                    <div className='slidehome1'>
                        <FontAwesomeIcon className='homi11' icon={faList} style={{ color: "#000000", }} />
                        <details className="dropdown">
                            <summary className="btn m-1">Cagetory</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <Link to="/Pen" >
                                    <span className="paper-text">Pen</span>
                                </Link>
                                <Link to="/Paper" >
                                    <span className="paper-text">Paper</span>
                                </Link>
                                <Link to="/Art" >
                                    <span className="paper-text">Art</span>
                                </Link>
                                <Link to="/Office" >
                                    <span className="paper-text">Office</span>
                                </Link>
                            </ul>
                        </details>
                    </div>
                    <div className='slidehome'>
                        <Link to="/cart">
                            <FontAwesomeIcon className='homi1' icon={faCartShopping} style={{ color: "#000000", }} />
                            <span className="home-text">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}

export default NAvbar;
