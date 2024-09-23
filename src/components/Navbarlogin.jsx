import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';
function Navbarlogin() {
    return (
        <>
            <div className="navbarlogin bg-base-100">
                <div className='arrow'>
                    <Link to="/">
                        <FontAwesomeIcon className='arrow' icon={faArrowLeft} style={{ color: "#000000", }} />
                    </Link>
                </div>

                <div className="logo-container1">
                    <img src="/pigg/logo.png" alt="logo" className="logo1" />
                </div>
            </div>
        </>
    )
}

export default Navbarlogin
